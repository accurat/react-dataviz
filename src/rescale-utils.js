export function normalize([xMin, xMax], x) {
  if (xMax === xMin) return xMin
  return (x - xMin) / (xMax - xMin)
}

export function denormalize([min, max], n) {
  return min * (1 - n) + max * n
}

export function buildMargin(margin) {
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

function flipNormalized(y) {
  return 1 - y
}

function id(y) {
  return y
}

export function calculateRescale(zeroXY, oneXY, margin = 0, { flipY = false } = {}) {
  const [zeroX, zeroY] = zeroXY
  const [oneX, oneY] = oneXY
  const width = oneX - zeroX
  const height = oneY - zeroY
  const { top, bottom, left, right } = buildMargin(margin)
  const innerWidth = width - left - right
  const innerHeight = height - top - bottom

  const domainX = [left + zeroX, oneX - right]
  const domainY = [top + zeroY, oneY - bottom]
  const maybeFlip = flipY ? flipNormalized : id

  const rescale = {
    x: x => denormalize(domainX, x),
    y: y => denormalize(domainY, maybeFlip(y)),
    xy: ([x, y]) => [rescale.x(x), rescale.y(y)],
    w: x => x * innerWidth,
    h: y => y * innerHeight,
    inverse: {
      x: ix => normalize(domainX, ix),
      y: iy => maybeFlip(normalize(domainY, iy)),
      xy: ([ix, iy]) => [rescale.inverse.x(ix), rescale.inverse.y(iy)],
      w: ix => ix / innerWidth,
      h: iy => iy / innerHeight,
    },
  }
  return rescale
}
