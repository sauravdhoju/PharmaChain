import pandas as pd
import numpy as np
from datetime import datetime
from statsmodels.tsa.arima.model import ARIMA
from sklearn.preprocessing import LabelEncoder
import warnings
warnings.filterwarnings('ignore')

# Load the data
def load_data():
    df = pd.read_csv('data/medicine_dataset.csv')
    df['Manufactured Date'] = pd.to_datetime(df['Manufactured Date'])
    df['Expiry Date'] = pd.to_datetime(df['Expiry Date'])
    return df

# Prepare time series data for a specific medicine
def prepare_time_series(df, medicine_name):
    # Filter data for specific medicine
    medicine_data = df[df['Name'] == medicine_name]
    
    # Group by manufacture date and calculate mean sales
    monthly_sales = medicine_data.groupby('Manufactured Date')['Sales Count'].mean()
    monthly_sales = monthly_sales.resample('M').mean()
    
    # Fill missing values with forward fill
    monthly_sales = monthly_sales.fillna(method='ffill')
    return monthly_sales

# Train ARIMA model
def train_arima_model(time_series_data):
    # ARIMA parameters
    p, d, q = 1, 1, 1  # Default parameters
    
    # Create and train the model
    model = ARIMA(time_series_data, order=(p, d, q))
    results = model.fit()
    return results

# Predict future sales
def predict_future_sales(model, n_periods=1):
    """
    Predict sales for n_periods ahead
    """
    forecast = model.forecast(steps=n_periods)
    return forecast

# Main function to make predictions
def predict_medicine_sales(medicine_name, months_ahead=1):
    """
    Predict sales for a specific medicine
    """
    # Load and prepare data
    df = load_data()
    
    # Check if medicine exists in dataset
    if medicine_name not in df['Name'].unique():
        return f"Error: Medicine {medicine_name} not found in dataset"
    
    # Prepare time series data
    time_series_data = prepare_time_series(df, medicine_name)
    
    # Train model
    model = train_arima_model(time_series_data)
    
    # Make prediction
    prediction = predict_future_sales(model, months_ahead)
    
    return prediction[0]  # Return first predicted value

# Example usage
if __name__ == "__main__":
    # Example prediction for Acetocillin
    medicine_name = "Cefcillin"
    predicted_sales = predict_medicine_sales(medicine_name)
    print(f"Predicted average sales for {medicine_name} next month: {predicted_sales:.2f}")
    
    # Example prediction for multiple medicines
    # medicines = ["Acetocillin", "Ibuprocillin", "Metophen"]
    # for medicine in medicines:
    #     predicted_sales = predict_medicine_sales(medicine)
    #     print(f"Predicted average sales for {medicine} next month: {predicted_sales:.2f}")