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

// Function to encrypt text using AES
function encryptText() {
    const text = document.getElementById("encryptText").value;
    const key = document.getElementById("encryptKey").value;

    if (!text || !key) {
        alert("Please enter text and key.");
        return;
    }

    try {
        const encryptedText = CryptoJS.AES.encrypt(text, key).toString();
        document.getElementById("encryptedText").value = encryptedText;

        // Save to history
        saveToHistory(`Encrypt: ${text} -> ${encryptedText}`);
    } catch (error) {
        alert("Error encrypting text. Please check your key.");
        console.error(error);
    }
}

// Function to decrypt text using AES
function decryptText() {
    const text = document.getElementById("decryptText").value;
    const key = document.getElementById("decryptKey").value;

    if (!text || !key) {
        alert("Please enter text and key.");
        return;
    }

    try {
        const bytes = CryptoJS.AES.decrypt(text, key);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        document.getElementById("decryptedText").value = decryptedText;

        // Save to history
        saveToHistory(`Decrypt: ${text} -> ${decryptedText}`);
    } catch (error) {
        alert("Error decrypting text. Please check your key.");
        console.error(error);
    }
}

// Function to clear text fields
function clearText(type) {
    if (type === 'encrypt') {
        document.getElementById("encryptText").value = '';
        document.getElementById("encryptKey").value = '';
        document.getElementById("encryptedText").value = '';
    } else if (type === 'decrypt') {
        document.getElementById("decryptText").value = '';
        document.getElementById("decryptKey").value = '';
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
    history.value += entry + '\n';
}

// Function to generate a random key
function generateKey() {
    const key = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64);
    document.getElementById("encryptKey").value = key;
    document.getElementById("decryptKey").value = key;
}