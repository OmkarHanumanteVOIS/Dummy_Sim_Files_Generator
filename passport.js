function generatePassportNumber() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    let passportNumber = 'N'; // Start with "N"
    for (let i = 1; i < 9; i++) { // 8 more characters to complete the 9-character number
        const randomIndex = Math.floor(Math.random() * characters.length);
        passportNumber += characters[randomIndex];
    }
    return passportNumber;
}

function generatePassportNumbers() {
    const count = document.getElementById('entryCount').value; // Get the number of passport numbers to generate
    const outputElement = document.getElementById('output');
    outputElement.textContent = ''; // Clear previous output

    for (let i = 0; i < count; i++) {
        const passportNumber = generatePassportNumber();
        outputElement.textContent += `${passportNumber}\n`; // Append each generated passport number
    }
}
