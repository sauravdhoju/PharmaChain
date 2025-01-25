import mongoose from 'mongoose';

import MedicineSchema from '../db/medicineSchema';

const MedicineModel = mongoose.model('Medicine', MedicineSchema);

export default MedicineModel;
