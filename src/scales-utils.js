export function normalize([xMin, xMax], x) {
  if (xMax === xMin) return xMin
  return (x - xMin) / (xMax - xMin)
}

export function denormalize([min, max], n) {
  return min * (1 - n) + max * n
}

function buildMargin(margin) {
  if (typeof margin === 'number') {
    const m = margin
    return { top: m, right: m, bottom: m, left: m }
  } else if (Array.isArray(margin) && margin.length === 2) {
    const [ v, h ] = margin
    return { top: v, right: h, bottom: v, left: h }
  } else if (Array.isArray(margin)) {
    const [ top = 0, right = 0, bottom = 0, left = 0 ] = margin
    return { top, right, bottom, left }
  }

  const {
    v = 0,
    h = 0,
    vert = v,
    horiz = h,
    top = vert,
    right = horiz,
    bottom = vert,
    left = horiz,
  } = margin
  return { top, bottom, left, right }
}

export function calculateScales(width, height, margin = 0) {
  const { top, bottom, left, right } = buildMargin(margin)
  const innerWidth = width - left - right
  const innerHeight = height - top - bottom
  return {
    x: x => denormalize([left, width - right], x),
    y: y => denormalize([top, height - bottom], y),
    w: x => x * innerWidth,
    h: y => y * innerHeight,
    inverse: {
      x: ix => normalize([left, width - right], ix),
      y: iy => normalize([top, height - bottom], iy),
      w: ix => ix / innerWidth,
      h: iy => iy / innerHeight,
    },
  }
}

export function checkCoordinate(point, { component = 'Unknown', message = '', details } = {}) {
  if (![point.x, point.y].every(Number.isFinite)) {
    console.warn(`Viz/${component}: incorrect coordinate:`, { details })
    throw new Error(`Viz/${component}: incorrect coordinate.`)
  }
}

export function checkCoordinates(points, info = {}) {
  points.forEach(p => { checkCoordinate(p, info = {}) })
}
