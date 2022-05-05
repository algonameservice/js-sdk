import algosdk from "algosdk";
import { ASCII_CODES } from "../constants";

export function isValidAddress(address: string): boolean {
  return algosdk.isValidAddress(address);
}

export function isValidName(name: any): boolean {
  name = name.split(".algo")[0];
  const lengthOfName = name.length;
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
        return false;
    }
  }
  return true;
}
