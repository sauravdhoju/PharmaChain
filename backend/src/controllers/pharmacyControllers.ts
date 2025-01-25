import express from 'express';
import { get } from 'lodash';

import {
    getPharmacyById,
    deletePharmacyById,
    getPharmacys,
} from '../helpers/pharmacyHelpers';

// returns the pharmacy of current session
export const getCurrentPharmacy = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const pharmacyId = get(req, 'identity._id') as string;
        if (!pharmacyId) {
            return res
                .status(403)
                .json({ message: 'You are not authenticated!' });
        }

        const pharmacy = await getPharmacyById(pharmacyId);
        if (!pharmacy) {
            return res.status(403).json({ message: 'You are not authorized!' });
        }

        const pharmacyDetails = {
            id: pharmacy._id,
            pharmacyname: pharmacy.name,
            email: pharmacy.email,
            created_at: pharmacy.createdAt,
            updated_at: pharmacy.updatedAt,
        };

        return res
            .status(200)
            .json({
                message: 'Pharmacy authorized!',
                pharmacy: pharmacyDetails,
            })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error: error })
            .end();
    }
};

// returns all the pharmacys
export const getAllPharmacys = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const pharmacys = await getPharmacys();

        return res
            .status(200)
            .json({ message: 'Pharmacy authorized!', pharmacys })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error })
            .end();
    }
};

// deletes pharmacy requested by id
export const deletePharmacy = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params; // param from the url

        const deletedPharmacy = await deletePharmacyById(id);

        if (!deletedPharmacy) {
            return res
                .status(400)
                .json({ message: 'Something went wrong!' })
                .end();
        }

        return res
            .status(200)
            .clearCookie('jwt_token')
            .json({ message: 'Pharmacy deleted successfully', deletedPharmacy })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error })
            .end();
    }
};

// updates pharmacy's pharmacyname by comparing id
export const updatePharmacy = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        // can take in multiple values (phone no for example if we choose to include it)
        const { pharmacyname } = req.body;

        if (!pharmacyname) {
            return res
                .status(400)
                .json({ message: 'Something went wrong!' })
                .end();
        }

        const pharmacy = await getPharmacyById(id);
        if (!pharmacy) {
            return res
                .status(400)
                .json({ message: 'Something went wrong!' })
                .end();
        }

        pharmacy.name = pharmacyname;
        pharmacy.updatedAt = new Date(Date.now());
        await pharmacy.save();

        return res
            .status(200)
            .json({ message: 'Pharmacy updated successfully!', pharmacy })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error });
    }
};
