import crypto from 'crypto';
import * as CryptoJS from 'crypto-js';
import forge from 'node-forge';

export function generateKey() {
    return crypto.randomBytes(16).toString('hex');
}

export function cifrar_AES(texto: string, claveSimetrica: string) {

    if(!claveSimetrica){
        throw new Error("No se ha proporcionado una clave simétrica");
    }

    const keyBytes = CryptoJS.enc.Utf8.parse(claveSimetrica);
    const plaintextBytes = CryptoJS.enc.Utf8.parse(texto);

    const options = {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    };

    const ciphertext = CryptoJS.AES.encrypt(plaintextBytes, keyBytes, options);
    const ciphertextString = ciphertext.toString();
    return ciphertextString;

}

export function cifrar_RSA(claveSimetrica: string): string {
    const key = process.env.PAGO_PLUX_PUBLIC_KEY;

    if(!key){
        throw new Error("No se ha proporcionado una clave pública");
    }

    // Convertir la clave pública de texto a objeto
    const publicKey = forge.pki.publicKeyFromPem(key);

    // Convertir el mensaje a un buffer
    const buffer = Buffer.from(claveSimetrica, 'utf-8');

    // Cifrar el mensaje utilizando la clave pública
    const encrypted = publicKey.encrypt(buffer.toString());

    // Convertir el mensaje cifrado a Base64
    return forge.util.encode64(encrypted);
}