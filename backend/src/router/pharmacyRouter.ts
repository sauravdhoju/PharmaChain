import express from 'express';

import {
    getAllPharmacys,
    getCurrentPharmacy,
    updatePharmacy,
    deletePharmacy,
} from '../controllers/pharmacyControllers';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/api/pharmacys', isAuthenticated, getAllPharmacys);
    router.get('/api/pharmacy', isAuthenticated, getCurrentPharmacy);
    router.patch('/api/pharmacy/:id', isAuthenticated, isOwner, updatePharmacy);
    router.delete(
        '/api/pharmacy/:id',
        isAuthenticated,
        isOwner,
        deletePharmacy
    );
};
