import algosdk from "algosdk";
import { ALLOWED_TLDS, ASCII_CODES } from "./constants.js";
import { InvalidNameError } from "./errors.js";

export function isValidAddress(address: string): boolean {
  return algosdk.isValidAddress(address);
}

export function normalizeName(name: string): string {
  const tld: string = name.split(".").pop() as string;
  if(!ALLOWED_TLDS.includes(tld)) {
    throw new Error("TLD not supported");
  }
  name = name.split(".")[0].toLowerCase();
  const lengthOfName = name.length;
  if (lengthOfName > 64) {
    throw new InvalidNameError();
  }
  for (let i = 0; i < lengthOfName; i++) {
    if (
      !(
        name.charCodeAt(i) >= ASCII_CODES.ASCII_0 &&
        name.charCodeAt(i) <= ASCII_CODES.ASCII_9
      )
    ) {
      if (
        !(
          name.charCodeAt(i) >= ASCII_CODES.ASCII_A &&
          name.charCodeAt(i) <= ASCII_CODES.ASCII_Z
        )
      )
        throw new InvalidNameError();
    }
  }
  return name;
}
