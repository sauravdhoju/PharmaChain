import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import { secret, token_expire, jwt_token_expire } from '../envconfig';
import { authentication, random } from '../helpers/authenticationHelpers';
import { getPharmacyByEmail, createPharmacy } from '../helpers/pharmacyHelpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        // get email and password sent with the request
        const { email, password } = req.body;
        // needs email and password
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Email and Password requried!' })
                .end();
        }
        // can't access aauthentication salt and password if not passed in select
        const pharmacy = await getPharmacyByEmail(email).select(
            '+authentication.salt +authentication.password'
        );

        if (!pharmacy) {
            return res
                .status(400)
                .json({ message: 'Account does not exist!' })
                .end();
        }

        // compare hash instead of directly comparing the passwords
        const expectedHash = authentication(
            pharmacy.authentication.salt,
            password
        );
        if (pharmacy.authentication.password !== expectedHash) {
            return res
                .status(403)
                .json({ message: 'Wrong email or password!' })
                .end();
        }

        // json web token to set in cookie for client session identification

        const jwt_token = jwt.sign(
            {
                id: pharmacy._id,
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

        // save the session token to the pharmacy entry
        pharmacy.authentication.sessionToken = jwt_token;
        await pharmacy.save();

        const currentpharmacy = {
            id: pharmacy._id,
            phone_no: pharmacy.phone_no,
            name: pharmacy.name,
            email: pharmacy.email,
        };

        return res
            .status(200)
            .cookie('jwt_token', jwt_token, options)
            .json({
                message: 'Logged in successfully!',
                jwt_token,
                currentpharmacy,
                success: true,
            })
            .end();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Something went wrong!' }).end();
    }
};

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { name, email, password, phone_no } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Required values not provided!' });
        }

        const existingpharmacy = await getPharmacyByEmail(email);
        if (existingpharmacy) {
            return res.status(400).json('pharmacy already exists!');
        }

        const salt = random();
        const pharmacy = await createPharmacy({
            email,
            name,
            phone_no,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        const createdpharmacy = {
            name: pharmacy.name,
            email: pharmacy.email,
        };

        return res
            .status(200)
            .json({ message: 'Registered Successfully', createdpharmacy })
            .end();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Something went wrong!' }).end();
    }
};
