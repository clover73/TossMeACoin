const { ethers } = require('hardhat');

async function main() {
  const TossMeACoinContract = await ethers.getContractFactory('TossMeACoin');

  const deployedTossMeACoinContract = await TossMeACoinContract.deploy(10);
  await deployedTossMeACoinContract.deployed();

  console.log(
    'TossMeACoint Contract Address:',
    deployedTossMeACoinContract.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
