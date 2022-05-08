var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/constants.ts
var constants_exports = {};
__export(constants_exports, {
  ALLOWED_SOCIALS: () => ALLOWED_SOCIALS,
  ALLOWED_TLDS: () => ALLOWED_TLDS,
  APP_ID: () => APP_ID,
  ASCII_CODES: () => ASCII_CODES,
  IPFS_LINK: () => IPFS_LINK,
  REGISTRATION_PRICE: () => REGISTRATION_PRICE,
  TRANSFER_FEE: () => TRANSFER_FEE
});
module.exports = __toCommonJS(constants_exports);
var APP_ID = 628095415;
var REGISTRATION_PRICE = {
  CHAR_3_AMOUNT: 15e7,
  CHAR_4_AMOUNT: 5e7,
  CHAR_5_AMOUNT: 5e6
};
var TRANSFER_FEE = 2e6;
var IPFS_LINK = "https://ipfs.infura.io/ipfs/";
var ASCII_CODES = {
  ASCII_A: 97,
  ASCII_Z: 122,
  ASCII_0: 48,
  ASCII_9: 57
};
var ALLOWED_SOCIALS = [
  "github",
  "twitter",
  "telegram",
  "youtube",
  "reddit",
  "discord"
];
var ALLOWED_TLDS = ["algo"];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ALLOWED_SOCIALS,
  ALLOWED_TLDS,
  APP_ID,
  ASCII_CODES,
  IPFS_LINK,
  REGISTRATION_PRICE,
  TRANSFER_FEE
});
//# sourceMappingURL=constants.js.map