import hre from "hardhat";

async function main() {
  const AuthManager = await hre.ethers.getContractFactory("AuthorizationManager");
  const authManager = await AuthManager.deploy();
  await authManager.deployed();
  console.log("AuthorizationManager deployed to:", authManager.address);

  const Vault = await hre.ethers.getContractFactory("SecureVault");
  const vault = await Vault.deploy(authManager.address);
  await vault.deployed();
  console.log("SecureVault deployed to:", vault.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
