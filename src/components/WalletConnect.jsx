export default function WalletConnect({
  account,
  onConnect,
  onDisconnect,
  onSaveScore,
  saving,
  txHash,
  score,
}) {
  function short(addr) {
    return addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : ''
  }

  return (
    <div className="mt-4 bg-white/10 backdrop-blur rounded-lg p-4 border border-[#011fc7]/30">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full ${account ? 'bg-green-400' : 'bg-gray-400'}`}
          />
          <span className="text-sm text-[#011fc7] font-medium font-game">
            {account ? short(account) : 'Wallet not connected'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!account ? (
            <button
              onClick={onConnect}
              className="bg-[#011fc7] hover:bg-[#1a35d9] text-white font-bold px-4 py-2 rounded-md text-sm transition-colors font-game"
            >
              Connect MetaMask
            </button>
          ) : (
            <>
              <button
                onClick={() => onSaveScore(score)}
                disabled={saving || score === 0}
                className="bg-[#011fc7] hover:bg-[#1a35d9] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-4 py-2 rounded-md text-sm transition-colors font-game"
              >
                {saving ? 'Saving…' : 'Save Score On-Chain'}
              </button>
              <button
                onClick={onDisconnect}
                className="bg-white hover:bg-[#e8eeff] text-[#011fc7] border border-[#011fc7] font-bold px-3 py-2 rounded-md text-sm transition-colors font-game"
                title="Disconnect wallet"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {txHash && (
        <p className="mt-2 text-xs text-green-600 break-all">
          Saved! Tx: {txHash}
        </p>
      )}
    </div>
  )
}
