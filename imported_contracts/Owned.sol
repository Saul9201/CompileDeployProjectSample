pragma solidity ^0.4.19;

contract owned{
    address owner;
    constructor () public {
        owner = msg.sender;
    }
}

