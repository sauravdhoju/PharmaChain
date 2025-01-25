import express from 'express';

import {
    getAllMedicines,
    updateMedicine,
    deleteMedicine,
    addMedicine,
} from '../controllers/medicineControllers';
import { isAdmin } from '../middlewares';

export default (router: express.Router) => {
    // have to implement Admin authentication for these endpoints
    router.post('/api/medicine/add/', isAdmin, addMedicine);
    router.get('/api/medicines', isAdmin, getAllMedicines);
    router.patch('/api/medicine/update/:id', isAdmin, updateMedicine);
    router.delete('/api/medicine/delete/:id', isAdmin, deleteMedicine);
};
