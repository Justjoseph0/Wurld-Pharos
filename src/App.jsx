import { useState } from 'react'
import { useGame } from './hooks/useGame'
import { useBlockchain } from './hooks/useBlockchain'
import Board from './components/Board'
import Header from './components/Header'
import Overlay from './components/Overlay'
import WalletConnect from './components/WalletConnect'
import Leaderboard from './components/Leaderboard'
import HomePage from './components/HomePage'

export default function App() {
  const [started, setStarted] = useState(false)

  const {
    grid,
    score,
    best,
    moves,
    won,
    over,
    keepPlaying: keepPlayingState,
    restart,
    keepPlaying,
    handleTouchStart,
    handleTouchEnd,
  } = useGame()

  const {
    account,
    saveScore,
    saving,
    txHash,
    leaderboard,
    loadingBoard,
    refreshLeaderboard,
    error,
  } = useBlockchain()

  if (!started) {
    return <HomePage onPlay={() => setStarted(true)} />
  }

  const showOverlay = over || (won && !keepPlayingState)

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex flex-col items-center justify-start px-4 py-8 font-game">
      <div className="w-full max-w-md">
        <Header score={score} best={best} moves={moves} onRestart={restart} />

        <p className="text-xs text-[#011fc7] mb-3 opacity-60">
          Use arrow keys or swipe to play. Reach the 2048 tile!
        </p>

        <div className="relative">
          <Board
            grid={grid}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
          {showOverlay && (
            <Overlay
              won={won}
              over={over}
              onRestart={restart}
              onKeepPlaying={keepPlaying}
            />
          )}
        </div>

        {error && (
          <p className="mt-2 text-xs text-red-500 text-center">{error}</p>
        )}

        <WalletConnect
          account={account}
          onSaveScore={saveScore}
          saving={saving}
          txHash={txHash}
          score={score}
        />

        <Leaderboard
          entries={leaderboard}
          loading={loadingBoard}
          onRefresh={refreshLeaderboard}
        />
      </div>
    </div>
  )
}
