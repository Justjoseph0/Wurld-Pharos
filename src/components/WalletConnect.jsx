export default function WalletConnect({ account, onSaveScore, saving, txHash, score }) {
  return (
    <div className="mt-4 bg-white/10 backdrop-blur rounded-lg p-4 border border-[#011fc7]/30">
      <div className="flex items-center justify-between flex-wrap gap-3">

        {/* AppKit handles connect / disconnect / account display */}
        <appkit-button />

        {account && (
          <button
            onClick={() => onSaveScore(score)}
            disabled={saving || score === 0}
            className="bg-[#011fc7] hover:bg-[#1a35d9] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-4 py-2 rounded-md text-sm transition-colors font-game"
          >
            {saving ? 'Saving…' : 'Save Score On-Chain'}
          </button>
        )}
      </div>

      {txHash && (
        <p className="mt-2 text-xs text-green-600 break-all">
          Saved! Tx: {txHash}
        </p>
      )}
    </div>
  )
}
