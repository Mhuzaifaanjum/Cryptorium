// JavaScript for Affine Cipher

// Function to switch between tabs
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;

    // Hide all tab contents
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove active class from all tab links
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Set the default tab to open
document.getElementById("defaultOpen").click();

// Affine Cipher encryption function
function encryptText() {
    const text = document.getElementById("encryptText").value;
    const a = parseInt(document.getElementById("encryptKeyA").value);
    const b = parseInt(document.getElementById("encryptKeyB").value);

    if (!text || isNaN(a) || isNaN(b)) {
        alert("Please enter text and valid keys.");
        return;
    }

    const encryptedText = affineEncrypt(text, a, b);
    document.getElementById("encryptedText").value = encryptedText;

    // Save to history
    saveToHistory(`Encrypt: ${text} -> ${encryptedText}`);
}

// Affine Cipher decryption function
function decryptText() {
    const text = document.getElementById("decryptText").value;
    const a = parseInt(document.getElementById("decryptKeyA").value);
    const b = parseInt(document.getElementById("decryptKeyB").value);

    if (!text || isNaN(a) || isNaN(b)) {
        alert("Please enter text and valid keys.");
        return;
    }

    const decryptedText = affineDecrypt(text, a, b);
    document.getElementById("decryptedText").value = decryptedText;

    // Save to history
    saveToHistory(`Decrypt: ${text} -> ${decryptedText}`);
}

// Function to clear text fields
function clearText(type) {
    if (type === 'encrypt') {
        document.getElementById("encryptText").value = '';
        document.getElementById("encryptKeyA").value = '';
        document.getElementById("encryptKeyB").value = '';
        document.getElementById("encryptedText").value = '';
    } else if (type === 'decrypt') {
        document.getElementById("decryptText").value = '';
        document.getElementById("decryptKeyA").value = '';
        document.getElementById("decryptKeyB").value = '';
        document.getElementById("decryptedText").value = '';
    }
}

// Function to clear history
function clearHistory() {
    document.getElementById("history").value = '';
}

// Function to save history
function saveHistory() {
    // Here you can implement logic to save history to a file or database
    alert("History saved.");
}

// Function to search history
function searchHistory() {
    const searchTerm = prompt("Enter search term:");
    const historyText = document.getElementById("history").value;

    if (searchTerm) {
        const results = historyText.split('\n').filter(entry => entry.includes(searchTerm)).join('\n');
        if (results) {
            alert("Search results:\n" + results);
        } else {
            alert("No matches found.");
        }
    }
}

// Function to save an entry to the history
function saveToHistory(entry) {
    const history = document.getElementById("history");
    history.value += `${entry}\n`;
}

// Affine Cipher encryption algorithm
function affineEncrypt(text, a, b) {
    let result = '';
    text = text.toUpperCase();
    for (let i = 0; i < text.length; i++) {
        let char = text.charCodeAt(i);
        if (char >= 65 && char <= 90) {
            result += String.fromCharCode(((a * (char - 65) + b) % 26) + 65);
        } else {
            result += text[i];
        }
    }
    return result;
}

// Affine Cipher decryption algorithm
function affineDecrypt(text, a, b) {
    let result = '';
    text = text.toUpperCase();
    const aInv = modInverse(a, 26); // Compute modular inverse of a

    if (aInv === -1) {
        alert("Invalid key A for decryption.");
        return '';
    }

    for (let i = 0; i < text.length; i++) {
        let char = text.charCodeAt(i);
        if (char >= 65 && char <= 90) {
            result += String.fromCharCode(((aInv * (char - 65 - b + 26)) % 26 + 26) % 26 + 65);
        } else {
            result += text[i];
        }
    }
    return result;
}

// Function to compute modular inverse
function modInverse(a, m) {
    a = a % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return -1; // No modular inverse exists
}
