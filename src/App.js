import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import ChatMessage from "./components/ChatMessage";
import LoadingDots from "./components/LoadingDots";
import { sendMessage } from "./api/chatService";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Great to meet you. What would you like to know?",
      sender: "ai",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null); // Reference to the input field

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-focus the input field on initial load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    // Add user message to chat
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);

    // Clear input field
    const userMessage = input;
    setInput("");

    // Set loading state
    setIsLoading(true);

    try {
      // Call the API service
      const response = await sendMessage(userMessage);

      // Add AI response to chat
      setMessages((prev) => [...prev, { text: response, sender: "ai" }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error. Please try again.",
          sender: "ai",
        },
      ]);
    } finally {
      setIsLoading(false);
      // Focus the input field after sending the message
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        <div className="chat-header">
          <h1>AI ChatBot 🤖</h1>
        </div>

        <div className="messages-container">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {isLoading && (
            <div className="message ai">
              <div className="message-content">
                <LoadingDots />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form className="input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="message-input"
            disabled={isLoading}
            ref={inputRef} // Add the ref to the input element
          />
          <button
            type="submit"
            className="send-button"
            disabled={isLoading || input.trim() === ""}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
