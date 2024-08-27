document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("defaultOpen").click();
});

// Function to open a specific tab
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

// Convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

// Convert Base64 to ArrayBuffer
function base64ToArrayBuffer(base64) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

// Function to generate RSA keys
async function generateKeys() {
    const keySize = parseInt(document.getElementById("keySize").value);
    const modulusLength = keySize;

    console.log(`Generating RSA key pair with modulus length: ${modulusLength}`);

    try {
        const keyPair = await window.crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: modulusLength,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: { name: "SHA-256" }
            },
            true,
            ["encrypt", "decrypt"]
        );

        console.log('Keys generated successfully.');

        const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
        const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

        // Display keys in the Generate Key tab
        document.getElementById("publicKey").value = arrayBufferToBase64(publicKey);
        document.getElementById("privateKey").value = arrayBufferToBase64(privateKey);

    } catch (e) {
        console.error('Key generation failed: ', e);
        alert("Key generation failed: " + e.message);
    }
}

// Function to encrypt text
async function encryptText() {
    const text = document.getElementById("encryptText").value;
    const publicKey = document.getElementById("publicKey").value;

    if (!text || !publicKey) {
        alert("Please enter text and public key.");
        return;
    }

    try {
        const publicKeyArrayBuffer = base64ToArrayBuffer(publicKey);
        const key = await window.crypto.subtle.importKey(
            "spki",
            publicKeyArrayBuffer,
            {
                name: "RSA-OAEP",
                hash: { name: "SHA-256" }
            },
            false,
            ["encrypt"]
        );

        const encodedText = new TextEncoder().encode(text);
        const encryptedArrayBuffer = await window.crypto.subtle.encrypt(
            {
                name: "RSA-OAEP"
            },
            key,
            encodedText
        );

        console.log(`Encrypted Text (Base64): ${arrayBufferToBase64(encryptedArrayBuffer)}`);
        document.getElementById("encryptedText").value = arrayBufferToBase64(encryptedArrayBuffer);

        saveToHistory(`Encrypt: ${text} -> ${document.getElementById("encryptedText").value}`);
    } catch (e) {
        console.error("Encryption failed: ", e);
        alert("Encryption failed: " + e.message);
    }
}

// Function to decrypt text
async function decryptText() {
    const encryptedText = document.getElementById("decryptText").value;
    const privateKey = document.getElementById("privateKey").value;

    if (!encryptedText || !privateKey) {
        alert("Please enter encrypted text and private key.");
        return;
    }

    try {
        const privateKeyArrayBuffer = base64ToArrayBuffer(privateKey);
        const key = await window.crypto.subtle.importKey(
            "pkcs8",
            privateKeyArrayBuffer,
            {
                name: "RSA-OAEP",
                hash: { name: "SHA-256" }
            },
            false,
            ["decrypt"]
        );

        const encryptedArrayBuffer = base64ToArrayBuffer(encryptedText);
        const decryptedArrayBuffer = await window.crypto.subtle.decrypt(
            {
                name: "RSA-OAEP"
            },
            key,
            encryptedArrayBuffer
        );

        const decoder = new TextDecoder();
        console.log(`Decrypted Text: ${decoder.decode(decryptedArrayBuffer)}`);
        document.getElementById("decryptedText").value = decoder.decode(decryptedArrayBuffer);

        saveToHistory(`Decrypt: ${encryptedText} -> ${document.getElementById("decryptedText").value}`);
    } catch (e) {
        console.error("Decryption failed: ", e);
        alert("Decryption failed: " + e.message);
    }
}

// Function to clear text fields
function clearText(type) {
    if (type === 'encrypt') {
        document.getElementById("encryptText").value = '';
        document.getElementById("encryptedText").value = '';
    } else if (type === 'decrypt') {
        document.getElementById("decryptText").value = '';
        document.getElementById("decryptedText").value = '';
    }
}

// Function to clear keys
function clearKeys() {
    document.getElementById("publicKey").value = '';
    document.getElementById("privateKey").value = '';
}

// Function to clear history
function clearHistory() {
    document.getElementById("history").value = '';
}

// Function to save actions to history
function saveToHistory(action) {
    const history = document.getElementById("history");
    history.value += action + '\n';
}
