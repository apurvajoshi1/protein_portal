// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract acidPortal {
    uint256 totalAcids;
    uint256 private seed;

    event NewAcid(address indexed from, uint256 timestamp, string message);

    struct Acid {
        address adder;
        string message;
        uint256 timestamp;
    }

    Acid[] acids;

    /*
     * This is an address => uint mapping, meaning I can associate an address with a number!
     * In this case, I'll be storing the address with the last time the user waved at us.
     */
    mapping(address => uint256) public lastAddedAt;

    constructor() payable {
        console.log("Acid have been constructed!");
        /*
         * Set the initial seed
         */
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function acid(string memory _message) public {
        /*
         * We need to make sure the current timestamp is at least 15-minutes bigger than the last timestamp we stored
         */
        require(
            lastAddedAt[msg.sender] + 30 seconds < block.timestamp,
            "Must wait 30 seconds before waving again."
        );

        /*
         * Update the current timestamp we have for the user
         */
        lastAddedAt[msg.sender] = block.timestamp;

        totalAcids += 1;
        console.log("%s has added an amino acid to the chain!", msg.sender);

        acids.push(Acid(msg.sender, "hello!!", block.timestamp));

        /*
         * Generate a new seed for the next user that sends a wave
         */
        seed = (block.difficulty + block.timestamp + seed) % 100;

        if (seed <= 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than they contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }
        emit NewAcid(msg.sender, block.timestamp, _message);
    }

    function getAllAcids() public view returns (Acid[] memory) {
        return acids;
    }

    function getTotalAcids() public view returns (uint256) {
        return totalAcids;
    }
}

