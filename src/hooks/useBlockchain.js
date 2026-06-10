import { useCallback, useEffect, useState } from 'react'
import { useAppKitProvider, useAppKitAccount } from '@reown/appkit/react'
import { BrowserProvider, Contract } from 'ethers'

const CONTRACT_ADDRESS = '0xE86547533B7e08DDa07941a7826c1194fbAea706'

const ABI = [
  'function saveScore(uint256 score) external',
  'function getTopScores() external view returns (address[] players, uint256[] scores)',
  'function bestScore(address) external view returns (uint256)',
]

export function useBlockchain() {
  const { address, isConnected } = useAppKitAccount()
  const { walletProvider } = useAppKitProvider('eip155')

  const [saving, setSaving] = useState(false)
  const [txHash, setTxHash] = useState(null)
  const [leaderboard, setLeaderboard] = useState([])
  const [loadingBoard, setLoadingBoard] = useState(false)
  const [error, setError] = useState(null)

  const fetchLeaderboard = useCallback(async () => {
    if (!walletProvider) return
    setLoadingBoard(true)
    try {
      const provider = new BrowserProvider(walletProvider)
      const contract = new Contract(CONTRACT_ADDRESS, ABI, provider)
      const [players, scores] = await contract.getTopScores()
      setLeaderboard(
        players.map((p, i) => ({ player: p, score: Number(scores[i]) }))
      )
    } catch {
      // silently fail
    } finally {
      setLoadingBoard(false)
    }
  }, [walletProvider])

  const saveScore = useCallback(
    async (score) => {
      if (!isConnected || !walletProvider || score === 0) return
      setSaving(true)
      setTxHash(null)
      setError(null)
      try {
        const provider = new BrowserProvider(walletProvider)
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
    [isConnected, walletProvider, fetchLeaderboard]
  )

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  return {
    account: isConnected ? address : null,
    saving,
    txHash,
    leaderboard,
    loadingBoard,
    refreshLeaderboard: fetchLeaderboard,
    error,
    saveScore,
  }
}
