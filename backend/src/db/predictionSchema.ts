import mongoose from "mongoose";

const PredictionSchema = new mongoose.Schema({
    medicine_name: {
        type: String,
        required: true,
    },
    pharmacy_name: {
        type: String,
        required: true,
    },
    months_ahead: {
        type: Number,
        required: true,
        default: 12,
    },
    predictions: {
        type: [Number],
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export default PredictionSchema;
