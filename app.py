from flask import Flask, request, jsonify, send_from_directory
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
import os

app = Flask(__name__)

@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.json
    text = data['text']

    with open("public.pem", "rb") as file:
        public_key = serialization.load_pem_public_key(file.read())

    encrypted_text = public_key.encrypt(
        text.encode(),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    return jsonify({'encryptedText': encrypted_text.hex()})

@app.route('/decrypt', methods=['POST'])
def decrypt():
    data = request.json
    encrypted_text = bytes.fromhex(data['encryptedText'])

    with open("private.pem", "rb") as file:
        private_key = serialization.load_pem_private_key(file.read(), password=None)

    decrypted_text = private_key.decrypt(
        encrypted_text,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    ).decode()

    return jsonify({'decryptedText': decrypted_text})

@app.route('/history', methods=['GET'])
def get_history():
    if os.path.exists('history.txt'):
        with open('history.txt', 'r') as file:
            history = file.read()
    else:
        history = ''
    return jsonify({'history': history})

@app.route('/history', methods=['POST'])
def clear_history():
    open('history.txt', 'w').close()
    return jsonify({'status': 'History cleared'})

@app.route('/')
def index():
    return send_from_directory('.', 'rsa_cipher.html')

if __name__ == '__main__':
    app.run(debug=True)
