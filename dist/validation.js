var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/tsup/assets/cjs_shims.js
var init_cjs_shims = __esm({
  "node_modules/tsup/assets/cjs_shims.js"() {
  }
});

// src/constants.js
var require_constants = __commonJS({
  "src/constants.js"(exports) {
    "use strict";
    init_cjs_shims();
    exports.__esModule = true;
    exports.APP_ID = 628095415;
    exports.REGISTRATION_PRICE = {
      CHAR_3_AMOUNT: 15e7,
      CHAR_4_AMOUNT: 5e7,
      CHAR_5_AMOUNT: 5e6
    };
    exports.TRANSFER_FEE = 2e6;
    exports.IPFS_LINK = "https://ipfs.infura.io/ipfs/";
    exports.ASCII_CODES = {
      ASCII_A: 97,
      ASCII_Z: 122,
      ASCII_0: 48,
      ASCII_9: 57
    };
    exports.ALLOWED_SOCIALS = [
      "github",
      "twitter",
      "telegram",
      "youtube",
      "reddit",
      "discord"
    ];
  }
});

// src/validation.ts
var validation_exports = {};
__export(validation_exports, {
  isValidAddress: () => isValidAddress,
  isValidName: () => isValidName
});
module.exports = __toCommonJS(validation_exports);
init_cjs_shims();
var import_algosdk = __toESM(require("algosdk"));
var import_constants = __toESM(require_constants());
function isValidAddress(address) {
  return import_algosdk.default.isValidAddress(address);
}
function isValidName(name) {
  name = name.split(".algo")[0];
  const lengthOfName = name.length;
  for (let i = 0; i < lengthOfName; i++) {
    if (!(name.charCodeAt(i) >= import_constants.ASCII_CODES.ASCII_0 && name.charCodeAt(i) <= import_constants.ASCII_CODES.ASCII_9)) {
      if (!(name.charCodeAt(i) >= import_constants.ASCII_CODES.ASCII_A && name.charCodeAt(i) <= import_constants.ASCII_CODES.ASCII_Z))
        return false;
    }
  }
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isValidAddress,
  isValidName
});
//# sourceMappingURL=validation.js.map