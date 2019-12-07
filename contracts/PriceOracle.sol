pragma solidity ^0.4.22;

import "imported_contracts/usingOraclize.sol";

contract PriceOracle is usingOraclize {
    
    uint public ETHPriceUSD;

    address public owner;

    event LogInfo(string description);
    event LogPriceUpdate(string price);
    
    constructor() payable public {
        owner=msg.sender;
        update();
    }

    function updateOwner(address newOwner) external{
        require(owner==msg.sender);
        require(newOwner!= address(0));
        owner = newOwner;

    }

    function __callback(bytes32, string result, bytes) public {
        require(msg.sender == oraclize_cbAddress());
        ETHPriceUSD = parseInt(result,2);
        emit LogPriceUpdate(result);
    }

    function update() payable public {
        if (oraclize_getPrice("URL") > address(this).balance) {
            emit LogInfo("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            emit LogInfo("Oraclize query was sent, standing by for the answer..");
        }

        oraclize_query("URL", "json(https://api.coinbase.com/v2/prices/ETH-USD/spot).data.amount");
    }
}