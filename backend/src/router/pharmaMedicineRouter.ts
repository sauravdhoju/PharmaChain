import express from 'express';

import {
    createPurchase,
    updateStock,
    getAllStocks,
} from '../controllers/pharmaMedicineController';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post(
        '/api/pharma/medicine/purchase',
        isAuthenticated,
        createPurchase
    );
    router.patch(
        '/api/pharma/medicine/update/:pharmaMedicineId',
        isAuthenticated,
        updateStock
    );
    router.get('/api/pharma/medicines/', isAuthenticated, getAllStocks);
};
