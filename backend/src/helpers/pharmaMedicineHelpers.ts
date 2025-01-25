import PharmaMedicineModel from '../models/pharmaMedicineModel';

export const makePurchase = (values: Record<string, any>) =>
    new PharmaMedicineModel(values)
        .save()
        .then((pharmaMedicine) => pharmaMedicine.toObject());

export const getPharmaMedicineById = (id: string) =>
    PharmaMedicineModel.findById(id);

export const getPharmaMedicineByPharmacyId = (id: string) =>
    PharmaMedicineModel.find({ pharmacy_id: id });
