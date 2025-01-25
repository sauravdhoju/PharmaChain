import mongoose from 'mongoose';

const PharmaMedicineSchema = new mongoose.Schema({
    pharmacy_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pharmacy',
        required: true,
    },
    medicine_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true,
    },
    expiry_date: {
        type: Date,
        required: true,
    },
    units: {
        type: Number,
        required: true,
    },
});

export default PharmaMedicineSchema;
