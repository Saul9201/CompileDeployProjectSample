var js = require('./builds/PriceOracle.json');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

// const provider = new HDWalletProvider(
//     'stadium coil fancy process siege stamp first breeze unable funny ski organ',
//     'https://rinkeby.infura.io/2269c2b3dc544ac7a448154f3a6794c1'
//   );

// const provider = new Web3.providers.HttpProvider("http://10.10.0.121:7545");
const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");

const web3 = new Web3(provider);
let abi =js.abi;

let bytecode = '0x'+js.bytecode;
let gasEstimate = web3.eth.estimateGas({data: bytecode}, (err, gasEst)=>{
    if(!err){
        gasEst+=10000;
        console.log("Gas Estimated: "+ gasEst)
        var res=web3.eth.getAccounts((err, accounts)=>{
            console.log("Account to use: "+accounts[0])
            var Contract = web3.eth.contract(JSON.parse(abi));
            var c=Contract.new({
                from: accounts[0],
                data: bytecode,
                gas: gasEstimate
            }, function(err, contract) {
                if(!err){
                    if(!contract.address){
                        console.log("Contract not deployed, view transactionHash : "+contract.transactionHash)
                    }
                    else{
                        console.log("Contract deployed in address : "+ contract.address)
                    }
                }
            });
            
        });

    }
    else{
        console.log(err);
    }
});
