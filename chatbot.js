const DEEPSEEK_API_KEY = "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"; // Replace with your actual key

async function getDeepSeekResponse(userMessage) {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "deepseek/deepseek-r1:free",
            messages: [{ role: "user", content: userMessage }],
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
    let response = await getDeepSeekResponse(userInput);
    chatBox.innerHTML += `<p><strong>AI:</strong> ${response}</p>`;

    // Clear input field
    document.getElementById("user-input").value = "";
}
