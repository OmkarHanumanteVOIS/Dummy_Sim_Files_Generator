const OPENROUTER_API_KEY = "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"; // Replace with actual key

async function getAIResponse(userMessage) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer ${OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://voisvznlutility.github.io/", // Optional
            "X-Title": "Utility AI Chatbot" // Optional
        },
        body: JSON.stringify({
            "model": "deepseek/deepseek-chat:free",
            "messages": [{ "role": "user", "content": userMessage }]
        })
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || "Oops! No response received.";
}

async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    // Display user message
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // Get AI-generated response
    let response = await getAIResponse(userInput);
    chatBox.innerHTML += `<p><strong>AI:</strong> ${response}</p>`;

    // Clear input field
    document.getElementById("user-input").value = "";
}
