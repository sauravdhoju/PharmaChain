import pandas as pd
import numpy as np
from datetime import datetime
from statsmodels.tsa.arima.model import ARIMA
import warnings
import os
warnings.filterwarnings('ignore')
import json, sys
# Constants
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
DATASET_PATH = os.path.join(DATA_DIR, 'medicine_dataset.csv')

def ensure_data_dir():
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
    if not os.path.exists(DATASET_PATH):
        raise FileNotFoundError(f"Dataset not found at {DATASET_PATH}")

def get_unique_values():
    try:
        ensure_data_dir()
        df = pd.read_csv(DATASET_PATH)
        medicines = sorted(df['Name'].unique())
        pharmacies = sorted(df['Pharmacy_Name'].unique())
        return medicines, pharmacies
    except FileNotFoundError as e:
        print(f"Error: {str(e)}")
        return [], []

def display_menu(options, title):
    """Display interactive menu for selection"""
    print(f"\n{title}:")
    for idx, option in enumerate(options, 1):
        print(f"{idx}. {option}")
    
    while True:
        try:
            choice = int(input(f"\nSelect {title.lower()} (1-{len(options)}): "))
            if 1 <= choice <= len(options):
                return options[choice-1]
            print("Invalid selection. Try again.")
        except ValueError:
            print("Please enter a number.")

class MedicineSalesPredictor:
    def __init__(self):
        self.models = {}
        self.df = None
        
    def load_data(self):
        try:
            ensure_data_dir()
            self.df = pd.read_csv(DATASET_PATH)
            # self.df['Manufactured_Date'] = pd.to_datetime(self.df['Manufactured_Date'])
            self.df['Expiry_Date'] = pd.to_datetime(self.df['Expiry_Date'])
            return True
        except FileNotFoundError as e:
            print(f"Error: {str(e)}")
            return False

    def prepare_time_series(self, medicine_name, pharmacy_name):
        mask = (self.df['Name'] == medicine_name) & (self.df['Pharmacy_Name'] == pharmacy_name)
        filtered_data = self.df[mask].copy()

        if filtered_data.empty:
            return None
            
        # Convert day_of_sales to datetime
        filtered_data['day_of_sales'] = pd.to_datetime(filtered_data['day_of_sales'])

        # Group by month of sales and calculate mean
        monthly_sales = filtered_data.groupby(
            filtered_data['day_of_sales'].dt.to_period('M')
        )['Sales_Count'].mean()

        # Convert PeriodIndex to TimestampIndex
        monthly_sales.index = monthly_sales.index.to_timestamp()

        # Sort by date and handle missing values
        monthly_sales = monthly_sales.sort_index()
        monthly_sales = monthly_sales.ffill()
        return monthly_sales

    def predict_sales(self, medicine_name, pharmacy_name, months_ahead=12):
        if self.df is None:
            if not self.load_data():
                return "Error: Could not load data"

        if medicine_name not in self.df['Name'].unique():
            return f"Error: Medicine {medicine_name} not found"
        if pharmacy_name not in self.df['Pharmacy_Name'].unique():
            return f"Error: Pharmacy {pharmacy_name} not found"

        model = self.train_model(medicine_name, pharmacy_name)
        if model is None:
            return f"Error: No data available for {medicine_name} at {pharmacy_name}"

        predictions = model.forecast(steps=months_ahead)
        return predictions.tolist()  # Convert predictions to a list




    def train_model(self, medicine_name, pharmacy_name):
        key = f"{medicine_name}_{pharmacy_name}"
        
        if key in self.models:
            return self.models[key]
            
        time_series = self.prepare_time_series(medicine_name, pharmacy_name)
        if time_series is None:
            return None
            
        model = ARIMA(time_series, order=(1,1,1))
        results = model.fit()
        self.models[key] = results
        return results

    # def predict_sales(self, medicine_name, pharmacy_name, months_ahead=1):
    #     if self.df is None:
    #         if not self.load_data():
    #             return "Error: Could not load data"
            
    #     if medicine_name not in self.df['Name'].unique():
    #         return f"Error: Medicine {medicine_name} not found"
    #     if pharmacy_name not in self.df['Pharmacy_Name'].unique():
    #         return f"Error: Pharmacy {pharmacy_name} not found"
            
    #     model = self.train_model(medicine_name, pharmacy_name)
    #     if model is None:
    #         return f"Error: No data available for {medicine_name} at {pharmacy_name}"
            
    #     prediction = model.forecast(steps=months_ahead)
    #     return prediction[0]

# if __name__ == "__main__":
#     if len(sys.argv) != 4:
#         print(json.dumps({
#             "error": "Required arguments: medicine_name pharmacy_name months_ahead"
#         }))
#         sys.exit(1)
        
#     medicine_name = sys.argv[1]
#     pharmacy_name = sys.argv[2]
#     months_ahead = int(sys.argv[3])
    
#     predictor = MedicineSalesPredictor()
#     predictions = predictor.predict_sales(medicine_name, pharmacy_name, months_ahead)
    
#     if isinstance(predictions, str):
#         print(json.dumps({"error": predictions}))
#         sys.exit(1)
    
#     print(json.dumps({"predictions": predictions}))


def main():
    try:
        # Check arguments
        if len(sys.argv) != 4:
            print(json.dumps({
                "error": "Missing arguments",
                "usage": {
                    "command": "python trainModel.py <medicine_name> <pharmacy_name> <months_ahead>",
                    "example": 'python trainModel.py "Paracetamol" "ABC Pharmacy" "12"'
                }
            }))
            return

        # Get arguments
        medicine_name = sys.argv[1]
        pharmacy_name = sys.argv[2]
        months_ahead = int(sys.argv[3])

        # Run prediction
        predictor = MedicineSalesPredictor()
        predictions = predictor.predict_sales(medicine_name, pharmacy_name, months_ahead)

        # Return results
        print(json.dumps({
            "success": True,
            "predictions": predictions.tolist() if hasattr(predictions, 'tolist') else predictions
        }))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    import sys
    import json
    main()