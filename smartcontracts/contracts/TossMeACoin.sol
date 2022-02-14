//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract TossMeACoin {
  uint256 public totalDonationsCount;

  event CoinDonationEvent(address from, address to, uint amount, uint256 timestamp);

  struct CoinDonation {
    address from;
    address to;
    uint amount;
    string name;
    string message;
    uint256 timestamp;
  }
  mapping(address => CoinDonation[]) public DonationsSent;
  mapping(address => CoinDonation[]) public DonationsReceived;

  function getDonationsCount() public view returns (uint256) {
    return totalDonationsCount;
  }

  function getReceivedDonations() public view returns (CoinDonation[] memory){
    return DonationsReceived[msg.sender];
  }
  function getSentDonations() public view returns (CoinDonation[] memory){
    return DonationsSent[msg.sender];
  }

  function donateCoin(address payable _to, string memory _name, string memory _message) public payable {
    (bool success, ) = _to.call{ value: msg.value }("");

    require(success, "Sorry, failed to send a donation :(");

    totalDonationsCount += 1;
    
    CoinDonation memory donation = CoinDonation(msg.sender, _to, msg.value, _name, _message, block.timestamp);

    DonationsSent[msg.sender].push(donation);
    DonationsReceived[_to].push(donation);

    emit CoinDonationEvent(msg.sender, _to, msg.value, block.timestamp);
  }
}
