"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var AddressValidationError = /** @class */ (function (_super) {
    __extends(AddressValidationError, _super);
    function AddressValidationError() {
        var _this = _super.call(this, "This is not a valid Algorand address") || this;
        _this.name = "InvalidAddressError";
        _this.type = "InvalidAddressError";
        return _this;
    }
    return AddressValidationError;
}(Error));
exports.AddressValidationError = AddressValidationError;
var InvalidNameError = /** @class */ (function (_super) {
    __extends(InvalidNameError, _super);
    function InvalidNameError() {
        var _this = _super.call(this, "The name must be between 3 and 64 characters and must only contain a-z and 0-9 characters") || this;
        _this.name = "InvalidNameError";
        _this.type = "InvalidNameError";
        return _this;
    }
    return InvalidNameError;
}(Error));
exports.InvalidNameError = InvalidNameError;
var NameNotRegisteredError = /** @class */ (function (_super) {
    __extends(NameNotRegisteredError, _super);
    function NameNotRegisteredError(name) {
        var _this = _super.call(this, "Name " + name + " is not registered") || this;
        _this.name = "NameNotRegisteredError";
        _this.type = "NameNotRegisteredError";
        return _this;
    }
    return NameNotRegisteredError;
}(Error));
exports.NameNotRegisteredError = NameNotRegisteredError;
var IncorrectOwnerError = /** @class */ (function (_super) {
    __extends(IncorrectOwnerError, _super);
    function IncorrectOwnerError(name, address) {
        var _this = _super.call(this, "Name " + name + ".algo is not owned by " + address) || this;
        _this.name = "IncorrectOwnerError";
        _this.type = "IncorrectOwnerError";
        return _this;
    }
    return IncorrectOwnerError;
}(Error));
exports.IncorrectOwnerError = IncorrectOwnerError;
