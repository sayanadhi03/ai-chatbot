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

    // Format response to ensure proper line breaks for lists
    // This is a backup in case the backend doesn't format properly
    let formattedResponse = data.response;

    // Ensure numbered lists and bullet points have proper line breaks
    formattedResponse = formattedResponse.replace(/(\d+\.\s)/g, "\n$1");
    formattedResponse = formattedResponse.replace(/([\*\-]\s)/g, "\n$1");

    // Remove any double line breaks that might have been created
    formattedResponse = formattedResponse.replace(/\n\n/g, "\n");

    // Remove leading line break if present
    formattedResponse = formattedResponse.replace(/^\n/, "");

    return formattedResponse;
  } catch (error) {
    console.error("Error in sendMessage:", error);
    throw error;
  }
};
