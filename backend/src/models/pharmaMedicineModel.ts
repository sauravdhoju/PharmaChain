import mongoose from 'mongoose';

import PharmaMedicineSchema from '../db/pharmaMedicineSchema';

const PharmaMedicineModel = mongoose.model(
    'PharmaMedicine',
    PharmaMedicineSchema
);

export default PharmaMedicineModel;
