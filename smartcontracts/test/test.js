const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('TossMeACoin', function () {
  it('Should send a donation of ETH on the blockchain & store it', async function () {
    const TossMeACoinContract = await ethers.getContractFactory('TossMeACoin');
    const TossMeACoin = await TossMeACoinContract.deploy();
    await TossMeACoin.deployed();

    const [owner, sender, receiver] = await ethers.getSigners();

    let amount = ethers.utils.parseEther('10');

    const sendAnDonation = await TossMeACoin.connect(sender).donateCoin(
      receiver.address,
      'Joe Mama',
      'Hello, do you know Joe?',
      { value: amount }
    );
    await sendAnDonation.wait();

    const donationsSent = await TossMeACoin.connect(sender).getSentDonations();
    const donationsReceived = await TossMeACoin.connect(
      receiver
    ).getReceivedDonations();

    expect(donationsSent[0].name).to.equal(donationsReceived[0].name);
    expect(await TossMeACoin.getDonationsCount()).to.equal(1);
  });
});
