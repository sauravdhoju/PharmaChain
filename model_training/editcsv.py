import pandas as pd
import os

def remove_column_from_csv(input_file, output_file, columns_to_remove):
    try:
        # Load the CSV file into a DataFrame
        df = pd.read_csv(input_file)
        
        # Print available columns for debugging
        print("Available columns:", df.columns.tolist())
        
        # Check if the columns exist
        if all(col in df.columns for col in columns_to_remove):
            # Drop the unwanted columns
            df = df.drop(columns=columns_to_remove)
            print(f"Columns {columns_to_remove} removed successfully.")
        else:
            print(f"One or more columns not found in the CSV file.")
        
        # Save the updated DataFrame to a new CSV file
        df.to_csv(output_file, index=False)
        print(f"Updated CSV file saved as '{output_file}'.")
    except Exception as e:
        print(f"An error occurred: {e}")

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
IN_DATASET_PATH = os.path.join(DATA_DIR, 'medicine_dataset.csv')
OUT_DATASET_PATH = os.path.join(DATA_DIR, 'medicine_dataset.csv')

# Corrected column names to match CSV file
columns_to_remove = ['Manufactured_Date']

if __name__ == '__main__':
    remove_column_from_csv(IN_DATASET_PATH, OUT_DATASET_PATH, columns_to_remove)