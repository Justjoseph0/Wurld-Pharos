import Tile from './Tile'

export default function Board({ grid, onTouchStart, onTouchEnd }) {
  return (
    <div
      className="bg-[#011fc7] rounded-lg p-2 sm:p-3 touch-none select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {grid.flat().map((value, i) => (
          <Tile key={i} value={value} />
        ))}
      </div>
    </div>
  )
}
