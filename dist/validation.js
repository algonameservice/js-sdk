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
    exports.ALLOWED_TLDS = ["algo"];
  }
});

// src/errors.js
var require_errors = __commonJS({
  "src/errors.js"(exports) {
    "use strict";
    init_cjs_shims();
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    exports.__esModule = true;
    var AddressValidationError = function(_super) {
      __extends(AddressValidationError2, _super);
      function AddressValidationError2() {
        var _this = _super.call(this, "This is not a valid Algorand address") || this;
        _this.name = "InvalidAddressError";
        _this.type = "InvalidAddressError";
        return _this;
      }
      return AddressValidationError2;
    }(Error);
    exports.AddressValidationError = AddressValidationError;
    var InvalidNameError2 = function(_super) {
      __extends(InvalidNameError3, _super);
      function InvalidNameError3() {
        var _this = _super.call(this, "The name must be between 3 and 64 characters and must only contain a-z and 0-9 characters") || this;
        _this.name = "InvalidNameError";
        _this.type = "InvalidNameError";
        return _this;
      }
      return InvalidNameError3;
    }(Error);
    exports.InvalidNameError = InvalidNameError2;
    var NameNotRegisteredError = function(_super) {
      __extends(NameNotRegisteredError2, _super);
      function NameNotRegisteredError2(name) {
        var _this = _super.call(this, "Name " + name + " is not registered") || this;
        _this.name = "NameNotRegisteredError";
        _this.type = "NameNotRegisteredError";
        return _this;
      }
      return NameNotRegisteredError2;
    }(Error);
    exports.NameNotRegisteredError = NameNotRegisteredError;
    var IncorrectOwnerError = function(_super) {
      __extends(IncorrectOwnerError2, _super);
      function IncorrectOwnerError2(name, address) {
        var _this = _super.call(this, "Name " + name + ".algo is not owned by " + address) || this;
        _this.name = "IncorrectOwnerError";
        _this.type = "IncorrectOwnerError";
        return _this;
      }
      return IncorrectOwnerError2;
    }(Error);
    exports.IncorrectOwnerError = IncorrectOwnerError;
  }
});

// src/validation.ts
var validation_exports = {};
__export(validation_exports, {
  isValidAddress: () => isValidAddress,
  normalizeName: () => normalizeName
});
module.exports = __toCommonJS(validation_exports);
init_cjs_shims();
var import_algosdk = __toESM(require("algosdk"));
var import_constants = __toESM(require_constants());
var import_errors = __toESM(require_errors());
function isValidAddress(address) {
  return import_algosdk.default.isValidAddress(address);
}
function normalizeName(name) {
  const tld = name.split(".").pop();
  if (import_constants.ALLOWED_TLDS.includes(tld)) {
    name = name.split(".")[0].toLowerCase();
  } else {
    throw new Error("TLD not supported");
  }
  const lengthOfName = name.length;
  for (let i = 0; i < lengthOfName; i++) {
    if (!(name.charCodeAt(i) >= import_constants.ASCII_CODES.ASCII_0 && name.charCodeAt(i) <= import_constants.ASCII_CODES.ASCII_9)) {
      if (!(name.charCodeAt(i) >= import_constants.ASCII_CODES.ASCII_A && name.charCodeAt(i) <= import_constants.ASCII_CODES.ASCII_Z))
        throw new import_errors.InvalidNameError();
    }
  }
  return name;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isValidAddress,
  normalizeName
});
//# sourceMappingURL=validation.js.map