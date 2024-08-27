function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Open the default tab
document.getElementById("defaultOpen").click();

// Function to perform Vigenere encryption
function vigenereEncrypt(plaintext, key) {
    let encryptedText = '';
    let keyLength = key.length;
    plaintext = plaintext.toUpperCase();
    key = key.toUpperCase();
    for (let i = 0; i < plaintext.length; i++) {
        let char = plaintext[i];
        if (/[A-Z]/.test(char)) {
            let keyChar = key[i % keyLength];
            let shift = keyChar.charCodeAt(0) - 'A'.charCodeAt(0);
            encryptedText += String.fromCharCode((char.charCodeAt(0) + shift - 'A'.charCodeAt(0)) % 26 + 'A'.charCodeAt(0));
        } else {
            encryptedText += char;
        }
    }
    return encryptedText;
}

// Function to perform Vigenere decryption
function vigenereDecrypt(ciphertext, key) {
    let decryptedText = '';
    let keyLength = key.length;
    ciphertext = ciphertext.toUpperCase();
    key = key.toUpperCase();
    for (let i = 0; i < ciphertext.length; i++) {
        let char = ciphertext[i];
        if (/[A-Z]/.test(char)) {
            let keyChar = key[i % keyLength];
            let shift = keyChar.charCodeAt(0) - 'A'.charCodeAt(0);
            decryptedText += String.fromCharCode((char.charCodeAt(0) - shift - 'A'.charCodeAt(0)) % 26 + 'A'.charCodeAt(0));
        } else {
            decryptedText += char;
        }
    }
    return decryptedText;
}

// Function to handle encryption input
function encryptText() {
    const plaintext = document.getElementById("encryptText").value;
    const key = document.getElementById("encryptKey").value;

    if (!plaintext || !key) {
        alert("Please enter both plaintext and key.");
        return;
    }

    const encryptedText = vigenereEncrypt(plaintext, key);
    document.getElementById("encryptedText").value = encryptedText;
    addToHistory(`Encrypt: ${plaintext} with key ${key} => ${encryptedText}`);
}

// Function to handle decryption input
function decryptText() {
    const ciphertext = document.getElementById("decryptText").value;
    const key = document.getElementById("decryptKey").value;

    if (!ciphertext || !key) {
        alert("Please enter both ciphertext and key.");
        return;
    }

    const decryptedText = vigenereDecrypt(ciphertext, key);
    document.getElementById("decryptedText").value = decryptedText;
    addToHistory(`Decrypt: ${ciphertext} with key ${key} => ${decryptedText}`);
}

// Function to clear input fields
function clearText(action) {
    if (action === 'encrypt') {
        document.getElementById("encryptText").value = "";
        document.getElementById("encryptKey").value = "";
        document.getElementById("encryptedText").value = "";
    } else if (action === 'decrypt') {
        document.getElementById("decryptText").value = "";
        document.getElementById("decryptKey").value = "";
        document.getElementById("decryptedText").value = "";
    }
}

// Function to add actions to history
function addToHistory(action) {
    const history = document.getElementById("history");
    history.value += action + "\n";
}

// Function to clear history
function clearHistory() {
    document.getElementById("history").value = "";
}

// Function to save history
function saveHistory() {
    const historyText = document.getElementById("history").value;
    const blob = new Blob([historyText], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "history.txt";
    link.click();
}

// Function to search within history
function searchHistory() {
    const searchTerm = prompt("Enter the term to search:");
    if (searchTerm) {
        const history = document.getElementById("history").value;
        const result = history.split("\n").filter(line => line.includes(searchTerm)).join("\n");
        alert(result ? `Search results:\n${result}` : "No results found.");
    }
}
