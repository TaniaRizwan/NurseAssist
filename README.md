# 📘 NurseAssist — README

Welcome to **TriageAR**, an AI-enhanced triage decision-support interface built with **Flask**, **OpenCV**, **HTML5**, **CSS**, and **JavaScript**.
TriageAR simulates an augmented-reality emergency department workflow designed to improve a nurse’s situational awareness by dynamically adapting the amount of information shown based on real-time stress indicators.

A Condition Badge (top-right) represents continuous monitoring of a nurse’s state—combining gaze tracking from AR glasses with heart-rate and step data from a smartwatch. Based on these stress levels, the system automatically adjusts the visibility and complexity of triage panels, enabling faster patient assessment and more focused cognitive load during critical moments.

This guide explains how to set up the project on your own machine.

---

## 🛠️ Requirements

Before starting, ensure you have:

* **Python 3.12** (recommended — same version used to build this app)
* **pip**

---

## 📥 1. Clone the Repository

If you have Git installed:

```bash
git clone https://github.com/TaniaRizwan/NurseAssist.git
cd NurseAssist
```

Or download the ZIP from GitHub and extract it manually.

---

## 🧪 2. Create a Virtual Environment

It is strongly recommended to run this project inside a virtual environment.

### macOS / Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

### Windows (PowerShell):

```powershell
python -m venv venv
venv\Scripts\activate
```

---

## 📦 3. Install Dependencies

With the virtual environment activated, run:

```bash
pip install -r requirements.txt
```

If Flask or OpenCV fail to install, you can install them manually:

```bash
pip install flask opencv-python
```

---

## ▶️ 4. Run the Application

Make sure you are inside the project directory and your virtual environment is active.

Start the Flask server:

```bash
python3 app.py
```

You should see output like:

```
* Running on http://127.0.0.1:5000
```

Open this link in your browser:

➡️ **[http://127.0.0.1:5000](http://127.0.0.1:5000)**

The app will launch with:

* Live webcam streaming
* Real-time stress simulation
* Adaptive triage interface
* Dynamic UI based on nurse condition

---

## 🎥 Webcam Access

This application uses your device’s webcam via OpenCV.

If your webcam is already in use by another app, close it and restart the server.

---

## 📁 Project Structure (Simplified)

```
NurseAssist/
│
├── app.py                  # Flask backend + camera + simulation
├── requirements.txt        # Dependencies
├── haarcascade_frontalface_default.xml # Pre-trained classifiers for face detection
│
├── static/
│   ├── css/styles.css      # UI styling
│   ├── js/app.js           # Front-end logic
│   └── assets/             # Images & background assets
│
└── templates/
    ├── index.html
    ├── pages/about.html
    ├── pages/signin.html
    └── pages/tech.html     # AR triage interface
```

---

## ❗ Troubleshooting

### Webcam doesn’t load?

* Close Zoom/Teams/FaceTime/Photo Booth
* Restart your browser
* Restart Flask (`CTRL + C`, then `python3 app.py`)

### `cv2` import error?

Run:

```bash
pip uninstall opencv-python
pip install opencv-python
```

### Blank screen?

Check the terminal for errors — Flask will show helpful tracebacks.

---

## 📬 Support

If you run into issues, please contact one of the project maintainers.

---