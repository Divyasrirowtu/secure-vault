import { expect } from "chai";
import { ethers } from "hardhat";

describe("SecureVault System", function () {
  let authManager, vault;
  let owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const AuthManager = await ethers.getContractFactory("AuthorizationManager");
    authManager = await AuthManager.deploy();
    await authManager.deployed();

    const Vault = await ethers.getContractFactory("SecureVault");
    vault = await Vault.deploy(authManager.address);
    await vault.deployed();
  });

  it("should accept deposits", async function () {
    const tx = await owner.sendTransaction({
      to: vault.address,
      value: ethers.utils.parseEther("1")
    });
    await tx.wait();

    const balance = await ethers.provider.getBalance(vault.address);
    expect(balance).to.equal(ethers.utils.parseEther("1"));
  });

  it("should allow withdrawals with valid authorization", async function () {
    const authId = ethers.utils.formatBytes32String("AUTH1");

    // Deposit 1 ETH first
    await owner.sendTransaction({
      to: vault.address,
      value: ethers.utils.parseEther("1")
    });

    // Withdraw 1 ETH using authorization
    await vault.withdraw(addr1.address, ethers.utils.parseEther("1"), authId);

    const vaultBalance = await ethers.provider.getBalance(vault.address);
    expect(vaultBalance).to.equal(0);
  });

  it("should prevent reuse of authorization", async function () {
    const authId = ethers.utils.formatBytes32String("AUTH2");

    // Deposit 1 ETH
    await owner.sendTransaction({
      to: vault.address,
      value: ethers.utils.parseEther("1")
    });

    // First withdrawal
    await vault.withdraw(addr1.address, ethers.utils.parseEther("1"), authId);

    // Try to withdraw again with the same auth
    await expect(
      vault.withdraw(addr1.address, ethers.utils.parseEther("1"), authId)
    ).to.be.revertedWith("Authorization already used");
  });
});
