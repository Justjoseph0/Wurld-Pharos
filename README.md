# Wurld × Pharos

A 2048 puzzle game with on-chain score tracking powered by the Pharos Atlantic Testnet.

## Features

- Classic 2048 gameplay (keyboard arrows or swipe)
- Connect MetaMask to save your score on-chain
- Top 20 leaderboard stored in a smart contract

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Blockchain:** Solidity smart contract on Pharos Atlantic Testnet (chain 688689)
- **Wallet:** MetaMask via ethers.js

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18+
- [MetaMask](https://metamask.io) browser extension
- Pharos Atlantic Testnet PHRS tokens (for saving scores)

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Play

- Use **arrow keys** or **swipe** to move tiles
- Combine matching numbers to reach **2048**
- Connect your MetaMask wallet to save your score on-chain
- View the top 20 scores on the leaderboard

## Smart Contract

**Network:** Pharos Atlantic Testnet  
**Chain ID:** 688689  
**Contract:** `0xE86547533B7e08DDa07941a7826c1194fbAea706`  
**Explorer:** [atlantic.pharosscan.xyz](https://atlantic.pharosscan.xyz)

### Deploy your own

1. Copy `.env.example` to `.env` and add your private key:
   ```
   PRIVATE_KEY=0xYOUR_PRIVATE_KEY
   ```

2. Deploy:
   ```bash
   npx hardhat run scripts/deploy.js --network pharos
   ```

3. Update `CONTRACT_ADDRESS` in `src/hooks/useBlockchain.js` with the deployed address.

## Getting Testnet Tokens

Claim free PHRS at [zan.top/faucet/pharos](https://zan.top/faucet/pharos) — select Atlantic Testnet.
