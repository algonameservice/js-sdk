
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
        const nameInfo = await resolverObj.getNamesOwnedByAddress('PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU', 2);
        assert.isAtLeast(nameInfo.length, 1, "Error: Doesn't retrieve the names owned by the address");
    
    })
    
    
    it('Prepares a list of transactions to register a name', async function(){
        this.timeout(100000);
        const nameRegistrationTxns = await resolverObj.prepareNameRegistrationTransactions(
            'ansone.algo',
            'PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU',
            1
            );
        
        assert.isAtLeast(nameRegistrationTxns.txns.length, 2, "Not returning transactions for name registration");
    })

    it('Prepares a list of transactions to set properties', async function(){
        this.timeout(100000);
        const updatePropertyTxns = await resolverObj.prepareUpdateNamePropertyTransactions(
            'ans.algo',
            'PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU',
            {
                'discord': 'ansdiscord',
                'github' : 'ansgithub'
            }
            );
        assert.notEqual(updatePropertyTxns[0].group, undefined, "Group is not assigned");
        assert.notEqual(updatePropertyTxns[1].group, undefined, "Group is not assigned");
        assert.equal(updatePropertyTxns.length, 2, "Not returning 2 transactions for updating properties");
    })

    it('Prepares a transaction to transfer funds', async function(){
        this.timeout(100000);
        const nameInfo = await resolverObj.preparePaymentTxn(
            'RANDGVRRYGVKI3WSDG6OGTZQ7MHDLIN5RYKJBABL46K5RQVHUFV3NY5DUE',
            'PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU',
            1,
            'Test Note'
            );
        
        assert.equal(nameInfo["type"], "pay", "Not returning the payment transaction");
    })

    it('Prepares a list of transactions to renew name', async function(){
        this.timeout(100000);
        const nameRenewalTxns = await resolverObj.prepareNameRenewalTransactions(
                'ans.algo',
                'PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU',
                2
            );

        assert.equal(nameRenewalTxns.length, 2, "Not returning 2 transactions for renewing name");
    })

    it('Prepares a transaction to initiate name transfer', async function(){
        this.timeout(100000);
        const nameTransferTxn = await resolverObj.prepareInitiateNameTransferTransaction(
            'lalith.algo',
            'PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU',
            'RANDGVRRYGVKI3WSDG6OGTZQ7MHDLIN5RYKJBABL46K5RQVHUFV3NY5DUE',
            1
        );
        
        assert.equal(nameTransferTxn["type"], "appl", "Not returning the name transfer transaction");
    })

    it('Prepares a transaction to accept name transfer', async function(){
        
        const acceptNameTranserTxn = await resolverObj.prepareAcceptNameTransferTransactions(
            'lalith.algo',
            'RANDGVRRYGVKI3WSDG6OGTZQ7MHDLIN5RYKJBABL46K5RQVHUFV3NY5DUE',
            'PD2CGHFAZZQNYBRPZH7HNTA275K3FKZPENRSUXWZHBIVNPHVDFHLNIUSXU',
            1
        );
        
        assert.equal(acceptNameTranserTxn.length, 3, "Not returning 3 transactions for accepting name");
    })
    
});
