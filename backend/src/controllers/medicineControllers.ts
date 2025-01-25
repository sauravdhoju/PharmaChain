import express from 'express';
import { get } from 'lodash';

import {
    getMedicineById,
    deleteMedicineById,
    getMedicines,
    createMedicine,
} from '../helpers/medicineHelpers';

export const addMedicine = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { name, manufacturer, dosage_form } = req.body;

        if (!name && !manufacturer && !dosage_form)
            return res
                .status(400)
                .json({ message: 'Please provide required details!' })
                .end();

        const newMedicine = {
            name,
            manufacturer,
            dosage_form,
        };

        const addedMedicine = await createMedicine(newMedicine);

        if (!addedMedicine)
            return res
                .status(404)
                .json({ message: 'created medicine not found!' })
                .end();

        return res
            .status(200)
            .json({ message: 'Medicine added successfully!', addedMedicine })
            .end();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error })
            .end();
    }
};

// returns all the medicines
export const getAllMedicines = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const medicines = await getMedicines();

        return res
            .status(200)
            .json({ message: 'Medicine authorized!', medicines })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error })
            .end();
    }
};

// deletes medicine requested by id
export const deleteMedicine = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params; // param from the url

        const deletedMedicine = await deleteMedicineById(id);

        if (!deletedMedicine) {
            return res
                .status(400)
                .json({ message: 'Something went wrong!' })
                .end();
        }

        return res
            .status(200)
            .json({ message: 'Medicine deleted successfully', deletedMedicine })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error })
            .end();
    }
};

// updates medicine's medicinename by comparing id
export const updateMedicine = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        // can take in multiple values (phone no for example if we choose to include it)
        const { medicinename } = req.body;

        if (!medicinename) {
            return res
                .status(400)
                .json({ message: 'Something went wrong!' })
                .end();
        }

        const medicine = await getMedicineById(id);
        if (!medicine) {
            return res
                .status(400)
                .json({ message: 'Something went wrong!' })
                .end();
        }

        medicine.name = medicinename;
        medicine.updatedAt = new Date(Date.now());
        await medicine.save();

        return res
            .status(200)
            .json({ message: 'Medicine updated successfully!', medicine })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error });
    }
};
