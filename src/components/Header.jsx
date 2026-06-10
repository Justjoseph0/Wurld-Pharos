function ScoreBox({ label, value }) {
  return (
    <div className="bg-[#011fc7] text-white rounded-md px-3 py-1 text-center min-w-[70px]">
      <div className="text-xs uppercase tracking-wider opacity-80">{label}</div>
      <div className="font-bold text-lg leading-tight">{value}</div>
    </div>
  )
}

export default function Header({ score, best, moves, onRestart }) {
  return (
    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
      <div>
        <h1 className="text-5xl font-bold text-[#011fc7] font-game leading-none">Wurld</h1>
        <p className="text-xs text-[#011fc7] mt-1 opacity-70">× Pharos Blockchain</p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <ScoreBox label="Score" value={score} />
        <ScoreBox label="Best" value={best} />
        <ScoreBox label="Moves" value={moves} />
        <button
          onClick={onRestart}
          className="bg-[#011fc7] hover:bg-[#1a35d9] text-white font-bold px-4 py-2 rounded-md transition-colors font-game text-sm"
        >
          New Game
        </button>
      </div>
    </div>
  )
}
