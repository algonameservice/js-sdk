const algosdk: any = require("algosdk");
import { describe, it, beforeEach } from "mocha";
const { assert } = require("chai");

let indexerClient: any, algodClient: any, sdk: any, name;
const { ANS } = require("../src/index.js");
const APIKEY = require("./api_key");

describe("Testing name resolution methods", function () {
  beforeEach("Creating Client and Indexer instances", function () {
    algodClient = new algosdk.Algodv2(
      { "X-API-KEY": APIKEY },
      "https://mainnet-algorand.api.purestake.io/ps2",
      ""
    );

    indexerClient = new algosdk.Indexer(
      { "X-API-KEY": APIKEY },
      "https://mainnet-algorand.api.purestake.io/idx2",
      ""
    );

    sdk = new ANS(algodClient, indexerClient);
  });

  it("Resolves a .algo name", async function () {
    name = sdk.name("lalith.algo");
    const address = await name.getOwner();
    assert.equal(
      address,
      "PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU",
      "Name resolution failed"
    );
  });

  it("Get all information about name", async function () {
    const information = await name.getAllInformation();
    assert.equal(
      information.address,
      "PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU",
      "Could not fetch all information"
    );
  });

  it("Gets a specific text record", async function () {
    const text = await name.getText("discord");
    assert.equal(text, "Lalith Medury#0811", "Could not fetch text record");
  });

  it("Gets expiry of domain", async function () {
    const expiry = await name.getExpiry();
    assert.notEqual(expiry, null, "Could not fetch expiry of domain");
  });

  it("Gets the list of .algo names owned by an address", async function () {
    this.timeout(100000);
    const nameInfo = await sdk
      .address("RANDGVRRYGVKI3WSDG6OGTZQ7MHDLIN5RYKJBABL46K5RQVHUFV3NY5DUE")
      .getNames();
    assert.isAtLeast(
      nameInfo.length,
      1,
      "Error: Doesn't retrieve the names owned by the address"
    );
  });

  it("Prepares a list of transactions to register a name", async function () {
    this.timeout(100000);
    const nameRegistrationTxns = await sdk
      .name("ansone.algo")
      .register(
        "PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU",
        1
      );

    assert.isAtLeast(
      nameRegistrationTxns.txns.length,
      2,
      "Not returning transactions for name registration"
    );
  });

  it("Prepares a list of transactions to set properties", async function () {
    this.timeout(100000);
    const updatePropertyTxns = await name
      .update("PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU", {
        discord: "ansdiscord",
        github: "ansgithub",
      });

    assert.notEqual(
      updatePropertyTxns[0].group,
      undefined,
      "Group is not assigned"
    );
    assert.notEqual(
      updatePropertyTxns[1].group,
      undefined,
      "Group is not assigned"
    );
    assert.equal(
      updatePropertyTxns.length,
      2,
      "Not returning 2 transactions for updating properties"
    );
  });

  it("Prepares a list of transactions to renew name", async function () {
    this.timeout(100000);
    const nameRenewalTxns = await name
      .renew("PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU", 2);

    assert.equal(
      nameRenewalTxns.length,
      2,
      "Not returning 2 transactions for renewing name"
    );
  });

  it("Prepares a transaction to initiate name transfer", async function () {
    this.timeout(100000);
    const nameTransferTxn = await name
      .initTransfer(
        "PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU",
        "RANDGVRRYGVKI3WSDG6OGTZQ7MHDLIN5RYKJBABL46K5RQVHUFV3NY5DUE",
        1
      );

    assert.equal(
      nameTransferTxn["type"],
      "appl",
      "Not returning the name transfer transaction"
    );
  });

  it("Prepares a transaction to accept name transfer", async function () {
    const acceptNameTranserTxn = await name
      .acceptTransfer(
        "RANDGVRRYGVKI3WSDG6OGTZQ7MHDLIN5RYKJBABL46K5RQVHUFV3NY5DUE",
        "PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU",
        1
      );

    assert.equal(
      acceptNameTranserTxn.length,
      3,
      "Not returning 3 transactions for accepting name"
    );
  });
});
