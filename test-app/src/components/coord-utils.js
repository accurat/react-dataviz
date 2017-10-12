export function checkCoordinate(point, { component = 'Unknown', message = '', details } = {}) {
  if (![point.x, point.y].every(Number.isFinite)) {
    console.warn(`Viz/${component}: incorrect coordinate:`, { details })
    throw new Error(`Viz/${component}: incorrect coordinate.`)
  }
}

export function checkCoordinates(points, info = {}) {
  points.forEach(p => { checkCoordinate(p, info = {}) })
}
