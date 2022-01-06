# eALGO
A bridge to wrap/unwrap ALGOs from the Algorand blockchain to eALGOs on the Ethereum blockchain.

### Deploying

#### Clone this repo
`git clone https://github.com/algomint/eALGO.git`

#### Install dependencies
Install the relevant dependencies 
```sh
$ yarn 
```

#### Setup environment variables
Configure the following environment variables in your `.env` file
```
ROPSTEN_URL=
ROPSTEN_PRIVATE_KEY=
ETHERSCAN_KEY=
CONTRACT_NAME=
TOKEN_NAME=
TOKEN_SYMBOL=
GNOSIS_SAFE_PROXY_ADMIN=
### If upgrading contract versions
PROXY_CONTRACT_ADDRESS=
```

#### Compile
Compile the contract
```sh
$ rm -Rf artifacts/
$ npx hardhat compile
Compiling 1 file with 0.8.9
Compilation finished successfully
```

#### Deploying the first Implementation Contract
##### Deploy to the ropsten testnet

```sh
npx hardhat run scripts/deploy.js --network ropsten
Deploying contracts with the account: 0x71545Bd49815f3280b7962564F58229eb8Aa882C
Account balance: 6302010552353931497
ERC20PresetMinterPauserUpgradeSafe deployed. Proxy Contract Address is 0x7fBD91A756a4Be97f0b7C7BD4F8bE1A36406D1c3
```

##### Verify contract source code

In order to verify the contract source code, we would need to know the address of the `Implementation Contract`, and not the address of the `Proxy Contract` that was provided in Step 1 above.

The `Implementation Contract` address can be obtained from the artifacts within the [.openzeppelin](.openzeppelin) folder, and also from Etherscan directly. Follow the Verify instructions [here](https://www.chainshot.com/article/how-to-make-contracts-upgradeable) to obtain the address of the implementation via Etherscan.

```sh
npx hardhat verify YOUR_IMPLEMENTATION_CONTRACT_ADDRESS --network ropsten
```

##### Transfer ownership to `ProxyAdmin`
Once deployed, the deployer **must** transfer the ownership of the contract to a MultiSig wallet (the `ProxyAdmin` address)

```sh
npx hardhat run scripts/transfer_ownership.js --network ropsten
```

#### Upgrade contract
##### Compile contract and run tests
```sh
$ npx hardhat compile
Compiling 1 file with 0.8.9
Compilation finished successfully
```

##### Prepare the Upgrade

```sh
npx hardhat run scripts/prepare_upgrade.js --network ropsten

Compiling 1 file with 0.8.9
Compilation finished successfully
Preparing upgrade...
Upgraded logic contract is at: 0xe6bd69dcd77824DE9630d1B9c66540AF6C97bbc7
```

##### Verify the source code at the new implementation

```sh
$ npx hardhat verify 0xe6bd69dcd77824DE9630d1B9c66540AF6C97bbc7 --network ropsten

Successfully submitted source code for contract
contracts/ERC20_V4.sol:ERC20PresetMinterPauserUpgradeSafe at 0xe6bd69dcd77824DE9630d1B9c66540AF6C97bbc7
for verification on Etherscan. Waiting for verification result...

Successfully verified contract ERC20PresetMinterPauserUpgradeSafe on Etherscan.
https://ropsten.etherscan.io/address/0xe6bd69dcd77824DE9630d1B9c66540AF6C97bbc7#code
```

##### Submit the new logic contract address to the `ProxyAdmin` for upgrade via Openzeppelin Defender.
