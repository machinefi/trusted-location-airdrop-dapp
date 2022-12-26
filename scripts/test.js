const hre = require("hardhat");

async function main() {
    const accounts = await hre.ethers.getSigners();

    // ADD VERIFIER CONTRACT ADDRESS 
    const verifierAddress = "0xB9ae925fF8318915e3266e0EA41a37408033caC6"

    const LocationNFT = await hre.ethers.getContractFactory("LocationNFT");
    const locationNFT = await LocationNFT.attach("0x68dfC21dD01c85216A3511131d7698feC448D5AD");
    console.log(
        `LocationNFT fetched with address ${locationNFT.address}`
    );

    const Logic = await hre.ethers.getContractFactory("Logic");
    const logic = await Logic.attach("0xa8525B503Db88209eA212167BE4D889c93050aC1");
    console.log(
        `Logic contract fetched with address ${logic.address}`
    );

    // checking out the fee
    const fee = await logic.calculateFee(5);
    console.log("the fee is:", fee)

    await logic.addAirDrop(25, 25, 100, 1672084120, 1672088120, 5, { from: accounts[0].addreess, value: 100 })
    const airdropHash = await logic.airDropsHashes(0);
    console.log("airdropHash", airdropHash);
    const airdop = await logic.airDrops(airdropHash)
    console.log("airdop", airdop)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});