// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract TokenTransferContract {
    address public owner;

    mapping(address => bool) private verifiedTokens;
    address[] public verifiedTokensList;

    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        string message;
    }

    event TransactionCompleted (
        address indexed sender,
        address indexed receiver,
        uint256 amount,
        string message
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    } 

    modifier onlyVerifiedToken(address _token) {
        require(verifiedTokens[_token], "Token is not verified");
        _;
    }

    function addVerifiedToken(address _token) public onlyOwner {
        verifiedTokens[_token] = true;
        verifiedTokensList.push(_token);
    }

    function removeVerifiedToken(address _token) public onlyOwner {
        require(verifiedTokens[_token], "Token is not verified");
        verifiedTokens[_token] = false;
        for (uint256 i = 0; i < verifiedTokensList.length - 1; i++) {
            if (verifiedTokensList[i] == _token) {
                verifiedTokensList[i] = verifiedTokensList[verifiedTokensList.length - 1];
                verifiedTokensList.pop();
                break;
            }
        }
    }
    
    // Rest of the contract functions...
    function getVerifiedTokens() public view returns (address[] memory) {
        return verifiedTokensList;
    }

    function transfer(IERC20 token, address to, uint256 amount, string memory message)
    public
    onlyVerifiedToken(address(token))
    returns (bool)
   
