import mongoose from "mongoose";
import PredictionSchema from "../db/predictionSchema";

const PredictionModel = mongoose.model("Prediction", PredictionSchema);

export default PredictionModel;
