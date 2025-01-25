import mongoose from 'mongoose';

import PharmacySchema, { PharmacyDocument } from '../db/pharmacySchema';

const PharmacyModel = mongoose.model<PharmacyDocument>(
    'Pharmacy',
    PharmacySchema
);

export default PharmacyModel;
