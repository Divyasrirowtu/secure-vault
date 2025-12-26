# Secure Vault System

This project implements a **secure multi-contract vault system** on Ethereum using Hardhat.

## Project Structure

contracts/ # Solidity contracts
scripts/ # Deployment scripts
tests/ # Automated tests
docker/ # Dockerfile & entrypoint for containerized deployment
docker-compose.yml # Launch local blockchain and deployer container
README.md

markdown
Copy code

## Features

- Vault contract holds and transfers funds.
- Authorization manager validates withdrawal permissions.
- Deposits, withdrawals, and authorization consumption are fully tracked with events.
- Ensures each authorization is consumed exactly once.
- Fully testable on a local Hardhat blockchain.

## Local Setup

1. Install Node.js and npm.
2. Run `npm install` to install dependencies.
3. Start local blockchain:

```bash
npx hardhat node
Deploy contracts:

bash
Copy code
npx hardhat run scripts/deploy.js --network localhost
Docker Setup (Optional)
bash
Copy code
docker-compose up --build
This will start a local blockchain and deploy contracts automatically.

yaml
Copy code

---

✅ After creating these two files, your **Step 1 setup is fully complete**:  

- Project folder structure exists  
- GitHub repo linked and pushed  
- Basic Docker support defined  
- README explains project setup  

---