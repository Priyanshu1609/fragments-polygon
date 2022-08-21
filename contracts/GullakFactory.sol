// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.4;

pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";


contract GullakFactory {
    address owner;
    Gullak[] public vaultAddresses;

    event vaultCreated(string tokenName, string tokenSymbol, uint256 endtime);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function create(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _endtime
    ) public onlyOwner returns (Gullak) {
        Gullak newVault = new Gullak(_tokenName, _tokenSymbol, owner, _endtime);

        vaultAddresses.push(newVault);

        emit vaultCreated(_tokenName, _tokenSymbol, _endtime);

        return (newVault);
    }

    function getAll() public view returns (Gullak[] memory) {
        return vaultAddresses;
    }

    function getBalance() external view returns (uint256) {
        return (address(this).balance) / (10 ^ 18);
    }
}

contract Gullak is ERC20 {
    address owner;
    string public tokenName;
    string public tokenSymbol;
    uint256 public endtime;

    mapping(address => uint256) public map;
    address[] public adds;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    struct user {
        address userAddress;
        uint256 balance;
    }

    constructor(
        string memory _tokenName,
        string memory _tokenSymbol,
        address _owner,
        uint256 _endtime
    ) ERC20(_tokenName, _tokenSymbol) {
        owner = _owner;
        endtime = _endtime;
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
    }

    function add(address _address, uint256 _value) internal {
        map[_address] = _value;
        adds.push(_address);
    }

    function recieve(address[] calldata _user, uint256[] calldata _balances) public onlyOwner {
       for(uint256 i = 0 ; i < _user.length ; i ++){
           add(_user[i], _balances[i]);
       } 
    }

    function mint() public onlyOwner {
        for (uint256 index = 0; index < adds.length; index++) {
            _mint(adds[index], map[adds[index]]);
        }
    }
}