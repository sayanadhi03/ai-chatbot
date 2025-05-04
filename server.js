// Express server to handle API requests for the chatbot
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Store chat history (in production, use a database)
const chatSessions = new Map();

// Function to format the response
function formatResponse(text) {
  // Ensure proper line breaks for lists
  let formatted = text;

  // Make sure numbered points start on a new line
  formatted = formatted.replace(/(\d+\.\s)/g, "\n$1");

  // Make sure bullet points start on a new line
  formatted = formatted.replace(/([\*\-]\s)/g, "\n$1");

  // Remove any double line breaks that might have been created
  formatted = formatted.replace(/\n\n/g, "\n");

  // Remove leading line break if present
  formatted = formatted.replace(/^\n/, "");

  return formatted;
}

app.post("/api/chat", async (req, res) => {
  try {
    const { message, sessionId = "default" } = req.body;

    // Get or create chat session
    if (!chatSessions.has(sessionId)) {
      const chat = await model.startChat({
        history: [
          { role: "user", parts: [{ text: "Hello" }] },
          {
            role: "model",
            parts: [
              { text: "Great to meet you. What would you like to know?" },
            ],
          },
        ],
      });
      chatSessions.set(sessionId, chat);
    }

    const chat = chatSessions.get(sessionId);

    // Send message and get response
    const result = await chat.sendMessage(message);
    const rawResponse = result.response.text();

    // Format the response for better readability
    const formattedResponse = formatResponse(rawResponse);

    res.json({ response: formattedResponse });
  } catch (error) {
    console.error("Error processing chat message:", error);
    res.status(500).json({ error: "Failed to process your message" });
  }
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
