# anssdk
A javscript sdk for resolving Algorand Name Service (ANS) .algo names. Currently under development.


## Install package

```
npm i anssdk
(OR)
yarn add anssdk
```

### Import package
```
import {ansResolver} from 'anssdk'
(OR)
const {ansResolver} = require('anssdk')

const algodClient = "" // set up your algodV2 client
const algodIndexer = "" // set up your algod indexer

//indexer and client must point to mainnet

let resolverObj = ansResolver(client, indexer)
```

### Resolve .algo name

```
let name = "ans.algo"

let nameInfo = await resolverObj.resolveName(name)

if(nameInfo["found"]){
    let address = nameInfo["address"];
}
else {
    //Name is not registered yet
}
```

### Get names owned by an address

```
let address="" // provide an algorand wallet address here

let names = await resolverObj.getNamesOwnedByAddress(address);

// Returns an array of names owned by the address
// Names appear in a reverse chronological order (most recently purchased appear first)

if(names.length > 0){
    for (let index in names){
        console.log(names[index]);
    }
}    
else {
    //No names registered by this address
}
```

## Domain Operations

### 1. Prepare name registration transactions

#### Setup client and indexer

```
import {ansResolver} from 'anssdk'
(OR)
const {ansResolver} = require('anssdk')

const algodClient = "" // set up your algodV2 client
const algodIndexer = "" // set up your algod indexer

//indexer and client must point to mainnet

let sdk = resolver.ansResolver(client, indexer)
```

#### Prepare transactions

```
let nameToRegister = ''; // .algo name to register
let address = ''; // owner's algorand wallet address
let period = 0; // duration of registration

try{
    let nameRegistrationTxns = await sdk.prepareNameRegistrationTransactions(nameToRegister, address, period);

    if(nameRegistrationTxns.length === 2) {

        // Lsig account previous opted in (name expired)
        // Sign both transactions
        // Send all to network

    } else if(nameRegistrationTxns.length === 4) {

        // nameRegistrationsTxns[2] is signed by the sdk
        // Sign nameRegistrationTxns index 0,1,3
        // Submit transactions as a group

        const signedGroupTxns = [];

        const txns = [signedGroupTxns[0], signedGroupTxns[1], nameRegistrationTxns.optinTxn, signedGroupTxns[2]];

        // Send to network

    }

} catch (err) {

}
```

### 2. Prepare update name property transactions

```
try{

    let name = '' // .algo name
    let address = '' // owner's algorand wallet address

    // Social handles to be edited here
    let editedHandles = {
        discord: '',
        github: ''
    }

    const updateNamePropertyTxns = await sdk.prepareUpdateNamePropertyTransactions(name, address, editedHandles);

    // Returns an array of transactions
    // Sign each and send to network

} catch (err) {

}
```

### 3. Prepare name renewal transactions

```
try{

    let name = '' // .algo name to renew
    let owner = '' // owner address
    let period = 0 // period for renewal

    const nameRenewalTxns = await sdk.prepareNameRenewalTransactions(name, owner, years);

    // Returns an array of transactions 
    // Sign each and send to network

} catch (err) {

}
```

### 4. Prepare initiate name transfer transaction

```
try{
    let name = '' // .algo name to initiate transfer
    let owner = '' // current owner
    let newOwner = '' // new owner's address
    let price = 0 // price at which the seller is willing to sell this name

    const nameTransferTransaction = await sdk.prepareInitiateNameTransferTransaction(name, owner, newOwner, price);

    // Returns a transaction to be signed by `owner` 
    // Sign and send to network

} catch (err) {

}
```

### 5. Accept name transfer transaction

```
try{
    let name = '' // .algo name to initiate transfer
    let owner = '' // current owner
    let newOwner = '' // new owner's address
    let price = 0 // price set in the previous transaction

    const acceptNameTransferTxns = await sdk.prepareAcceptNameTransferTransactions(name, newOwner, owner, price);

    // Returns an array of transactions to be signed by `newOwner`
    // Sign each and send to network

} catch (err) {

}
```