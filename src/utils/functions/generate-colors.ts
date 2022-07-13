export function generateColors(quantity: number) {
  const colorsToPick = [
    '#49C4E5',
    '#8471F2',
    '#67E2AE',
    '#F2B867',
    '#ff4000',
    '#ff87ab',
    '#5D3A00',
    '#00bfff'
  ]

  const colors = []
  for (let index = 0; index < quantity; index++) {
    colors.push(colorsToPick[Math.floor(Math.random() * colorsToPick.length)])
  }

  return colors
}
