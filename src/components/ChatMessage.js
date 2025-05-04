import React from "react";

const ChatMessage = ({ message }) => {
  // Function to format the text with proper line breaks and spacing for lists
  const formatText = (text) => {
    // Handle numbered lists (1. 2. 3. etc)
    const numberedListRegex = /^\d+\.\s/;

    // Handle bullet points (* or - )
    const bulletPointRegex = /^[\*\-]\s/;

    // Split the text into lines
    const lines = text.split("\n");

    return lines.map((line, index) => {
      // Check if line is a list item (starts with number. or * or -)
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
