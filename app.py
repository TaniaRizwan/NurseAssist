from flask import Flask, render_template, jsonify
import csv, threading, time, os

# Flask setup
app = Flask(__name__, template_folder='.', static_folder='.')

# Load nurse stress dataset
csv_file = r"Data\Nurse_Stress_Data(Sheet1).csv" 
with open(csv_file, newline='') as f:
    reader = list(csv.DictReader(f))
    stress_data = reader

# Shared state between thread and Flask routes
state = {"Stress_Level": "Normal", "Heart_Rate": "78"}
index = {"i": 0}

# Background thread to simulate time flow
def simulate_data():
    while True:
        row = stress_data[index["i"]]
        state["Stress_Level"] = row.get("Stress_Level", "Normal")
        state["Heart_Rate"] = row.get("Heart_Rate", "80")
        index["i"] = (index["i"] + 1) % len(stress_data)
        time.sleep(2)  # update interval in seconds

# Start background simulation thread
threading.Thread(target=simulate_data, daemon=True).start()

# Routes for pages
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/tech')
def tech():
    return render_template('pages/tech.html')

# Route to send current simulated data
@app.route('/get_stress_data')
def get_stress_data():
    return jsonify(state)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)

    