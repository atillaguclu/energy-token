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

    event energyProduction(
        address userAddress,
        uint256 energyProduced,
        uint256 timestamp
    );

    struct Production {
        address userAddress;
        uint256 energyProduced;
        uint256 timestamp;
    }

    Production[] productions;

    mapping(address => Production) public users;

    function energyProduced(uint256 amount) public {
        _mint(msg.sender, amount);
        productions.push(Production(msg.sender, amount, block.timestamp));
        emit energyProduction(msg.sender, amount, block.timestamp);
    }

    //function mint(address to, uint amount) public onlyOwner {
    //    _mint(to, amount);
    //}

    function getAll() public view returns (Production[] memory) {
        return productions;
    }

    function get() public view returns (Production memory) {
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
