import React from 'react'
import { debounce } from 'lodash'

export function noop() {}

export function normalizeScale([xMin, xMax], x) {
  if (xMax === xMin) return xMin
  return (x - xMin) / (xMax - xMin)
}

export function denormalizeScale(x, [xMin, xMax]) {
  return x * (xMax - xMin) + xMin
}

export function dimension(ComponentToWrap) {
  return class Dimension extends React.Component {
    el = null

    debouncedUpdate = debounce(() => { this.forceUpdate() }, 100)

    componentDidMount() {
      window.addEventListener('resize', this.debouncedUpdate)
      setTimeout(() => { this.forceUpdate() }, 100)
      setTimeout(() => { this.forceUpdate() }, 200) // Two renders, because content resizes.
    }

    componentWillUnmount() {
      this.debouncedUpdate.cancel && this.debouncedUpdate.cancel()
      window.removeEventListener('resize', this.debouncedUpdate)
    }

    render() {
      const dimensions = this.el
        ? this.el.getBoundingClientRect() // HEAVY
        : null

      return (
        <div style={{ width: '100%', height: '100%' }} ref={el => { this.el = el }}>
          {this.el
            ? <ComponentToWrap {...this.props} dimensions={dimensions} />
            : <div/>
          }
        </div>
      )
    }
  }
}

function buildMargin(margin) {
  if (typeof margin === 'number') {
    const m = margin
    return { top: m, right: m, left: m, bottom: m }
  }

  const { vert, horiz } = margin
  const {
    top = vert,
    bottom = vert,
    left = horiz,
    right = horiz,
  } = margin
  return { top, bottom, left, right }
}

export function calculateScales(width, height, margin = 0) {
  const { top, bottom, left, right } = buildMargin(margin)
  const innerWidth = width - (left + right)
  const innerHeight = height - (top + bottom)
  return {
    x: x => left + x * innerWidth,
    y: y => top + (1 - y) * innerHeight,
    inverse: {
      x: ix => (ix - left) / innerWidth,
      y: iy => 1 - ((iy - top) / innerHeight),
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
