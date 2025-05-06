import React from "react";

const ChatMessage = ({ message }) => {
  // Function to format the text with proper line breaks and spacing for lists
  const formatText = (text) => {
    console.log("message.text:", text); // Log the actual value of `text`

    // If message.text is not a string, handle accordingly
    if (typeof text !== "string") {
      console.error("Expected 'text' to be a string, but got:", typeof text);

      // If text is an object, stringify it; if null or undefined, set as an empty string
      if (text === null || text === undefined) {
        text = "";
      } else {
        text = String(text); // Convert non-string types to a string
      }
    }

    // Split the text into lines
    const lines = text.split("\n");

    return lines.map((line, index) => {
      // Handle numbered lists (1. 2. 3. etc)
      const numberedListRegex = /^\d+\.\s/;
      const bulletPointRegex = /^[\*\-]\s/;

      const isNumberedList = numberedListRegex.test(line);
      const isBulletList = bulletPointRegex.test(line);

      // Apply styles based on line type
      if (isNumberedList || isBulletList) {
        return (
          <div
            key={index}
            className="list-item"
            style={{ marginTop: "0.5rem", display: "block" }}
          >
            {line}
          </div>
        );
      }

      // Regular line with paragraph spacing
      return (
        <React.Fragment key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className={`message ${message.sender}`}>
      <div className="message-content">{formatText(message.text)}</div>
    </div>
  );
};

export default ChatMessage;
