import express from 'express';
import { get } from 'lodash';

import {
    makePurchase,
    getPharmaMedicineById,
    getPharmaMedicineByPharmacyId,
} from '../helpers/pharmaMedicineHelpers';

export const getAllStocks = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const pharmaId = get(req, 'identity._id') as string;

        if (!pharmaId)
            return res
                .status(400)
                .json({ message: 'Please provide pharmacy id!' })
                .end();

        const pharmaMedicines = await getPharmaMedicineByPharmacyId(pharmaId);

        if (!pharmaMedicines)
            return res
                .status(404)
                .json({ message: 'No pharma medicines found!' })
                .end();

        return res
            .status(200)
            .json({
                message: 'Pharma medicines retrieved successfully!',
                pharmaMedicines,
            })
            .end();
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Something went wrong!' }).end();
    }
};

export const updateStock = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { pharmaMedicineId } = req.params;
        const { soldUnits, pharmacy_id } = req.body;

        if (!soldUnits)
            return res
                .status(400)
                .json({ message: 'Please provide required data!' })
                .end();
        const pharmaMedicine = await getPharmaMedicineById(pharmaMedicineId);

        if (!pharmaMedicine)
            return res
                .status(404)
                .json({ message: 'Pharma medicine not found!' })
                .end();

        pharmaMedicine.units -= soldUnits;
        if (pharmacy_id) pharmaMedicine.pharmacy_id = pharmacy_id;

        pharmaMedicine.save();
        return res
            .status(200)
            .json({ message: 'Successfully updated pharma medicine!' })
            .end();
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Something went wrong!' }).end();
    }
};

export const createPurchase = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { medicine_id, expiry_date, units } = req.body;
        const pharmacy_id = get(req, 'identity._id') as string;

        if (!medicine_id && !pharmacy_id && !expiry_date && !units)
            return res
                .status(400)
                .json({ message: 'Please provider required data!' })
                .end();

        const newPharmaMedicine = await makePurchase({
            medicine_id,
            pharmacy_id,
            expiry_date,
            units,
        });

        if (!newPharmaMedicine)
            return res
                .status(404)
                .json({ message: 'Failed to record new purchase!' })
                .end();

        return res.status(200).json({
            message: 'Purchase recorded sucessfully!',
            newPharmaMedicine,
        });
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error })
            .end();
    }
};
