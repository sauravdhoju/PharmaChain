import express from 'express';

import { addAdmin, adminLogin } from '../controllers/adminControllers';

export default (router: express.Router) => {
    router.post('/api/admin/create', addAdmin);
    router.post('/api/admin/login', adminLogin);
};
