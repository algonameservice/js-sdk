"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var resolver_1 = require("./classes/resolver");
var transactions_1 = require("./classes/transactions");
var constants_1 = require("./constants");
var algosdk_1 = require("algosdk");
var errors_1 = require("./classes/errors");
var ansResolver = /** @class */ (function () {
    function ansResolver(client, indexer) {
        var _this = this;
        this.isValidAddress = function (address) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, algosdk_1["default"].isValidAddress(address)];
            });
        }); };
        this.isValidName = function (name) { return __awaiter(_this, void 0, void 0, function () {
            var lengthOfName, i;
            return __generator(this, function (_a) {
                name = name.split('.algo')[0];
                lengthOfName = name.length;
                for (i = 0; i < lengthOfName; i++) {
                    if (!(name.charCodeAt(i) >= constants_1.CONSTANTS.ASCII_0 && name.charCodeAt(i) <= constants_1.CONSTANTS.ASCII_9)) {
                        if (!(name.charCodeAt(i) >= constants_1.CONSTANTS.ASCII_A && name.charCodeAt(i) <= constants_1.CONSTANTS.ASCII_Z))
                            throw new errors_1.InvalidNameError();
                    }
                }
                return [2 /*return*/, true];
            });
        }); };
        this.isValidTransaction = function (name, sender, receiver, method) { return __awaiter(_this, void 0, void 0, function () {
            var nameInfo, nameInfo, nameInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = name.split('.algo')[0];
                        return [4 /*yield*/, this.isValidName(name)];
                    case 1:
                        if (!(_a.sent()))
                            return [2 /*return*/];
                        return [4 /*yield*/, this.isValidAddress(sender)];
                    case 2:
                        if (!(_a.sent()))
                            throw new errors_1.AddressValidationError();
                        if (!(!receiver && !method)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.resolveName(name)];
                    case 3:
                        nameInfo = _a.sent();
                        if (nameInfo["found"]) {
                            if (nameInfo["address"] !== sender)
                                throw new errors_1.IncorrectOwnerError(name, sender);
                        }
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(sender && receiver)) return [3 /*break*/, 8];
                        if (!(method === 'initiate_transfer')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.resolveName(name)];
                    case 5:
                        nameInfo = _a.sent();
                        if (nameInfo["found"]) {
                            if (nameInfo["address"] !== sender)
                                throw new errors_1.IncorrectOwnerError(name, sender);
                        }
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(method === 'accept_transfer')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.resolveName(name)];
                    case 7:
                        nameInfo = _a.sent();
                        if (nameInfo["found"]) {
                            if (nameInfo["address"] !== receiver)
                                throw new errors_1.IncorrectOwnerError(name, sender);
                        }
                        _a.label = 8;
                    case 8: return [2 /*return*/, true];
                }
            });
        }); };
        this.resolveName = function (name) { return __awaiter(_this, void 0, void 0, function () {
            var nameInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isValidName(name)];
                    case 1:
                        if (!(_a.sent()))
                            return [2 /*return*/];
                        return [4 /*yield*/, this.resolverInstance.resolveName(name)];
                    case 2:
                        nameInfo = _a.sent();
                        return [2 /*return*/, nameInfo];
                }
            });
        }); };
        this.getNamesOwnedByAddress = function (account, limit) { return __awaiter(_this, void 0, void 0, function () {
            var accountInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isValidAddress(account)];
                    case 1:
                        if (!(_a.sent()))
                            throw new errors_1.AddressValidationError();
                        return [4 /*yield*/, this.resolverInstance.getNamesOwnedByAddress(account, limit)];
                    case 2:
                        accountInfo = _a.sent();
                        return [2 /*return*/, accountInfo];
                }
            });
        }); };
        this.prepareNameRegistrationTransactions = function (name, address, period) { return __awaiter(_this, void 0, void 0, function () {
            var nameInfo, txns, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isValidName(name)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.isValidAddress(address)];
                    case 2:
                        if (!(_a.sent()))
                            throw new errors_1.AddressValidationError();
                        return [4 /*yield*/, this.resolveName(name)];
                    case 3:
                        nameInfo = _a.sent();
                        if (nameInfo["found"])
                            throw new Error('Name already registered');
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.transactionsInstance.prepareNameRegistrationTransactions(name, address, period)];
                    case 5:
                        txns = _a.sent();
                        return [2 /*return*/, txns];
                    case 6:
                        err_1 = _a.sent();
                        return [2 /*return*/, err_1.message];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.prepareUpdateNamePropertyTransactions = function (name, address, editedHandles) { return __awaiter(_this, void 0, void 0, function () {
            var nameInfo, txns, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isValidTransaction(name, address)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.resolveName(name)];
                    case 2:
                        nameInfo = _a.sent();
                        if (!nameInfo["found"])
                            throw new errors_1.NameNotRegisteredError(name);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.transactionsInstance.prepareUpdateNamePropertyTransactions(name, address, editedHandles)];
                    case 4:
                        txns = _a.sent();
                        return [2 /*return*/, txns];
                    case 5:
                        err_2 = _a.sent();
                        return [2 /*return*/, err_2.message];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.preparePaymentTxn = function (sender, receiver, amt, note) { return __awaiter(_this, void 0, void 0, function () {
            var txns, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.transactionsInstance.preparePaymentTxn(sender, receiver, amt, note)];
                    case 1:
                        txns = _a.sent();
                        return [2 /*return*/, txns];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, err_3.message];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.prepareNameRenewalTransactions = function (name, sender, years) { return __awaiter(_this, void 0, void 0, function () {
            var nameInfo, amt, txns, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isValidTransaction(name, sender)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.resolveName(name)];
                    case 2:
                        nameInfo = _a.sent();
                        if (!nameInfo["found"])
                            throw new errors_1.NameNotRegisteredError(name);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        amt = 0;
                        name = name.split('.algo')[0];
                        if (name.length < 3)
                            return [2 /*return*/];
                        if (name.length === 3)
                            amt = (constants_1.CONSTANTS.CHAR_3_AMOUNT) * years;
                        else if (name.length === 4)
                            amt = (constants_1.CONSTANTS.CHAR_4_AMOUNT) * years;
                        else if (name.length >= 5)
                            amt = (constants_1.CONSTANTS.CHAR_5_AMOUNT) * years;
                        return [4 /*yield*/, this.transactionsInstance.prepareNameRenewalTxns(name, sender, years, amt)];
                    case 4:
                        txns = _a.sent();
                        return [2 /*return*/, txns];
                    case 5:
                        err_4 = _a.sent();
                        return [2 /*return*/, err_4.message];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.prepareInitiateNameTransferTransaction = function (name, sender, newOwner, price) { return __awaiter(_this, void 0, void 0, function () {
            var nameInfo, txns, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isValidTransaction(name, sender, newOwner, 'initiate_transfer')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.resolveName(name)];
                    case 2:
                        nameInfo = _a.sent();
                        if (!nameInfo["found"])
                            throw new errors_1.NameNotRegisteredError(name);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.transactionsInstance.prepareInitiateNameTransferTransaction(name, sender, newOwner, price)];
                    case 4:
                        txns = _a.sent();
                        return [2 /*return*/, txns];
                    case 5:
                        err_5 = _a.sent();
                        return [2 /*return*/, err_5.message];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.prepareAcceptNameTransferTransactions = function (name, sender, receiver, amt) { return __awaiter(_this, void 0, void 0, function () {
            var nameInfo, txns, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isValidTransaction(name, sender, receiver, 'accept_transfer')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.resolveName(name)];
                    case 2:
                        nameInfo = _a.sent();
                        if (!nameInfo["found"])
                            throw new errors_1.NameNotRegisteredError(name);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.transactionsInstance.prepareAcceptNameTransferTransactions(name, sender, receiver, amt)];
                    case 4:
                        txns = _a.sent();
                        return [2 /*return*/, txns];
                    case 5:
                        err_6 = _a.sent();
                        return [2 /*return*/, err_6.message];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.resolverInstance = new resolver_1.resolver(client, indexer);
        this.transactionsInstance = new transactions_1.Transactions(client);
    }
    return ansResolver;
}());
exports.ansResolver = ansResolver;
