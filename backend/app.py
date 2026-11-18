
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])

# Initialize Gemini
api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key) if api_key else None


@app.route("/")
def home():
    return jsonify({
        "message": "AI Text Summarizer API is running!"
    })



@app.route("/api/summarize", methods=["POST"])
def summarize():

    if not client:
        return jsonify({
            "error": "Gemini API key is not configured."
        }), 500

    data = request.get_json(silent=True) or {}
    text = data.get("text", "").strip()
    length = data.get("length", "medium").lower()

    if not text:
        return jsonify({
            "error": "Please provide text to summarize."
        }), 400

    instructions = {
        "short": "Summarize in 2-3 concise sentences.",
        "medium": "Summarize in one clear, concise paragraph.",
        "detailed": "Provide a detailed summary in multiple paragraphs, covering the important ideas and key points."
    }

    if length not in instructions:
        return jsonify({
            "error": "Invalid summary length."
        }), 400

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=f"{instructions[length]}\n\nText:\n{text}"
        )

        return jsonify({
            "summary": response.text
        })

    except Exception:
        app.logger.exception("Gemini summarization failed")
        return jsonify({
            "error": "Unable to generate summary. Please try again."
        }), 500



if __name__ == "__main__":
    app.run(debug=True, port=5000)
