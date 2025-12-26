#!/bin/sh

# Wait for blockchain to be ready
sleep 5

echo "Deploying contracts..."

# Deploy contracts to local blockchain
npx hardhat run scripts/deploy.js --network localhost
