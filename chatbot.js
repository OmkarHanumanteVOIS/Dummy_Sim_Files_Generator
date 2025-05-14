const OPENROUTER_API_KEY = "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"; // Replace with actual key

async function getAIResponse(userMessage) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://yourgithubrepo.com", // Optional
            "X-Title": "Utility AI Chatbot" // Optional
        },
        body: JSON.stringify({
            "model": "deepseek/deepseek-r1:free",
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
