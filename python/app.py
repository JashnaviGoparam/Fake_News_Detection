"""
app.py — Flask backend serving the UI and the prediction REST API.

Run:  python app.py       ->  http://127.0.0.1:5000
"""

import os

import joblib
import numpy as np
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS

from database import init_db, log_prediction, recent_predictions
from preprocess import clean_text

MODEL_PATH = os.path.join("model", "model.pkl")
VECTORIZER_PATH = os.path.join("model", "vectorizer.pkl")
MIN_CHARS = 20

app = Flask(__name__)
CORS(app)

# Load the trained artefacts once at startup (never per request).
if not (os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH)):
    raise SystemExit("Model files not found. Run `python train_model.py` first.")

model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)
init_db()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/api/predict", methods=["POST"])
def predict():
    """Accept {"text": "..."} and return the label with a confidence score."""
    try:
        payload = request.get_json(silent=True) or {}
        text = (payload.get("text") or "").strip()

        # ---- input validation -------------------------------------------
        if not text:
            return jsonify({"success": False, "error": "Please enter some news text."}), 400
        if len(text) < MIN_CHARS:
            return jsonify(
                {"success": False, "error": f"Text must be at least {MIN_CHARS} characters."}
            ), 400
        if not any(ch.isalpha() for ch in text):
            return jsonify({"success": False, "error": "Text must contain readable words."}), 400

        cleaned = clean_text(text)
        if not cleaned:
            return jsonify(
                {"success": False, "error": "No meaningful words remained after preprocessing."}
            ), 400

        # ---- prediction ---------------------------------------------------
        features = vectorizer.transform([cleaned])
        prediction = int(model.predict(features)[0])
        proba = model.predict_proba(features)[0]
        confidence = float(np.max(proba))

        label = "FAKE NEWS" if prediction == 1 else "REAL NEWS"
        log_prediction(text, label, confidence)

        return jsonify(
            {
                "success": True,
                "label": label,
                "prediction": prediction,
                "confidence": round(confidence * 100, 2),
                "fake_probability": round(float(proba[1]), 4),
            }
        )

    except Exception as exc:  # pragma: no cover
        app.logger.exception("prediction failed")
        return jsonify({"success": False, "error": f"Internal error: {exc}"}), 500


@app.route("/api/history", methods=["GET"])
def history():
    return jsonify({"success": True, "items": recent_predictions(limit=20)})


@app.errorhandler(404)
def not_found(_):
    return jsonify({"success": False, "error": "Endpoint not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)
