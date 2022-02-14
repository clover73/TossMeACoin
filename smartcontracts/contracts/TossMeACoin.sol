//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract TossMeACoin {
  uint256 public totalDonationsCount;
  address owner;

  event CoinDonationEvent(address from, address to, uint amount, uint256 timestamp);

  struct CoinDonation {
    address from;
    address to;
    uint amount;
    string name;
    string message;
    uint256 timestamp;
  }
  mapping(address => uint) public ReceiversBalance;
  mapping(address => CoinDonation[]) public ReceiversDonations;

  constructor () {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the contract's owner can call this function");
    _;
  }

  function getDonationsCount() public view returns (uint256) {
    return totalDonationsCount;
  }

  function getReceiverBalance(address _receiver) public view onlyOwner returns (uint) {
    return ReceiversBalance[_receiver];
  }

  function getReceiverDonations(address _receiver) public view onlyOwner returns (CoinDonation[] memory){
    return ReceiversDonations[_receiver];
  }

  function getReceiverDonationsCount(address _receiver) public view onlyOwner returns (uint){
    return ReceiversDonations[_receiver].length;
  }

  function donateCoin(address payable _to, string memory _name, string memory _message) public payable {
    (bool success, ) = _to.call{ value: msg.value }("");

    require(success, "Sorry, failed to send a donation :(");

    totalDonationsCount += 1;
    ReceiversDonations[_to].push(CoinDonation(msg.sender, _to, msg.value, _name, _message, block.timestamp));

    emit CoinDonationEvent(msg.sender, _to, msg.value, block.timestamp);
  }
}
