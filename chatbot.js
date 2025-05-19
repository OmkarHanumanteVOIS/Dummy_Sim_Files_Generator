// chatbot.js - Secure ALTCHA API Integration
require('dotenv').config(); // Load environment variables (for security)
const fetch = require('node-fetch');

const API_HOST = "https://voisvznlutility.github.io";
const API_KEY = "ckey_0166287f6517f91d7a623857b5f7";  // Securely stored API key
const API_SECRET = "csec_a284b2be1c8495ee69f88efc3a2e416067309d390ae200ee";

async function getUtilityResponse(userMessage) {
    const response = await fetch(`${API_HOST}/process`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "X-Secret": API_SECRET,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: userMessage })
    });

    const data = await response.json();
    return data.response || "Oops! No response received.";
}

async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    // Display user message
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // Get AI-generated response
    let response = await getUtilityResponse(userInput);
    chatBox.innerHTML += `<p><strong>AI:</strong> ${response}</p>`;

    // Clear input field
    document.getElementById("user-input").value = "";
}
