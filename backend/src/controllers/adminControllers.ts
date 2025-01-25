import express from 'express';
import jwt from 'jsonwebtoken';

import { token_expire, jwt_token_expire, secret } from '../envconfig';
import { createAdmin, getAdminByEmail } from '../helpers/adminHelpers';
import { authentication, random } from '../helpers/authenticationHelpers';

export const adminLogin = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { email, password } = req.body;
        if (!email && !password)
            return res
                .status(400)
                .json({ message: 'Please provide required details!' })
                .end();

        const admin = await getAdminByEmail(email).select(
            '+authentication.salt +authentication.password'
        );
        if (!admin)
            return res.status(404).json({ message: 'Admin not found!' }).end();
        const expectedHash = authentication(
            admin.authentication.salt,
            password
        );
        if (admin.authentication.password !== expectedHash) {
            return res
                .status(403)
                .json({ message: 'Wrong email or password!' })
                .end();
        }
        const jwt_token = jwt.sign(
            {
                id: admin._id,
            },
            secret,
            { expiresIn: jwt_token_expire }
        );

        // needed options setup to set cookie
        const options = {
            domain: 'localhost', // client domain
            path: '/',
            httpOnly: true,
            maxAge: parseInt(token_expire),
        };
        admin.authentication.sessionToken = jwt_token;
        await admin.save();

        const currentAdmin = {
            id: admin._id,
            name: admin.name,
            email: admin.email,
        };

        return res
            .status(200)
            .cookie('jwt_token', jwt_token, options)
            .json({
                message: 'Logged in successfully!',
                jwt_token,
                currentAdmin,
                success: true,
            })
            .end();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error })
            .end();
    }
};

export const addAdmin = async (req: express.Request, res: express.Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name && !email && !password)
            return res
                .status(400)
                .json({ message: 'Please provide required details!' })
                .end();

        const existingAdmin = await getAdminByEmail(email);

        if (existingAdmin)
            return res
                .status(400)
                .json({ message: 'Admin already exists with given email!' })
                .end();

        const salt = random();
        const createdAdmin = await createAdmin({
            name,
            email,
            authentication: { salt, password: authentication(salt, password) },
        });

        if (!createdAdmin)
            return res
                .status(404)
                .json({ message: 'Admin creation failed' })
                .end();

        return res
            .status(200)
            .json({ message: 'Admin created successfully!', createdAdmin })
            .end();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error });
    }
};
