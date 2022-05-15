# anssdk

A javscript sdk to resolve .algo names and perform name operations on ANS .algo names.

## Documentation

Install Package

**`npm`**

```
npm i @ans/sdk
```

**`yarn`**

```
yarn add @ans/sdk
```

### Import

**`ESM`** import

```
import {AnsResolver} from '@ans/sdk'
```

**`CJS`** require

```
const {AnsResolver} = require('@ans/sdk')
```

### Setup

```
const algodClient = "" // set up your algodV2 client
const algodIndexer = "" // set up your algod indexer

//indexer and client must point to mainnet

let sdk = new AnsResolver(client, indexer)
```

## Resolve .algo name

Resolve .algo name to get the address of the owner.

```
let nameInfo = await sdk.name("ans.algo").getOwner()

if(nameInfo["found"]){
    let address = nameInfo["address"];
}
else {
    //Name is not registered yet
}
```

## Get text record

Resolve .algo name to get the address of the owner.

```
let text = await sdk.name("ans.algo").getText("discord")

if(text) {
    console.log(text) //Discord handle if it is set
}
```

## Get names owned by an address

This method gets all the names owned by an Algorand address in reverse chronological order of registration.

```
let address="" // provide an algorand wallet address here
let getSocials = true; // get socials with .algo name
let getMetadata = true; // get metadata like expiry, avatar with .algo name;
let limit = 1; // number of names to be retrieved

let names = await sdk.address(address).getNames(socials, metadata, limit)

// Returns an array of names owned by the address
// Names appear in a reverse chronological order (names[0] returns recently purchased name)

if(names.length > 0){
    for (let index in names){
        console.log(names[index].name);
    }
}
else {
    //No names registered by this address
}
```

## Register a new name

This method returns the transactions to be signed to register a .algo name.

```
let nameToRegister = ''; // .algo name to register
let address = ''; // owner's algorand wallet address
let period = 0; // duration of registration

try{
    let nameRegistrationTxns = await sdk.name(nameToRegister).register(address, period);

    if(nameRegistrationTxns.txns.length === 2) {

        // Lsig account previous opted in (name expired)
        // Sign both transactions
        // Send all to network

    } else if(nameRegistrationTxns.txns.length === 4) {

        // nameRegistrationsTxns.txns[2] is signed by the sdk
        // Sign nameRegistrationTxns.txns index 0,1,3
        // Submit transactions as a group

        const signedGroupTxns = [];

        const txns = [signedGroupTxns[0], signedGroupTxns[1], nameRegistrationTxns.optinTxn, signedGroupTxns[2]];

        // Send to network

    }

} catch (err) {

}
```

## Update Name (Set name properties)

This method returns transactions to set the social media handles of a domain name

```
try{

    let name = '' // .algo name
    let address = '' // owner's algorand wallet address

    // Social handles to be edited here
    let editedHandles = {
        discord: '',
        github: ''
    }

    const updateNamePropertyTxns = await sdk.name(name).update(address, editedHandles);

    // Returns an array of transactions
    // Sign each and send to network

} catch (err) {

}
```

## Renew Name

Retrieve transactions to renew a name. The ANS registry currently supports renewal only by the owner hence the transactions will fail if the input address is not the current owner of the name.

```
try{

    let name = '' // .algo name to renew
    let owner = '' // owner address
    let period = 0 // period for renewal

    const nameRenewalTxns = await sdk.name(name).renew(owner, period);

    // Returns an array of transactions
    // Sign each and send to network

} catch (err) {

}
```

## Initiate transfer

This method returns a transaction to initiate name transfer. The owner is required to set the price for transfer and the recipient's algorand account address.

```
try{
    let name = '' // .algo name to initiate transfer
    let owner = '' // current owner
    let newOwner = '' // new owner's address
    let price = 0 // price at which the seller is willing to sell this name

    const nameTransferTransaction = await sdk.name(name).initTransfer(owner, newOwner, price);

    // Returns a transaction to be signed by `owner`
    // Sign and send to network

} catch (err) {

}
```

## Accept transfer

Retrieve the transactions to complete the transfer by providing the current owner's address, the transfer recipient's address, and the price set by the owner

```
try{
    let name = '' // .algo name to accept transfer
    let owner = '' // current owner
    let newOwner = '' // new owner's address
    let price = 0 // price set in the previous transaction

    const acceptNameTransferTxns = await sdk.name(name).acceptTransfer(newOwner, owner, price);

    // Returns an array of transactions to be signed by `newOwner`
    // Sign each and send to network

} catch (err) {

}
```
