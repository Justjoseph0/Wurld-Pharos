import { useCallback, useEffect, useState } from 'react'
import { BrowserProvider, Contract } from 'ethers'

// Replace with your deployed contract address after running: npm run deploy
const CONTRACT_ADDRESS = '0xE86547533B7e08DDa07941a7826c1194fbAea706'

const PHAROS_CHAIN_ID = 688689
const PHAROS_RPC = 'https://atlantic.dplabs-internal.com'

const ABI = [
  'function saveScore(uint256 score) external',
  'function getTopScores() external view returns (address[] players, uint256[] scores)',
  'function bestScore(address) external view returns (uint256)',
]

async function switchToPharos() {
  const chainHex = '0x' + PHAROS_CHAIN_ID.toString(16)
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: chainHex,
          chainName: 'Pharos Atlantic Testnet',
          rpcUrls: [PHAROS_RPC],
          nativeCurrency: { name: 'PHRS', symbol: 'PHRS', decimals: 18 },
          blockExplorerUrls: ['https://atlantic.pharosscan.xyz'],
        },
      ],
    })
  } catch {
    // Falls through to switch if add is rejected / unsupported
  }
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: chainHex }],
  })
}

export function useBlockchain() {
  const [account, setAccount] = useState(null)
  const [saving, setSaving] = useState(false)
  const [txHash, setTxHash] = useState(null)
  const [leaderboard, setLeaderboard] = useState([])
  const [loadingBoard, setLoadingBoard] = useState(false)
  const [error, setError] = useState(null)

  const connect = useCallback(async () => {
    setError(null)
    try {
      if (!window.ethereum) throw new Error('MetaMask not found. Please install it.')
      await switchToPharos()
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(accounts[0])
    } catch (e) {
      if (e.code === 4001 || e.code === 'ACTION_REJECTED') {
        setError('Connection cancelled.')
      } else {
        setError(e.message)
      }
    }
  }, [])

  const disconnect = useCallback(() => {
    setAccount(null)
    setTxHash(null)
    setError(null)
  }, [])

  const saveScore = useCallback(
    async (score) => {
      if (!account || score === 0) return
      setSaving(true)
      setTxHash(null)
      setError(null)
      try {
        await switchToPharos()
        const provider = new BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new Contract(CONTRACT_ADDRESS, ABI, signer)
        const tx = await contract.saveScore(BigInt(score))
        await tx.wait()
        setTxHash(tx.hash)
        await fetchLeaderboard()
      } catch (e) {
        if (e.code === 'ACTION_REJECTED' || e?.info?.error?.code === 4001) {
          setError('Transaction cancelled.')
        } else {
          setError(e.message || 'Transaction failed')
        }
      } finally {
        setSaving(false)
      }
    },
    [account]
  )

  const fetchLeaderboard = useCallback(async () => {
    if (CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') return
    if (!window.ethereum) return
    setLoadingBoard(true)
    try {
      const provider = new BrowserProvider(window.ethereum)
      const contract = new Contract(CONTRACT_ADDRESS, ABI, provider)
      const [players, scores] = await contract.getTopScores()
      const entries = players.map((p, i) => ({
        player: p,
        score: Number(scores[i]),
      }))
      setLeaderboard(entries)
    } catch {
      // silently fail — contract may not be deployed yet
    } finally {
      setLoadingBoard(false)
    }
  }, [])

  useEffect(() => {
    if (!window.ethereum) return
    window.ethereum
      .request({ method: 'eth_accounts' })
      .then(async (accs) => {
        if (accs.length) {
          await switchToPharos().catch(() => {})
          setAccount(accs[0])
        }
      })
      .catch(() => {})
    window.ethereum.on('accountsChanged', (accs) =>
      setAccount(accs.length ? accs[0] : null)
    )
  }, [])

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  return {
    account,
    connect,
    disconnect,
    saveScore,
    saving,
    txHash,
    leaderboard,
    loadingBoard,
    refreshLeaderboard: fetchLeaderboard,
    error,
  }
}
