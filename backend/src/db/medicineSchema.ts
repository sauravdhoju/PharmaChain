import mongoose from 'mongoose';

const MedicineSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        manufacturer: { type: String, required: true },
        dosage_form: { type: String, required: true },
        category: { type: String, required: true },
    },
    { timestamps: true }
);

export default MedicineSchema;
