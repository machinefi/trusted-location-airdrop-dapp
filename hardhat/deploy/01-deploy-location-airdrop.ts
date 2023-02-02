import { ethers } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import constants from "../constants";

const func: DeployFunction = async ({ getUnnamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const [deployer] = await getUnnamedAccounts();

  const locationNFT = await deployments.get("LocationNFT");

  log(`Deploying LocationAirdrop...`);

  await deploy("LocationAirdrop", {
    from: deployer,
    log: true,
    args: [
      constants.VERIFIER_TESTNET_ADDRESS,
      locationNFT.address,
      ethers.utils.parseEther("0.001"),
      deployer,
      ethers.utils.parseEther("0.001"),
    ],
  });
};
export default func;
func.tags = ["LocationAirdrop"];
