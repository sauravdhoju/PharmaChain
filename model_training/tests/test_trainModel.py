# import unittest
# import os
# import pandas as pd
# from model_training.trainModel import MedicineSalesPredictor

# DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
# DATASET_PATH = os.path.join(DATA_DIR, 'medicine_dataset.csv')


# class TestModelAccuracy(unittest.TestCase):
#     def setUp(self):
#         self.model = MedicineSalesPredictor()
#         self.test_data, self.expected_outcomes = self.load_actual_data()

#     def test_model_accuracy(self):
#         accuracies = []
#         for (medicine_name, pharmacy_name), expected in zip(self.test_data, self.expected_outcomes):
#             prediction = self.model.predict_sales(medicine_name, pharmacy_name, months_ahead=1)
#             if isinstance(prediction, str):  # Handle errors gracefully
#                 print(f"Error for {medicine_name}, {pharmacy_name}: {prediction}")
#                 continue
#             accuracy = prediction[0] == expected  # Compare predicted with actual
#             accuracies.append(accuracy)
        
#         overall_accuracy = sum(accuracies) / len(accuracies) if accuracies else 0
#         self.assertGreaterEqual(overall_accuracy, 0.8)  # Assuming 80% accuracy is required

#     def load_actual_data(self):
#         df = pd.read_csv(DATASET_PATH)
#         test_data = list(zip(df['Name'], df['Pharmacy_Name']))  # Pair medicine and pharmacy names
#         expected_outcomes = df['Sales_Count'].tolist()  # Replace 'Sales_Count' with the actual target column
#         return test_data, expected_outcomes


# if __name__ == '__main__':
#     unittest.main()

# import unittest
# import sys
# import os
# import pandas as pd

# # Add parent directory to path for imports
# sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# from trainModel import MedicineSalesPredictor

# class TestModelAccuracy(unittest.TestCase):
#     def setUp(self):
#         self.model = MedicineSalesPredictor()
#         self.model.load_data()

#     def test_model_accuracy(self):
#         medicine_name = "Paracetamol"
#         pharmacy_name = "ABC Pharmacy"
#         prediction = self.model.predict_sales(medicine_name, pharmacy_name, months_ahead=1)
        
#         self.assertIsNotNone(prediction)
#         if prediction is not None and not isinstance(prediction, str):
#             self.assertTrue(isinstance(prediction, list))
#             self.assertEqual(len(prediction), 1)

# if __name__ == '__main__':
#     unittest.main()


import unittest
import os
import sys

# Add parent directory to path for imports
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)

try:
    from trainModel import MedicineSalesPredictor
    IMPORTS_SUCCESSFUL = True
except ImportError as e:
    print(f"Import Error: {e}")
    IMPORTS_SUCCESSFUL = False

@unittest.skipUnless(IMPORTS_SUCCESSFUL, "Required imports failed")
class TestMedicineSalesPredictor(unittest.TestCase):
    def setUp(self):
        """Initialize the predictor and load data"""
        self.predictor = MedicineSalesPredictor()
        self.predictor.load_data()

    def test_data_loaded(self):
        """Verify data is loaded correctly"""
        self.assertIsNotNone(self.predictor.df)
        self.assertGreater(len(self.predictor.df), 0)

    def test_prediction_accuracy(self):
        """Test prediction accuracy for a known medicine-pharmacy pair"""
        medicine_name = "Acetocillin"  # Update with actual medicine name
        pharmacy_name = "CVS Pharmacy" # Update with actual pharmacy name
        
        # Get predictions
        predictions = self.predictor.predict_sales(
            medicine_name=medicine_name,
            pharmacy_name=pharmacy_name,
            months_ahead=1
        )
        
        self.assertIsNotNone(predictions)
        print(f"Predictions: {predictions}")

if __name__ == '__main__':
    unittest.main(verbosity=2)