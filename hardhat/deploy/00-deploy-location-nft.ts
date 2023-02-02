import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async ({ getUnnamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const [deployer] = await getUnnamedAccounts();

  log(`Deploying LocationNFT...`);

  await deploy("LocationNFT", {
    from: deployer,
    log: true,
    args: [],
  });
};
export default func;
func.tags = ["location-nft"];
