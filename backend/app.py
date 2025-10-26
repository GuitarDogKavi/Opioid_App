from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model_path = r"C:\Users\mpkhd\Desktop\Project-3\backend\.venv\model\rf_model.pkl"
encoder_path = r"C:\Users\mpkhd\Desktop\Project-3\backend\.venv\model\label_encoders.pkl"

model = joblib.load(model_path)
encoders = joblib.load(encoder_path)

FEATURES = [
    'Age','Gender','Employment Status','Prescription Duration',
    'Prescription Drug Used','Days Since First Use','Alcohol','Smoking',
    'Depression','Anxiety','Sleeplessness','Feverish'
]

@app.route('/')
def home():
    return jsonify({"message": "Flask ML API is running."})

@app.route('/data', methods=['GET'])
def get_data():
    try:
        csv_path = r"C:\Users\mpkhd\Desktop\Project-3\backend\.venv\data\opioid_data.csv"
        df = pd.read_csv(csv_path)

        result = {}
        categorical_cols = [
            'Gender','Employment Status','Alcohol','Smoking',
            'Depression','Anxiety','Sleeplessness','Feverish','Prescription Drug Used'
        ]
        
        for col in categorical_cols:
            grouped = df.groupby([col, 'Opioid Addiction']).size().unstack(fill_value=0)
            grouped = grouped.rename(columns={0: 'notAddicted', 1: 'addicted'})
            
            records = []
            for idx in grouped.index:
                records.append({
                    col: str(idx),
                    'addicted': int(grouped.loc[idx, 'addicted']),
                    'notAddicted': int(grouped.loc[idx, 'notAddicted'])
                })
            
            result[col] = records
        
        print("Returning data:", result)
        return jsonify(result)
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/boxplot-data', methods=['GET'])
def get_boxplot_data():
    try:
        csv_path = r"C:\Users\mpkhd\Desktop\Project-3\backend\.venv\data\opioid_data.csv"
        df = pd.read_csv(csv_path)

        result = {}
        numeric_cols = ['Age', 'Prescription Duration', 'Days Since First Use']
        
        for col in numeric_cols:
            addicted_data = df[df['Opioid Addiction'] == 1][col].dropna()
            not_addicted_data = df[df['Opioid Addiction'] == 0][col].dropna()
            
            # Calculate 5-number summary and mean for addicted group
            addicted_stats = {
                'min': float(addicted_data.min()),
                'q1': float(addicted_data.quantile(0.25)),
                'median': float(addicted_data.median()),
                'q3': float(addicted_data.quantile(0.75)),
                'max': float(addicted_data.max()),
                'mean': float(addicted_data.mean()),
                'count': int(len(addicted_data))
            }
            
            # Calculate 5-number summary and mean for not addicted group
            not_addicted_stats = {
                'min': float(not_addicted_data.min()),
                'q1': float(not_addicted_data.quantile(0.25)),
                'median': float(not_addicted_data.median()),
                'q3': float(not_addicted_data.quantile(0.75)),
                'max': float(not_addicted_data.max()),
                'mean': float(not_addicted_data.mean()),
                'count': int(len(not_addicted_data))
            }
            
            result[col] = {
                'addicted': addicted_stats,
                'notAddicted': not_addicted_stats
            }
        
        print("Returning boxplot data:", result)
        return jsonify(result)
        
    except Exception as e:
        print(f"Error in boxplot data: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        missing = [f for f in FEATURES if f not in data]
        if missing:
            return jsonify({"error": f"Missing features: {missing}"}), 400
        
        input_df = pd.DataFrame([data], columns=FEATURES)

        for col, le in encoders.items():
            if col in input_df.columns:
                input_df[col] = le.transform(input_df[col])

        prediction = model.predict(input_df)[0] 
        proba = model.predict_proba(input_df)[0][1] if hasattr(model, "predict_proba") else None

        return jsonify({
            "prediction": int(prediction),
            "probability": float(proba) if proba is not None else None
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)