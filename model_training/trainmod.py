import os
import pandas as pd


DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
DATASET_PATH = os.path.join(DATA_DIR, 'medicine_dataset.csv')

class MedicineSalesPredictor:
    def __init__(self, data_path):
        self.data_path = data_path
        self.df = None
        self.models = {}
        self.load_data()

    def load_data(self):
        try:
            self.df = pd.read_csv(self.data_path)
            # print(self.df.head())
        except Exception as e:
            print(f"Error loading data: {e}")
            self.df = None
            
    def predict_sales(self, medicine_name, pharmacy_name, months_ahead=1):
        # Placeholder for prediction logic
        print(f"Medicine: {medicine_name}, Pharmacy: {pharmacy_name}")
        print(f"Available medicines: {self.df['Name'].unique()}")
        print(f"Available pharmacies: {self.df['Pharmacy_Name'].unique()}")

        return [100] * months_ahead  # Dummy prediction

if __name__ == "__main__":
    predictor = MedicineSalesPredictor(DATASET_PATH)