// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();

  // ADD VERIFIER CONTRACT ADDRESS 
  const verifierAddress = "0xB9ae925fF8318915e3266e0EA41a37408033caC6"

  const LocationNFT = await hre.ethers.getContractFactory("LocationNFT");
  const locationNFT = await LocationNFT.deploy();
  await locationNFT.deployed();
  console.log(
    `LocationNFT contract deployed at ${locationNFT.address}`
  );

  const Logic = await hre.ethers.getContractFactory("Logic");
  const logic = await Logic.deploy(verifierAddress, locationNFT.address, 10, accounts[0].address, 10);
  await logic.deployed();
  console.log(
    `Logic contract deployed at ${logic.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});