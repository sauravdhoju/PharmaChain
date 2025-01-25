import express from "express";
import {
    createPrediction,
    getPredictionsByMedicineAndPharmacy,
    getAllPredictions,
} from "../helpers/predictionHelpers";
import { spawn } from "child_process";
import path from "path";

export const getPredictions = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { medicine_name, pharmacy_name } = req.body;
        const predictions = await getPredictionsByMedicineAndPharmacy(
            medicine_name,
            pharmacy_name
        );
        return res
            .status(200)
            .json({
                message: "Predictions retrieved successfully!",
                predictions,
            })
            .end();
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Something went wrong!" }).end();
    }
};

export const getPredictionHistory = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { medicineName, pharmacyName } = req.params;
        const predictions = await getPredictionsByMedicineAndPharmacy(
            medicineName,
            pharmacyName
        );
        return res
            .status(200)
            .json({
                message: "Prediction history retrieved successfully!",
                predictions,
            })
            .end();
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Something went wrong!" }).end();
    }
};

export const generatePrediction = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { medicine_name, pharmacy_name, months_ahead = 12 } = req.body;

        // Validate input
        if (!medicine_name || !pharmacy_name) {
            return res
                .status(400)
                .json({ error: "Missing required parameters" });
        }

        // Log parameters for debugging
        console.log("Prediction parameters:", {
            medicine_name,
            pharmacy_name,
            months_ahead,
        });

        const pythonPath = path.resolve(
            __dirname,
            "../../../model_training/trainModel.py"
        );
        console.log("Python script path:", pythonPath);

        const pythonProcess = spawn("python", [
            pythonPath,
            String(medicine_name),
            String(pharmacy_name),
            String(months_ahead),
        ]);

        let outputData = "";
        let errorData = "";

        // Capture stdout
        pythonProcess.stdout.on("data", (data) => {
            outputData += data.toString();
            console.log("Python stdout:", data.toString());
        });

        // Capture stderr
        pythonProcess.stderr.on("data", (data) => {
            errorData += data.toString();
            console.error("Python stderr:", data.toString());
        });

        // Handle process completion
        pythonProcess.on("close", async (code) => {
            console.log("Python process exited with code:", code);

            if (code !== 0) {
                return res.status(500).json({
                    error: "Prediction script failed",
                    details: errorData,
                });
            }

            try {
                const result = JSON.parse(outputData);
                if (result.error) {
                    return res.status(400).json(result);
                }

                // Create prediction record
                const Sales_prediction = await createPrediction({
                    medicine_name,
                    pharmacy_name,
                    months_ahead,
                    predictions: result.predictions,
                });

                return res.status(200).json({
                    success: true,
                    Sales_prediction,
                });
            } catch (error) {
                console.error("Parse error:", error);
                return res.status(500).json({
                    error: "Failed to process prediction",
                    details: error.message,
                    output: outputData,
                });
            }
        });
    } catch (error) {
        console.error("Controller error:", error);
        return res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
};
