import '@nomicfoundation/hardhat-toolbox'
import { config as loadEnv } from 'dotenv'
loadEnv()

const PRIVATE_KEY = process.env.PRIVATE_KEY || '0x0000000000000000000000000000000000000000000000000000000000000001'

const config = {
  solidity: {
    version: '0.8.24',
    settings: {
      evmVersion: 'london',
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    pharos: {
      url: 'https://atlantic.dplabs-internal.com',
      accounts: [PRIVATE_KEY],
      chainId: 688689,
    },
  },
}

export default config
