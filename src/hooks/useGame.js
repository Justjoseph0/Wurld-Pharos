import { useCallback, useEffect, useReducer, useRef } from 'react'
import {
  initGrid,
  addRandomTile,
  move,
  hasWon,
  isGameOver,
} from '../utils/gameLogic'

const STORAGE_BEST = '2048_best'

function loadBest() {
  return parseInt(localStorage.getItem(STORAGE_BEST) || '0', 10)
}

function init() {
  return {
    grid: initGrid(),
    score: 0,
    best: loadBest(),
    moves: 0,
    won: false,
    over: false,
    keepPlaying: false,
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'MOVE': {
      if (state.over || (state.won && !state.keepPlaying)) return state
      const { grid, score, moved } = move(state.grid, action.direction)
      if (!moved) return state
      const newGrid = addRandomTile(grid)
      const newScore = state.score + score
      const newBest = Math.max(state.best, newScore)
      if (newBest > state.best) localStorage.setItem(STORAGE_BEST, String(newBest))
      const won = !state.won && hasWon(newGrid)
      const over = isGameOver(newGrid)
      return {
        ...state,
        grid: newGrid,
        score: newScore,
        best: newBest,
        moves: state.moves + 1,
        won: state.won || won,
        over,
      }
    }
    case 'KEEP_PLAYING':
      return { ...state, keepPlaying: true }
    case 'RESTART':
      return { ...init(), best: state.best }
    default:
      return state
  }
}

export function useGame() {
  const [state, dispatch] = useReducer(reducer, null, init)
  const touchStart = useRef(null)

  const handleKey = useCallback(
    (e) => {
      const map = {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowUp: 'up',
        ArrowDown: 'down',
        a: 'left',
        d: 'right',
        w: 'up',
        s: 'down',
      }
      const dir = map[e.key]
      if (!dir) return
      e.preventDefault()
      dispatch({ type: 'MOVE', direction: dir })
    },
    []
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  const handleTouchStart = useCallback((e) => {
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY }
  }, [])

  const handleTouchEnd = useCallback(
    (e) => {
      if (!touchStart.current) return
      const t = e.changedTouches[0]
      const dx = t.clientX - touchStart.current.x
      const dy = t.clientY - touchStart.current.y
      touchStart.current = null
      if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return
      if (Math.abs(dx) > Math.abs(dy)) {
        dispatch({ type: 'MOVE', direction: dx > 0 ? 'right' : 'left' })
      } else {
        dispatch({ type: 'MOVE', direction: dy > 0 ? 'down' : 'up' })
      }
    },
    []
  )

  return {
    ...state,
    restart: () => dispatch({ type: 'RESTART' }),
    keepPlaying: () => dispatch({ type: 'KEEP_PLAYING' }),
    handleTouchStart,
    handleTouchEnd,
  }
}
