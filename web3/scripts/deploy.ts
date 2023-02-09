import { ethers } from "hardhat";
import constants from "../constants";

async function main() {
  const accounts = await ethers.getSigners();

  const LocationNFT = await ethers.getContractFactory("LocationNFT");
  const locationNFT = await LocationNFT.deploy();
  await locationNFT.deployed();
  console.log(`LocationNFT contract deployed at ${locationNFT.address}`);

  const Logic = await ethers.getContractFactory("Logic");
  const logic = await Logic.deploy(
    constants.VERIFIER_TESTNET_ADDRESS,
    locationNFT.address,
    10,
    accounts[0].address,
    10
  );
  await logic.deployed();
  console.log(`Logic contract deployed at ${logic.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
