import express from 'express';

import authenticationRouter from './authenticationRouter';
import pharmacyRouter from './pharmacyRouter';
import medicineRouter from './medicineRouter';
import adminRouter from './adminRouter';
import pharmaMedicineRouter from './pharmaMedicineRouter';
import predictionRouter from './predictionRouter';
const router = express.Router();

export default (): express.Router => {
    authenticationRouter(router);
    pharmacyRouter(router);
    medicineRouter(router);
    adminRouter(router);
    pharmaMedicineRouter(router);
    predictionRouter(router);

    return router;
};
