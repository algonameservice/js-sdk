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

resolverObj = resolver.ansResolver(client, indexer)
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

let names = await resolverObj.getNamesOwnedByAddress(address)

if(names.length > 0){
    for (let index in names){
        console.log(names[index]);
    }
}    
else {
    //No names registered by this address
}
```
