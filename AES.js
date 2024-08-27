document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("defaultOpen").click();
});

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

function encryptText() {
    // Placeholder for encryption logic
    const text = document.getElementById("encryptText").value;
    const key = document.getElementById("encryptionKey").value;

    // Simulate encryption
    const encryptedText = btoa(text); // Base64 encode as a placeholder
    document.getElementById("encryptedText").value = encryptedText;

    // Update history
    updateHistory(`Encrypted: ${text} -> ${encryptedText}`);
}

function decryptText() {
    // Placeholder for decryption logic
    const encryptedText = document.getElementById("decryptText").value;
    const key = document.getElementById("decryptionKey").value;

    // Simulate decryption
    const decryptedText = atob(encryptedText); // Base64 decode as a placeholder
    document.getElementById("decryptedText").value = decryptedText;

    // Update history
    updateHistory(`Decrypted: ${encryptedText} -> ${decryptedText}`);
}

function clearText(tab) {
    if (tab === 'encrypt') {
        document.getElementById("encryptText").value = "";
        document.getElementById("encryptedText").value = "";
    } else if (tab === 'decrypt') {
        document.getElementById("decryptText").value = "";
        document.getElementById("decryptedText").value = "";
    }
}

function clearHistory() {
    document.getElementById("history").value = "";
}

function updateHistory(message) {
    const history = document.getElementById("history");
    history.value += message + "\n";
}
