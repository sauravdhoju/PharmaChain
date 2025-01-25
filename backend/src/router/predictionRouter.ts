import express from "express";
import {
    getPredictions,
    getPredictionHistory,
    generatePrediction,
} from "../controllers/predictionController";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
    router.get("/api/predictions", isAuthenticated, getPredictions);
    router.get(
        "/api/predictions/:medicineName/:pharmacyName",
        isAuthenticated,
        getPredictionHistory
    );
    // Change from GET to POST
    router.post(
        "/api/predictions/generate",
        isAuthenticated,
        generatePrediction
    );
};
