import algosdk from "algosdk";
import { describe, it, beforeEach } from "mocha";
import { assert } from "chai";
import { ANS } from "../src/index.js";

const DOMAIN = "testacc02.algo";
const OWNER = "O2W244PFC765AQKOR7QLBCDBK6HETD4ADPOGLUBEQXZ53TL2WNSK4XIHM4";
const VALUE = "PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU";
//const OWNER = "PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU";

let indexerClient: algosdk.Indexer,
  algodClient: algosdk.Algodv2,
  sdk: ANS,
  name: any;

describe("Testing name resolution methods", function () {
  beforeEach("Creating Client and Indexer instances", function () {
    algodClient = new algosdk.Algodv2(
      "",
      "https://testnet-api.algonode.cloud",
      ""
    );

    indexerClient = new algosdk.Indexer(
      "",
      "	https://testnet-idx.algonode.cloud",
      ""
    );

    sdk = new ANS(algodClient, indexerClient, 'testnet', 98956662);
  });

  it("Retrieves the owner of .algo name", async function () {
    this.timeout(10000);
    name = sdk.name(DOMAIN);
    const address = await name.getOwner();
    assert.equal(address, OWNER, "Name resolution failed");
  });
  
  it("Gets the value of .algo name", async function () {
    this.timeout(10000);
    const address = await name.getValue();
    assert.equal(
      address,
      VALUE,
      "Name resolution failed"
    )
  });
  

  it("Get all information about name", async function () {
    const information = await name.getAllInformation();
    assert.equal(information.address, OWNER, "Could not fetch all information");
  });

  it("Gets a specific text record", async function () {
    const text = await name.getText("name");
    assert.notEqual(text, undefined, "Could not fetch text record");
  });

  it("Gets expiry of domain", async function () {
    const expiry = await name.getExpiry();
    assert.notEqual(expiry, null, "Could not fetch expiry of domain");
  });

  it("Gets the list of .algo names owned by an address", async function () {
    this.timeout(100000);
    const options = {
      socials: false,
      metadata: false,
      limit: 1,
    };
    const nameInfo = await sdk.address(OWNER).getNames(options);

    assert.isAtLeast(
      nameInfo.length,
      1,
      "Error: Doesn't retrieve the names owned by the address"
    );
  });

  it("Gets the default domain of an address", async function () {
    this.timeout(100000);
    const defaultDomain = await
    sdk.address(OWNER).getDefaultDomain();
    assert.notEqual(defaultDomain, undefined, "Default domain not retrieved");
  });

  it("Prepares a list of transactions to register a name", async function () {
    this.timeout(100000);
    const nameRegistrationTxns = await sdk
      .name("ansone.algo")
      .register(OWNER, 1);

    assert.isAtLeast(
      nameRegistrationTxns.txns.length,
      2,
      "Not returning transactions for name registration"
    );
  });

  it("Prepares a list of transactions to set properties", async function () {
    this.timeout(100000);
    const updatePropertyTxns = await name.update(OWNER, {
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
    const nameRenewalTxns = await name.renew(OWNER, 2);

    assert.equal(
      nameRenewalTxns.length,
      2,
      "Not returning 2 transactions for renewing name"
    );
  });

  it("Prepares a transaction to delete property", async function () {
    this.timeout(100000);
    const nameTransferTxn = await name.deleteProperty(
      OWNER,
      "is_default"
    );

    assert.equal(
      nameTransferTxn["type"],
      "appl",
      "Not returning the delete property transaction"
    );
  });

  it("Prepares a transaction to initiate name transfer", async function () {
    this.timeout(100000);
    const nameTransferTxn = await name.initTransfer(
      OWNER,
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
    const acceptNameTranserTxn = await name.acceptTransfer(
      "RANDGVRRYGVKI3WSDG6OGTZQ7MHDLIN5RYKJBABL46K5RQVHUFV3NY5DUE",
      OWNER,
      1
    );

    assert.equal(
      acceptNameTranserTxn.length,
      3,
      "Not returning 3 transactions for accepting name"
    );
  });
});
