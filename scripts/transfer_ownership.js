// scripts/transfer_ownership.js
require("dotenv").config();

async function main() {
  const gnosisSafeProxyAdmin = process.env.GNOSIS_SAFE_PROXY_ADMIN;
 
  console.log("Transferring ownership of ProxyAdmin...");
  // The owner of the ProxyAdmin can upgrade our contracts
  await upgrades.admin.transferProxyAdminOwnership(gnosisSafeProxyAdmin);
  console.log("Transferred ownership of ProxyAdmin to:", gnosisSafeProxyAdmin);
}
 
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });