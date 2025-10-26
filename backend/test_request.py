import requests

url = "http://127.0.0.1:5000/predict"

data = {
    "Age": 46,
    "Gender": "Female",
    "Employment Status": "unemployed",
    "Prescription Duration": 23,
    "Prescription Drug Used": "Oxymorphone",
    "Days Since First Use": 157,
    "Alcohol": "Yes",
    "Smoking": "No",
    "Depression": "No",
    "Anxiety": "No",
    "Sleeplessness": "No",
    "Feverish": "randomly"
}

response = requests.post(url, json=data)
print(response.json())
