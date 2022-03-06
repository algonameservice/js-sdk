
const algosdk: any = require('algosdk');
import {CONSTANTS} from '../src/constants.js';
import {describe, it, before, beforeEach} from 'mocha';
const {assert} = require('chai')

const APP_ID = CONSTANTS.APP_ID
let indexerClient:any, algodClient:any, resolverObj:any;
const {ansResolver} = require('../src/index.js')
const APIKEY = require('./api_key');

describe('Testing name resolution methods', function() {

    beforeEach('Creating Client and Indexer instances', function(){

        algodClient = new algosdk.Algodv2({'X-API-KEY': APIKEY},
        'https://mainnet-algorand.api.purestake.io/ps2', 
        '');

        indexerClient = new algosdk.Indexer({'X-API-KEY': APIKEY},
        'https://mainnet-algorand.api.purestake.io/idx2', 
        '');

        resolverObj = new ansResolver(algodClient, indexerClient);
    });
    
    it('Resolves a .algo name', async function(){

        const nameInfo = await resolverObj.resolveName('lalith.algo');
        assert.equal(nameInfo.found, true, "Error: Name does not appear to be registered");
        assert.equal(nameInfo.address, 'PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU', "Error: Name does not appear to point to the right owner");
    })

    it('Gets the list of .algo names owned by an address', async function(){

        this.timeout(100000);
        const nameInfo = await resolverObj.getNamesOwnedByAddress('PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU');
        assert.isAtLeast(nameInfo.length, 1, "Error: Doesn't appear to retrieve the names owned by the address");
        
        
    })
    
});
