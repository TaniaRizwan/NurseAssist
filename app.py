from flask import Flask, render_template, jsonify, Response
import csv, threading, time, cv2

# Flask setup
app = Flask(__name__, template_folder='templates', static_folder='static')

# Load nurse stress dataset
csv_file = r"static/data/Nurse_Stress_Data(Sheet1).csv" 
with open(csv_file, newline='') as f:
    reader = list(csv.DictReader(f))
    stress_data = reader

# Shared state between thread and Flask routes
state = {
    "Face_Detected": False,
    "Stress_State": stress_data[0]["Stress_State"],
    "Heart_Rate_bpm": stress_data[0]["Heart_Rate_bpm"],
    "HR_Threshold_Label": stress_data[0]["HR_Threshold_Label"],
    "Gaze_State": stress_data[0]["Gaze_State"],
    "Gaze_Metric_0_1": stress_data[0]["Gaze_Metric_0_1"],
    "Step_Trend": stress_data[0]["Step_Trend"]
}

index = {"i": 0}

# Time simulation 
def simulate_csv_timeline():
    while True:
        row = stress_data[index["i"]]

        state["Stress_State"] = row["Stress_State"]
        state["Heart_Rate_bpm"] = row["Heart_Rate_bpm"]
        state["HR_Threshold_Label"] = row["HR_Threshold_Label"]
        state["Gaze_State"] = row["Gaze_State"]
        state["Gaze_Metric_0_1"] = row["Gaze_Metric_0_1"]
        state["Step_Trend"] = row["Step_Trend"]

        index["i"] = (index["i"] + 1) % len(stress_data)

        time.sleep(2)  # simulate 1 minute every 2 seconds

threading.Thread(target=simulate_csv_timeline, daemon=True).start()

#Face Detection Thread
def detect_faces():
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    cap = cv2.VideoCapture(0)

    t = 0 # timeline counter

    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        # ---- FACE DETECTION ----
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        state["Face_Detected"] = len(faces) > 0

        # # ---- DRAW BOUNDING BOX (DEV ONLY) ----
        # for (x, y, w, h) in faces:
        #     cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 4)

        # ---- STREAM FRAME ----
        ret, buffer = cv2.imencode('.jpg', frame) # Converts image frames into streaming data and stores in cache.
        frame_bytes = buffer.tobytes()  # Convert frame to bytes

        yield(b'--frame\r\n'
              b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n') # Display frame
        
        t += 1
        time.sleep(0.03)

# Routes for pages
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('pages/about.html')

@app.route('/signin')
def signin():
    return render_template('pages/signin.html')

@app.route('/tech')
def tech():
    return render_template('pages/tech.html')

@app.route('/video_feed') # Streams webcame to browser
def video_feed():
    return Response(detect_faces(), mimetype='multipart/x-mixed-replace; boundary=frame')

# Route to send current simulated data
@app.route('/get_stress_data')
def get_stress_data():
    return jsonify(state)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)

    