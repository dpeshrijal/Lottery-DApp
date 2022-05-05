//SPDX-License-Identifier:MIT

import "hardhat/console.sol";
pragma solidity ^0.8.0;

contract Lottery {
    address public owner;
    address payable[] public players;
    uint256 public lotteryId;
    mapping(uint256 => address payable) public lotteryHistory;

    constructor() {
        owner = msg.sender;
        lotteryId = 1;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function enter() public payable {
        require(msg.value >= 0.01 ether);
        //address of player entering the lottery
        players.push(payable(msg.sender));
    }

    function getRandomNumber() public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function pickWinner() public onlyOwner {
        uint256 index = getRandomNumber() % players.length;
        players[index].transfer(address(this).balance);
        console.log("And the winner is", players[index]);

        lotteryHistory[lotteryId] = players[index];
        lotteryId++;

        players = new address payable[](0);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
