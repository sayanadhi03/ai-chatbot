// This file will handle the communication with your backend

export const sendMessage = async (message) => {
  try {
    // Call to backend API
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error in sendMessage:", error);
    throw error;
  }
};
