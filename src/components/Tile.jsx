const COLORS = {
  0:    'bg-white text-transparent',
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

function fontSize(value) {
  if (value >= 1024) return 'text-2xl'
  if (value >= 128) return 'text-3xl'
  return 'text-4xl'
}

export default function Tile({ value }) {
  const color = COLORS[value] || 'bg-[#000844] text-white'
  return (
    <div
      className={`
        flex items-center justify-center rounded-md font-bold font-game
        transition-all duration-100 ease-in-out
        ${color} ${fontSize(value)}
        aspect-square w-full
        ${value ? 'scale-100' : ''}
      `}
    >
      {value !== 0 ? value : ''}
    </div>
  )
}
