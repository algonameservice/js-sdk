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

// src/classes/errors.ts
var errors_exports = {};
__export(errors_exports, {
  AddressValidationError: () => AddressValidationError,
  IncorrectOwnerError: () => IncorrectOwnerError,
  InvalidNameError: () => InvalidNameError,
  NameNotRegisteredError: () => NameNotRegisteredError
});
module.exports = __toCommonJS(errors_exports);
var AddressValidationError = class extends Error {
  name;
  type;
  constructor() {
    super(`This is not a valid Algorand address`);
    this.name = "InvalidAddressError";
    this.type = "InvalidAddressError";
  }
};
var InvalidNameError = class extends Error {
  name;
  type;
  constructor() {
    super(`The name must be between 3 and 64 characters and must only contain a-z and 0-9 characters`);
    this.name = "InvalidNameError";
    this.type = "InvalidNameError";
  }
};
var NameNotRegisteredError = class extends Error {
  name;
  type;
  constructor(name) {
    super(`Name ${name} is not registered`);
    this.name = "NameNotRegisteredError";
    this.type = "NameNotRegisteredError";
  }
};
var IncorrectOwnerError = class extends Error {
  name;
  type;
  constructor(name, address) {
    super(`Name ${name}.algo is not owned by ${address}`);
    this.name = "IncorrectOwnerError";
    this.type = "IncorrectOwnerError";
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddressValidationError,
  IncorrectOwnerError,
  InvalidNameError,
  NameNotRegisteredError
});
