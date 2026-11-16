
import { useState } from "react";
import "./App.css";
import { testBackend } from "./api";

function App() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const handleSummarize = () => {
    if (!text.trim()) {
      setMessage("Please enter some text first.");
      return;
    }

    setMessage("Your text is ready for AI summarization!");
  };

  const handleTestBackend = async () => {
    try {
      const data = await testBackend();
      setMessage(data.message);
    } catch (error) {
      setMessage("Could not connect to Flask backend.");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h2>AI Summarizer</h2>
        <span>Powered by AI</span>
      </header>

      <main className="container">
        <h1>Summarize Anything.</h1>
        <p>
          Turn lengthy text into clear, concise summaries.
        </p>

        <div className="input-card">
          <label>Enter your text</label>

          <textarea
            placeholder="Paste your content here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="footer">
            <span>{text.length} characters</span>

            <button onClick={handleSummarize}>
              Summarize
            </button>
          </div>

          {message && <p className="message">{message}</p>}

          <button onClick={handleTestBackend}>
            Test Backend Connection
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
