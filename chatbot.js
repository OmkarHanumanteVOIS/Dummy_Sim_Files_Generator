const OPENAI_API_KEY = "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"; // Replace with actual OpenAI API key

async function getChatGPTResponse(userMessage) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4",  // You can use "gpt-3.5-turbo" if needed
            messages: [{ role: "user", content: userMessage }],
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    // Display user message
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // Get AI response
    let response = await getChatGPTResponse(userInput);
    chatBox.innerHTML += `<p><strong>AI:</strong> ${response}</p>`;

    // Clear input field
    document.getElementById("user-input").value = "";
}
