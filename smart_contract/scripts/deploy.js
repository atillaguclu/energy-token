const hre = require("hardhat");

const main = async () => {
  const EnergyToken = await hre.ethers.getContractFactory("EnergyToken");
  const energytoken = await EnergyToken.deploy();

  await energytoken.deployed();

  console.log("EnergyToken deployed to:", energytoken.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

}

runMain();

