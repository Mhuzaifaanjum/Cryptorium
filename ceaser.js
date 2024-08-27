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

document.getElementById("defaultOpen").click();

function caesarCipher(text, shift) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-z]/i)) {
            let code = text.charCodeAt(i);
            let start = code >= 65 && code <= 90 ? 65 : 97;
            char = String.fromCharCode(((code - start + shift) % 26) + start);
        }
        result += char;
    }
    return result;
}

function encryptText() {
    let text = document.getElementById("encryptText").value;
    let shift = parseInt(document.getElementById("encryptShift").value);
    let encrypted = caesarCipher(text, shift);
    document.getElementById("encryptedText").value = encrypted;
    updateHistory(`Encrypted: ${text} (Shift: ${shift}) -> ${encrypted}`);
}

function decryptText() {
    let text = document.getElementById("decryptText").value;
    let shift = parseInt(document.getElementById("decryptShift").value);
    let decrypted = caesarCipher(text, -shift);
    document.getElementById("decryptedText").value = decrypted;
    updateHistory(`Decrypted: ${text} (Shift: ${shift}) -> ${decrypted}`);
}

function clearText(type) {
    if (type === 'encrypt') {
        document.getElementById("encryptText").value = '';
        document.getElementById("encryptedText").value = '';
    } else {
        document.getElementById("decryptText").value = '';
        document.getElementById("decryptedText").value = '';
    }
}

function clearHistory() {
    document.getElementById("history").value = '';
}

function updateHistory(entry) {
    let history = document.getElementById("history");
    history.value += entry + "\n";
}
