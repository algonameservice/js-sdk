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
var algosdk = require('algosdk');
var constants_js_1 = require("../src/constants.js");
var mocha_1 = require("mocha");
var assert = require('chai').assert;
var APP_ID = constants_js_1.CONSTANTS.APP_ID;
var indexerClient, algodClient, resolverObj;
var ansResolver = require('../src/index.js').ansResolver;
var APIKEY = require('./api_key');
mocha_1.describe('Testing name resolution methods', function () {
    mocha_1.beforeEach('Creating Client and Indexer instances', function () {
        algodClient = new algosdk.Algodv2({ 'X-API-KEY': APIKEY }, 'https://mainnet-algorand.api.purestake.io/ps2', '');
        indexerClient = new algosdk.Indexer({ 'X-API-KEY': APIKEY }, 'https://mainnet-algorand.api.purestake.io/idx2', '');
        resolverObj = new ansResolver(algodClient, indexerClient);
    });
    mocha_1.it('Resolves a .algo name', function () {
        return __awaiter(this, void 0, void 0, function () {
            var nameInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, resolverObj.resolveName('lalith.algo')];
                    case 1:
                        nameInfo = _a.sent();
                        console.log(nameInfo);
                        assert.equal(nameInfo.found, true, "Error: Name does not appear to be registered");
                        assert.equal(nameInfo.address, 'PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU', "Error: Name does not appear to point to the right owner");
                        return [2 /*return*/];
                }
            });
        });
    });
    /*
    it('Gets the list of .algo names owned by an address', async function(){

        this.timeout(100000);
        const nameInfo = await resolverObj.getNamesOwnedByAddress('PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU');
        assert.isAtLeast(nameInfo.length, 1, "Error: Doesn't retrieve the names owned by the address");
    
    })
    */
    mocha_1.it('Prepares a list of transactions to register a name', function () {
        return __awaiter(this, void 0, void 0, function () {
            var nameRegistrationTxns;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, resolverObj.prepareNameRegistrationTransactions('ans.algo', 'PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU', 1)];
                    case 1:
                        nameRegistrationTxns = _a.sent();
                        assert.isAtLeast(nameRegistrationTxns.txns.length, 2, "Not returning transactions for name registration");
                        return [2 /*return*/];
                }
            });
        });
    });
    mocha_1.it('Prepares a list of transactions to set properties', function () {
        return __awaiter(this, void 0, void 0, function () {
            var updatePropertyTxns;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, resolverObj.prepareUpdateNamePropertyTransactions('ans.algo', 'PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU', {
                            'discord': 'ansdiscord',
                            'github': 'ansgithub'
                        })];
                    case 1:
                        updatePropertyTxns = _a.sent();
                        assert.notEqual(updatePropertyTxns[0].group, undefined, "Group is not assigned");
                        assert.notEqual(updatePropertyTxns[1].group, undefined, "Group is not assigned");
                        assert.equal(updatePropertyTxns.length, 2, "Not returning 2 transactions for updating properties");
                        return [2 /*return*/];
                }
            });
        });
    });
    mocha_1.it('Prepares a transaction to transfer funds', function () {
        return __awaiter(this, void 0, void 0, function () {
            var nameInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, resolverObj.preparePaymentTxn('RANDGVRRYGVKI3WSDG6OGTZQ7MHDLIN5RYKJBABL46K5RQVHUFV3NY5DUE', 'PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU', 1, 'Test Note')];
                    case 1:
                        nameInfo = _a.sent();
                        assert.equal(nameInfo["type"], "pay", "Not returning the payment transaction");
                        return [2 /*return*/];
                }
            });
        });
    });
    mocha_1.it('Prepares a list of transactions to renew name', function () {
        return __awaiter(this, void 0, void 0, function () {
            var nameRenewalTxns;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, resolverObj.prepareNameRenewalTxns('ans.algo', 'PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU', 2, 10)];
                    case 1:
                        nameRenewalTxns = _a.sent();
                        assert.equal(nameRenewalTxns.length, 2, "Not returning 2 transactions for renewing name");
                        return [2 /*return*/];
                }
            });
        });
    });
    mocha_1.it('Prepares a transaction to initiate name transfer', function () {
        return __awaiter(this, void 0, void 0, function () {
            var nameTransferTxn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, resolverObj.prepareInitiateNameTransferTransaction('lalith.algo', 'PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU', 'RANDGVRRYGVKI3WSDG6OGTZQ7MHDLIN5RYKJBABL46K5RQVHUFV3NY5DUE', 1)];
                    case 1:
                        nameTransferTxn = _a.sent();
                        assert.equal(nameTransferTxn["type"], "appl", "Not returning the name transfer transaction");
                        return [2 /*return*/];
                }
            });
        });
    });
    mocha_1.it('Prepares a transaction to accept name transfer', function () {
        return __awaiter(this, void 0, void 0, function () {
            var acceptNameTranserTxn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, resolverObj.prepareAcceptNameTransferTransactions('lalith.algo', 'RANDGVRRYGVKI3WSDG6OGTZQ7MHDLIN5RYKJBABL46K5RQVHUFV3NY5DUE', 'PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU', 1)];
                    case 1:
                        acceptNameTranserTxn = _a.sent();
                        assert.equal(acceptNameTranserTxn.length, 3, "Not returning 3 transactions for accepting name");
                        return [2 /*return*/];
                }
            });
        });
    });
});
