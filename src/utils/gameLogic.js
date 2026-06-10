export const SIZE = 4

export function emptyGrid() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0))
}

export function addRandomTile(grid) {
  const empty = []
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (grid[r][c] === 0) empty.push([r, c])
  if (!empty.length) return grid
  const [r, c] = empty[Math.floor(Math.random() * empty.length)]
  const next = grid.map((row) => [...row])
  next[r][c] = Math.random() < 0.9 ? 2 : 4
  return next
}

export function initGrid() {
  return addRandomTile(addRandomTile(emptyGrid()))
}

// Slide a single row left; returns { row, score }
function slideRow(row) {
  const nums = row.filter((v) => v !== 0)
  let score = 0
  const merged = []
  let i = 0
  while (i < nums.length) {
    if (i + 1 < nums.length && nums[i] === nums[i + 1]) {
      const val = nums[i] * 2
      merged.push(val)
      score += val
      i += 2
    } else {
      merged.push(nums[i])
      i++
    }
  }
  while (merged.length < SIZE) merged.push(0)
  return { row: merged, score }
}

function transpose(grid) {
  return grid[0].map((_, c) => grid.map((row) => row[c]))
}

function reverseRows(grid) {
  return grid.map((row) => [...row].reverse())
}

// Returns { grid, score, moved }
export function move(grid, direction) {
  let g = grid.map((r) => [...r])
  let totalScore = 0

  if (direction === 'left') {
    const rows = g.map(slideRow)
    g = rows.map((r) => r.row)
    totalScore = rows.reduce((s, r) => s + r.score, 0)
  } else if (direction === 'right') {
    g = reverseRows(g)
    const rows = g.map(slideRow)
    g = reverseRows(rows.map((r) => r.row))
    totalScore = rows.reduce((s, r) => s + r.score, 0)
  } else if (direction === 'up') {
    g = transpose(g)
    const rows = g.map(slideRow)
    g = transpose(rows.map((r) => r.row))
    totalScore = rows.reduce((s, r) => s + r.score, 0)
  } else if (direction === 'down') {
    g = transpose(g)
    g = reverseRows(g)
    const rows = g.map(slideRow)
    g = reverseRows(rows.map((r) => r.row))
    g = transpose(g)
    totalScore = rows.reduce((s, r) => s + r.score, 0)
  }

  const moved = JSON.stringify(g) !== JSON.stringify(grid)
  return { grid: g, score: totalScore, moved }
}

export function hasWon(grid) {
  return grid.some((row) => row.some((v) => v >= 2048))
}

export function isGameOver(grid) {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] === 0) return false
      if (c + 1 < SIZE && grid[r][c] === grid[r][c + 1]) return false
      if (r + 1 < SIZE && grid[r][c] === grid[r + 1][c]) return false
    }
  return true
}
