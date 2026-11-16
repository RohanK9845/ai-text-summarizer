
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Allow requests from the React frontend
CORS(app, origins=["http://localhost:5173"])


@app.route("/")
def home():
    return jsonify({
        "message": "AI Text Summarizer API is running!"
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
