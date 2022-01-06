// scripts/prepare_upgrade.js
require("dotenv").config();

async function main() {
  const proxyAddress = process.env.PROXY_CONTRACT_ADDRESS;
  const Contract = await ethers.getContractFactory(process.env.CONTRACT_NAME);
  console.log("Preparing upgrade...");
  const contractAddress = await upgrades.prepareUpgrade(proxyAddress, Contract);
  return contractAddress
}
 
main()
  .then((contractAddress) => {
    console.log(`Upgraded logic contract is at: ${contractAddress}`);
    process.exit(0)
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });