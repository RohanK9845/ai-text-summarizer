
const API_URL = "http://localhost:5000";

// Test backend connection
export const testBackend = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Backend connection failed:", error);
    throw error;
  }
};

// Generate AI summary
export const summarizeText = async (text, length = "medium") => {
  try {
    const response = await fetch(`${API_URL}/api/summarize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, length }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate summary");
    }

    return data.summary;
  } catch (error) {
    console.error("Summarization failed:", error);
    throw error;
  }
};
