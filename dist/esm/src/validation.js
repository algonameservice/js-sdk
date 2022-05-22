import algosdk from "algosdk";
import { ALLOWED_TLDS, ASCII_CODES } from "./constants.js";
import { InvalidNameError } from "./errors.js";
export function isValidAddress(address) {
    return algosdk.isValidAddress(address);
}
export function normalizeName(name) {
    const tld = name.split(".").pop();
    if (ALLOWED_TLDS.includes(tld)) {
        name = name.split(".")[0].toLowerCase();
    }
    else {
        throw new Error("TLD not supported");
    }
    const lengthOfName = name.length;
    if (lengthOfName > 64) {
        throw new InvalidNameError();
    }
    for (let i = 0; i < lengthOfName; i++) {
        if (!(name.charCodeAt(i) >= ASCII_CODES.ASCII_0 &&
            name.charCodeAt(i) <= ASCII_CODES.ASCII_9)) {
            if (!(name.charCodeAt(i) >= ASCII_CODES.ASCII_A &&
                name.charCodeAt(i) <= ASCII_CODES.ASCII_Z))
                throw new InvalidNameError();
        }
    }
    return name;
}
