import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { defineChain } from '@reown/appkit/networks'

const pharosAtlantic = defineChain({
  id: 688689,
  name: 'Pharos Atlantic Testnet',
  nativeCurrency: { name: 'PHRS', symbol: 'PHRS', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://atlantic.dplabs-internal.com'] },
  },
  blockExplorers: {
    default: { name: 'Pharos Scan', url: 'https://atlantic.pharosscan.xyz' },
  },
  testnet: true,
})

const ethersAdapter = new EthersAdapter()

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID

createAppKit({
  adapters: [ethersAdapter],
  networks: [pharosAtlantic],
  defaultNetwork: pharosAtlantic,
  projectId,
  metadata: {
    name: 'Wurld',
    description: '2048 on Pharos Blockchain',
    url: window.location.origin,
    icons: [],
  },
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
})
