require('dotenv').config(); // Load environment variables
const fetch = require('node-fetch');

const API_HOST = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = "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"; // Store API key securely
const SITE_URL = "https://voisvznlutility.github.io"; // Your site URL
const SITE_NAME = "Utility AI Chatbot"; // Your site title

async function getAIResponse(userMessage) {
    try {
        const response = await fetch(API_HOST, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "HTTP-Referer": SITE_URL, // Optional. For rankings.
                "X-Title": SITE_NAME, // Optional. For rankings.
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "deepseek/deepseek-r1:free",
                "messages": [
                    { "role": "user", "content": userMessage }
                ]
            })
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "Oops! No response received.";
    } catch (error) {
        console.error("API Error:", error);
        return "Error connecting to AI service.";
    }
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
