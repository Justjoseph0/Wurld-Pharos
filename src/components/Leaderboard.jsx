export default function Leaderboard({ entries, loading, onRefresh }) {
  function short(addr) {
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`
  }

  return (
    <div className="mt-4 bg-white/10 backdrop-blur rounded-lg p-4 border border-[#011fc7]/30">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-[#011fc7] font-game">🏆 Leaderboard</h2>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="text-xs text-[#011fc7]/70 hover:text-[#011fc7] underline disabled:opacity-50"
        >
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>

      {entries.length === 0 && !loading && (
        <p className="text-xs text-[#011fc7] opacity-60 text-center py-2">
          No scores on-chain yet. Be the first!
        </p>
      )}

      <ol className="space-y-1">
        {entries.map((e, i) => (
          <li
            key={e.player}
            className="flex items-center justify-between text-sm font-game"
          >
            <span className="flex items-center gap-2">
              <span
                className={`w-5 text-center font-bold ${
                  i === 0
                    ? 'text-yellow-500'
                    : i === 1
                    ? 'text-gray-400'
                    : i === 2
                    ? 'text-amber-600'
                    : 'text-[#011fc7] opacity-60'
                }`}
              >
                {i + 1}
              </span>
              <span className="text-[#011fc7]">{short(e.player)}</span>
            </span>
            <span className="font-bold text-[#011fc7]">{e.score.toLocaleString()}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
