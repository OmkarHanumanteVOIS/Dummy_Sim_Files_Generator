// Function to show the selected utility and hide the rest
function showUtility(utility) {
    const utilities = ['iccid', 'eid', 'imei'];
    utilities.forEach((u) => {
        const container = document.getElementById(`${u}-container`);
        if (u === utility) {
            container.classList.remove('hidden');
        } else {
            container.classList.add('hidden');
        }
    });
}

// ICCID Generator Functions
function generateICCID() {
    const prefix = "893106";
    const remainingLength = 12;
    const randomDigits = Array.from({ length: remainingLength }, () => Math.floor(Math.random() * 10)).join('');
    function luhnChecksum(iccid) {
        let sum = 0;
        for (let i = 0; i < iccid.length; i++) {
            let digit = parseInt(iccid.charAt(i), 10);
            if (i % 2 === 1) digit *= 2;
            if (digit > 9) digit -= 9;
            sum += digit;
        }
        return (sum % 10 === 0) ? 0 : (10 - (sum % 10));
    }
    const iccidWithoutChecksum = prefix + randomDigits;
    const checksum = luhnChecksum(iccidWithoutChecksum);
    return iccidWithoutChecksum + checksum.toString();
}

function displayICCID() {
    const iccidElement = document.getElementById("iccid");
    iccidElement.innerHTML = `Generated ICCID: ${generateICCID()}`;
}

function displayMultipleICCID() {
    const count = parseInt(document.getElementById("iccid-count").value);
    if (count > 0 && count <= 10) {
        let output = 'Generated ICCIDs:<br>';
        for (let i = 0; i < count; i++) {
            output += generateICCID() + '<br>';
        }
        document.getElementById("multiple-iccid").innerHTML = output;
    } else {
        alert("Please enter a number between 1 and 10.");
    }
}

// EID Generator Functions
function generateNumber() {
    let number = '';
    while (true) {
        number = '';
        for (let i = 0; i < 32; i++) {
            number += Math.floor(Math.random() * 10);
        }
        let numInt = BigInt(number);
        let remainder = numInt % 97n;

        if (remainder === 1n) {
            return number;
        }
    }
}

function generateAndCheckNumber() {
    const number = generateNumber();
    document.getElementById('eid').innerHTML = `Generated EID: ${number}`;
}

function generateMultipleEIDs() {
    const count = document.getElementById('eid-count').value;
    let eids = [];
    if (count > 0 && count <= 10) {
        for (let i = 0; i < count; i++) {
            eids.push(generateNumber());
        }
        document.getElementById('multiple-eid').innerHTML = `Generated EIDs:<br>${eids.join('<br>')}`;
    } else {
        alert("Please enter a number between 1 and 10.");
    }
}

// IMEI Generator Functions
function generateIMEI() {
    const tac = '35693800'; 
    const serial = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const partialIMEI = tac + serial;

    function luhnChecksum(imei) {
        let sum = 0;
        for (let i = 0; i < imei.length; i++) {
            let digit = parseInt(imei.charAt(i), 10);
            if (i % 2 === 1) digit *= 2;
            if (digit > 9) digit -= 9;
            sum += digit;
        }
        return (sum % 10 === 0) ? 0 : (10 - (sum % 10));
    }

    const checksum = luhnChecksum(partialIMEI);
    const imei = partialIMEI + checksum.toString();
    return imei;
}

function displayIMEI() {
    const imeiElement = document.getElementById("imei");
    imeiElement.innerHTML = `Generated IMEI: ${generateIMEI()}`;
}

function displayMultipleIMEI() {
    const count = parseInt(document.getElementById("imei-count").value);
    if (count > 0 && count <= 10) {
        let output = 'Generated IMEIs:<br>';
        for (let i = 0; i < count; i++) {
            output += generateIMEI() + '<br>';
        }
        document.getElementById("multiple-imei").innerHTML = output;
    } else {
        alert("Please enter a number between 1 and 10.");
    }
}
