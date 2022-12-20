// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();
  // VERIFIER CONTRACT ADDRESS ?? 
  // const VerifierInterface = await hre.ethers.getContractAt("VerifierInterface");
  // const verifierInterface = await VerifierInterface.deploy();
  // await verifierInterface.deployed();
  // console.log(
  //   `Verifier interface deployed at ${verifierInterface.address}`
  // );

  const LocationNFT = await hre.ethers.getContractFactory("LocationNFT");
  const locationNFT = await LocationNFT.deploy();
  await locationNFT.deployed();
  console.log(
    `Location NFT contract deployed at ${locationNFT.address}`
  );

  const Logic = await hre.ethers.getContractFactory("Logic");
  const logic = await Logic.deploy(verifierInterface.address, locationNFT.address);
  await logic.deployed();
  console.log(
    `Logic contract deployed at ${logic.address}`
  );

  // DOUBLE CHECK IF THIS IS CORRECT 
  const airdrop = await logic.addAirDrop(1245, 1158, 200, 16598888451, 16598899999, 6, {from: accounts[0]} )
  console.log("airdrop", airdrop)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});