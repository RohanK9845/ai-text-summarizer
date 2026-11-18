
import { useState } from "react";
import "./App.css";
import { testBackend, summarizeText } from "./api";

function App() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [summaryLength, setSummaryLength] = useState("medium");

  const handleSummarize = async () => {
    if (!text.trim()) {
      setMessage("Please enter some text first.");
      setSummary("");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setSummary("");

      const result = await summarizeText(text, summaryLength);

      setSummary(result);
      setMessage("Summary generated successfully!");
    } catch (error) {
      setMessage(error.message || "Could not generate summary.");
    } finally {
      setLoading(false);
    }
  };


const handleCopySummary = async () => {
  try {
    await navigator.clipboard.writeText(summary);
    setMessage("Summary copied to clipboard!");
  } catch (error) {
    setMessage("Unable to copy summary.");
  }
};


const handleClear = () => {
  setText("");
  setSummary("");
  setMessage("");
  setSummaryLength("medium");
};


const wordCount = text.trim()
  ? text.trim().split(/\s+/).length
  : 0;

const readingTime = Math.max(1, Math.ceil(wordCount / 200));


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

          <div className="summary-options">
  <label>Summary Length</label>

  <select
    value={summaryLength}
    onChange={(e) => setSummaryLength(e.target.value)}
  >
    <option value="short">Short</option>
    <option value="medium">Medium</option>
    <option value="detailed">Detailed</option>
  </select>
</div>

          <textarea
            placeholder="Paste your content here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          
<div className="footer">
  
<div className="text-stats">
  <span>{wordCount} words</span>
  <span>{readingTime} min read</span>
  <span>{text.length} characters</span>
</div>


  <div>
    <button onClick={handleClear} disabled={loading}>
      Clear
    </button>

    <button onClick={handleSummarize} disabled={loading}>
      {loading ? "Generating..." : "Summarize"}
    </button>
  </div>
</div>


          {message && <p className="message">{message}</p>}

          
{summary && (
  <div className="summary-card">
    <h3>AI Generated Summary</h3>

    <div className="summary-content">
      <p>{summary}</p>
    </div>

    <button onClick={handleCopySummary}>
      Copy Summary
    </button>
  </div>
)}


          <button onClick={handleTestBackend}>
            Test Backend Connection
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
