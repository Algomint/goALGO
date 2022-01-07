// Deploys a contract defined by ContractName
require("dotenv").config();

const contractName = process.env.CONTRACT_NAME

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Contract = await ethers.getContractFactory(contractName);
  const contract = await upgrades.deployProxy(Contract, [ 
    process.env.TOKEN_NAME,
    process.env.TOKEN_SYMBOL,
    process.env.GNOSIS_SAFE_CONTRACT_ADMIN,
    process.env.GNOSIS_SAFE_CONTRACT_PAUSER
  ]);
  
  await contract.deployed();
  return contract
}

main()
  .then((contract) => {
    console.log(`${contractName} deployed. Proxy Contract Address is ${contract.address}`);
    process.exit(0)
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });