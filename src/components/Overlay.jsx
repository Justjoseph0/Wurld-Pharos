export default function Overlay({ won, over, onRestart, onKeepPlaying }) {
  if (!won && !over) return null
  return (
    <div className="absolute inset-0 bg-[#e8eeff]/90 rounded-lg flex flex-col items-center justify-center z-10">
      <p className="text-4xl font-bold font-game text-[#011fc7] mb-4">
        {won ? '🎉 You Win!' : '😢 Game Over'}
      </p>
      <div className="flex gap-3">
        {won && (
          <button
            onClick={onKeepPlaying}
            className="bg-[#011fc7] hover:bg-[#1a35d9] text-white font-bold px-5 py-2 rounded-md font-game"
          >
            Keep Playing
          </button>
        )}
        <button
          onClick={onRestart}
          className="bg-[#011fc7] hover:bg-[#1a35d9] text-white font-bold px-5 py-2 rounded-md font-game"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
