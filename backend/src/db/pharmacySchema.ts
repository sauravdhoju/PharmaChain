import mongoose, { Document } from 'mongoose';

export interface PharmacyDocument extends Document {
    name: string;
    email: string;
    phone_no?: string;
    authentication: {
        password: string;
        salt: string;
        sessionToken: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const PharmacySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone_no: { type: String },
        authentication: {
            password: { type: String, required: true, select: false },
            salt: { type: String, select: false },
            sessionToken: { type: String, select: false },
        },
    },
    { timestamps: true }
);

export default PharmacySchema;
