function Tile({ value, small }) {
  const colors = {
    2:    'bg-[#e8eeff] text-[#011fc7]',
    4:    'bg-[#c5d4ff] text-[#011fc7]',
    8:    'bg-[#96aeff] text-[#011fc7]',
    16:   'bg-[#6688ff] text-white',
    32:   'bg-[#3d5eff] text-white',
    64:   'bg-[#1f3de8] text-white',
    128:  'bg-[#0a24c7] text-white',
    256:  'bg-[#0018a8] text-white',
    512:  'bg-[#001288] text-white',
    1024: 'bg-[#000d66] text-white',
    2048: 'bg-white text-[#011fc7] ring-4 ring-[#011fc7]',
  }
  const color = colors[value] || 'bg-[#e8eeff] text-[#011fc7]'
  const size = small ? 'w-10 h-10 text-sm' : 'w-14 h-14 text-lg'
  return (
    <div className={`${size} ${color} rounded-lg font-bold flex items-center justify-center font-game shrink-0`}>
      {value}
    </div>
  )
}

function MergeDemo({ a, b, result }) {
  return (
    <div className="flex items-center gap-2">
      <Tile value={a} small />
      <span className="text-[#011fc7] font-bold">+</span>
      <Tile value={b} small />
      <span className="text-[#011fc7] font-bold">=</span>
      <Tile value={result} small />
    </div>
  )
}

const steps = [
  {
    n: '1',
    title: 'Move the tiles',
    desc: 'Use arrow keys on desktop or swipe on mobile to slide all tiles in one direction.',
  },
  {
    n: '2',
    title: 'Merge matching tiles',
    desc: 'When two tiles with the same number collide, they combine into one — doubling the value.',
  },
  {
    n: '3',
    title: 'Build up to 2048',
    desc: 'Keep merging. Numbers double each time. The first tile to reach 2048 wins the game!',
  },
  {
    n: '4',
    title: 'Save your score on-chain',
    desc: 'Connect your wallet and submit your best score to the Pharos blockchain leaderboard.',
  },
]

export default function HomePage({ onPlay }) {
  return (
    <div className="min-h-screen bg-[#f0f4ff] font-game flex flex-col lg:flex-row">

      {/* ── Left panel ── */}
      <div className="lg:w-1/2 bg-[#011fc7] flex flex-col items-center justify-center px-10 py-14 text-white text-center">
        <h1 className="text-[clamp(5rem,12vw,9rem)] font-bold leading-none tracking-tight">Wurld</h1>
        <p className="text-white/50 text-sm mt-3 mb-10">× Pharos Blockchain</p>

        <p className="text-2xl font-bold mb-2">Slide. Merge. Reach 2048.</p>
        <p className="text-white/60 text-sm mb-12 max-w-xs">
          A classic puzzle game with your scores saved forever on the blockchain.
        </p>

        {/* Tile progression */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-sm">
          {[2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048].map((v, i, arr) => (
            <div key={v} className="flex items-center gap-2">
              <Tile value={v} small />
              {i < arr.length - 1 && <span className="text-white/30 text-xs">→</span>}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-8 mb-12 text-sm text-white/70">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div className="bg-white/20 text-white text-xs rounded px-2 py-1">↑</div>
              <div className="flex gap-1">
                <div className="bg-white/20 text-white text-xs rounded px-2 py-1">←</div>
                <div className="bg-white/20 text-white text-xs rounded px-2 py-1">↓</div>
                <div className="bg-white/20 text-white text-xs rounded px-2 py-1">→</div>
              </div>
            </div>
            <span>Arrow keys</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl">👆</span>
            <span>Swipe</span>
          </div>
        </div>

        <button
          onClick={onPlay}
          className="bg-white text-[#011fc7] hover:bg-[#e8eeff] font-bold py-4 px-16 rounded-2xl text-xl transition-colors shadow-lg"
        >
          Play Now
        </button>
      </div>

      {/* ── Right panel ── */}
      <div className="lg:w-1/2 flex flex-col justify-center px-10 py-14">
        <h2 className="text-[#011fc7] font-bold text-2xl mb-8">How to Play</h2>

        <div className="space-y-8">
          {steps.map(({ n, title, desc }) => (
            <div key={n} className="flex gap-4">
              <div className="bg-[#011fc7] text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
                {n}
              </div>
              <div>
                <p className="text-[#011fc7] font-bold text-base">{title}</p>
                <p className="text-[#011fc7]/60 text-sm mt-1">{desc}</p>
                {n === '2' && (
                  <div className="flex flex-wrap gap-4 mt-3">
                    <MergeDemo a={2} b={2} result={4} />
                    <MergeDemo a={16} b={16} result={32} />
                    <MergeDemo a={256} b={256} result={512} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile play button */}
        <button
          onClick={onPlay}
          className="lg:hidden mt-10 w-full bg-[#011fc7] hover:bg-[#1a35d9] text-white font-bold py-4 rounded-2xl text-xl transition-colors"
        >
          Play Now
        </button>
      </div>

    </div>
  )
}
