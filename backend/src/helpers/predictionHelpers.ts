import PredictionModel from "../models/predictionModel";

export const createPrediction = (values: Record<string, any>) =>
    new PredictionModel(values)
        .save()
        .then((prediction) => prediction.toObject());

export const getPredictionsByMedicineAndPharmacy = (
    medicine_name: string,
    pharmacy_name: string
) => PredictionModel.find({ medicine_name, pharmacy_name });

export const getAllPredictions = () => PredictionModel.find();
