from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import traceback  # Import traceback for error logging

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load the trained pipeline and model
pipeline = joblib.load('../Models/model40F.pkl')  # The pipeline with imputer and scaler
model = joblib.load('../Models/scaling_pipeline_model_40F.pkl')  # The trained model

# Define the column names based on how the model was trained
columns = [
    'HR', 'O2Sat', 'Temp', 'SBP', 'MAP', 'DBP', 'Resp', 'EtCO2', 'BaseExcess', 'HCO3', 'FiO2', 'pH', 'PaCO2', 'SaO2',
    'AST', 'BUN', 'Alkalinephos', 'Calcium', 'Chloride', 'Creatinine', 'Bilirubin_direct', 'Glucose', 'Lactate',
    'Magnesium', 'Phosphate', 'Potassium', 'Bilirubin_total', 'TroponinI', 'Hct', 'Hgb', 'PTT', 'WBC', 'Fibrinogen',
    'Platelets', 'Age', 'Gender', 'Unit1', 'Unit2', 'HospAdmTime', 'ICULOS'
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        # Extract data from the request
        features = [
            data['HR'], data['O2Sat'], data['Temp'], data['SBP'], data['MAP'], data['DBP'], data['Resp'], data['EtCO2'],
            data['BaseExcess'], data['HCO3'], data['FiO2'], data['pH'], data['PaCO2'], data['SaO2'], data['AST'], data['BUN'],
            data['Alkalinephos'], data['Calcium'], data['Chloride'], data['Creatinine'], data['Bilirubin_direct'],
            data['Glucose'], data['Lactate'], data['Magnesium'], data['Phosphate'], data['Potassium'],
            data['Bilirubin_total'], data['TroponinI'], data['Hct'], data['Hgb'], data['PTT'], data['WBC'],
            data['Fibrinogen'], data['Platelets'], data['Age'], data['Gender'], data['Unit1'], data['Unit2'],
            data['HospAdmTime'], data['ICULOS']
        ]

        # Create a pandas DataFrame with the correct column names
        features_df = pd.DataFrame([features], columns=columns)

        # Preprocess the features using the same pipeline
        features_scaled = pipeline.transform(features_df)  # Apply scaling and imputation

        # Make the prediction and get probabilities
        probabilities = model.predict_proba(features_scaled)  # This returns probabilities

        # Get the class with the highest probability
        predicted_class = model.predict(features_scaled)  # This returns the predicted class
        highest_probability_class = predicted_class[0]

        # Convert the results to native Python types
        prediction = int(highest_probability_class)  # Convert to native int
        probability = float(probabilities[0][highest_probability_class])  # Convert to native float

        # Return only the predicted class and its probability
        return jsonify({
            "prediction": prediction,  # Only the predicted class
            "probabilities": probability  # Probability of the predicted class
        })

    except Exception as e:
        # Log the exception traceback for debugging
        error_message = traceback.format_exc()
        print("Error occurred:", error_message)
        return jsonify({"error": "Internal server error", "details": error_message}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8001)
