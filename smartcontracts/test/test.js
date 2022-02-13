const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('TossMeACoin', function () {
  it('Should send a donation of ETH on the blockchain & store its content', async function () {
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

    const donationsArray = await TossMeACoin.getReceiverDonations(
      receiver.address
    );
    console.log('Donation object: \n', donationsArray[0]);

    expect(ethers.utils.formatEther(donationsArray[0].amount)).to.equal(
      ethers.utils.formatEther(amount)
    );
    expect(await TossMeACoin.getDonationsCount()).to.equal(1);
  });
});
