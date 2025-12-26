SecureVault: Multi-Contract Authorization System
Project Overview

SecureVault is a decentralized system that separates fund custody and permission validation across multiple smart contracts.

Vault Contract: Holds funds and executes withdrawals.

AuthorizationManager Contract: Validates withdrawal authorizations originating from off-chain coordination.

The system ensures that:

Withdrawals occur only with valid authorizations.

Authorizations cannot be reused.

Deposits and withdrawals are observable via events.

State updates happen exactly once per authorization.

Repository Structure
/
├─ contracts/
│  ├─ SecureVault.sol
│  └─ AuthorizationManager.sol
├─ scripts/
│  └─ deploy.js
├─ tests/
│  └─ vault.test.js
├─ docker/
│  ├─ Dockerfile
│  └─ entrypoint.sh
├─ docker-compose.yml
├─ package.json
├─ package-lock.json
├─ hardhat.config.ts
├─ tsconfig.json
└─ README.md

Phase 1: Project Initialization

Create a GitHub repository:

git init
git remote add origin https://github.com/Divyasrirowtu/secure-vault.git


Create project structure:

mkdir contracts scripts tests docker
New-Item README.md
New-Item docker-compose.yml


Open project in VS Code:

code .

Phase 2: Hardhat Setup

Initialize Hardhat:

npx hardhat --init


Select TypeScript project with Node Test Runner and Viem (or minimal if preferred).

Accept defaults for other prompts.

Install dependencies:

npm install

Phase 3: Contracts Implementation
AuthorizationManager.sol

Tracks used authorizations.

Verifies each withdrawal is valid and unique.

SecureVault.sol

Holds Ether deposits.

Requests authorization from AuthorizationManager before withdrawals.

Emits events for deposits and withdrawals.

Compile contracts:

npx hardhat compile

Phase 4: Deployment Script
scripts/deploy.js

Deploys AuthorizationManager first.

Deploys SecureVault with the authorization manager’s address.

Logs deployed addresses.

Deploy locally:

npx hardhat run scripts/deploy.js --network localhost

Phase 5: Docker Setup
Dockerfile

Installs dependencies, copies project files, runs entrypoint.sh.

entrypoint.sh

Waits for blockchain container to start.

Runs deployment script automatically.

docker-compose.yml

Starts local blockchain (anvil / alternative Ethereum node).

Builds deployer container.

Run Docker deployment:

docker-compose up --build


⚠️ On Windows, if GHCR fails, run Hardhat node locally instead:

npx hardhat node
npx hardhat run scripts/deploy.js --network localhost

Phase 6: Automated Tests
tests/vault.test.js

Test deposits.

Test withdrawals with valid authorizations.

Ensure authorizations cannot be reused.

Run tests:

npx hardhat test

Phase 7: Manual Validation / README Documentation
Manual Flow

Start local blockchain

npx hardhat node


Deploy contracts

npx hardhat run scripts/deploy.js --network localhost


Deposit funds

const vault = await ethers.getContractAt("SecureVault", "VAULT_ADDRESS");
await owner.sendTransaction({ to: vault.address, value: ethers.utils.parseEther("1") });


Generate unique authorization

const authId = ethers.utils.formatBytes32String("AUTH1");


Withdraw funds

await vault.withdraw("RECIPIENT_ADDRESS", ethers.utils.parseEther("1"), authId);


Observe events

Deposit(sender, amount)

Withdrawal(recipient, amount)

AuthorizationUsed(authId)

Reuse prevention

Reusing the same authId reverts with "Authorization already used".

Notes

All phases are reproducible locally.

No frontend or public blockchain deployment required.

Designed for secure multi-contract authorization flow.