import base64 from "../_snowpack/pkg/base64-js.js";
import init, { encrypt, decrypt, derive } from "./cv-lib/index.js";

const libPromise = init();
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export async function deriveKey(key) {
    await libPromise;

    const keyBuffer = textEncoder.encode(key);
    const derivedKeyBuffer = Uint8Array.from(derive(keyBuffer));

    return base64.fromByteArray(derivedKeyBuffer);
}

export async function encryptObject(key, obj) {
    await libPromise;

    const keyBuffer = base64.toByteArray(key);
    const plaintextBuffer = textEncoder.encode(JSON.stringify(obj));

    return Uint8Array.from(encrypt(keyBuffer, plaintextBuffer));
}

export async function decryptBytes(key, buffer) {
    await libPromise;

    const keyBuffer = base64.toByteArray(key);
    const ciphertextBuffer = Uint8Array.from(decrypt(keyBuffer, buffer));

    return JSON.parse(textDecoder.decode(ciphertextBuffer));
}
