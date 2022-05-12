// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "OpenZeppelin/openzeppelin-contracts@4.4.0/contracts/token/ERC20/ERC20.sol";
import "OpenZeppelin/openzeppelin-contracts@4.4.0/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "OpenZeppelin/openzeppelin-contracts@4.4.0/contracts/security/Pausable.sol";
import "OpenZeppelin/openzeppelin-contracts@4.4.0/contracts/access/Ownable.sol";

contract VoltchainToken is ERC20, ERC20Burnable, Pausable, Ownable {
    constructor() ERC20("Voltchain Token", "VCT") {
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    struct User {
        address userAddress;
        uint256 energyProduced;
        uint256 timestamp;
    }

    mapping(address => User) public users;

    function mint(uint256 amount) public {
        _mint(msg.sender, amount);
        users[msg.sender].energyProduced = amount;
        users[msg.sender].timestamp = block.timestamp;
    }

    //function mint(address to, uint amount) public onlyOwner {
    //    _mint(to, amount);
    //}

    function get() public view returns (User memory) {
        return users[msg.sender];
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}

contract DoubleAuction is VoltchainToken {
    mapping(address => uint256) public sellingBids;
    mapping(address => uint256) public buyingBids;
}
