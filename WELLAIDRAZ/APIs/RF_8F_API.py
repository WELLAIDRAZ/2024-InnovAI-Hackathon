from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import joblib  # or other libraries to load your model
import numpy as np

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load the trained pipeline and model (adjust based on your model and path)
pipeline = joblib.load('../Models/scaling_pipeline_model_8F.pkl')  # The pipeline with imputer and scaler
model = joblib.load('../Models/model8F.pkl')  # The trained model

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        # Extract data from the request
        HR = data['HR']
        O2Sat = data['O2Sat']
        Temp = data['Temp']
        SBP = data['SBP']
        MAP = data['MAP']
        DBP = data['DBP']
        Resp = data['Resp']
        Etco2 = data['Etco2']

        # Create the feature vector (ensure it matches what your model expects)
        features = np.array([[HR, O2Sat, Temp, SBP, MAP, DBP, Resp, Etco2]])

        # Preprocess the features using the same pipeline
        features_scaled = pipeline.transform(features)  # Apply scaling and imputation

        # Make the prediction and get probabilities (adjust for your model)
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
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8002)
