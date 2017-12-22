import React from 'react'
import { injectRescale } from 'react-dataviz'
import { checkCoordinates } from './coord-utils'
import Animable from 'react-dataviz/Animable'

export function polyPoints(points, rescale, { closed = false } = {}) {
  const scaledPoints = points.map(({ x, y }) => ({ x: rescale.x(x), y: rescale.y(y) }))
  const { x: beginX, y: beginY } = scaledPoints[0]
  const { x: endX } = scaledPoints[scaledPoints.length - 1]

  const svgPoints = scaledPoints
    .map(({ x, y }) => `${x},${y}`)
    .concat(closed ? `${endX},${rescale.y(0)} ${beginX},${rescale.y(0)} ${beginX},${beginY}` : '')
    .join(' ')
  return svgPoints
}

const AnimG = Animable('g')
const AnimPolyline = Animable('polyline')

export const Polyline = injectRescale(props => {
  const { identifier, rescale, points, closed = false, ...otherProps } = props

  checkCoordinates(points, { component: 'Polyline', details: otherProps })
  const svgPoints = polyPoints(points, rescale, { closed })
  const svgZeroPoints = polyPoints(points.map(({ x, y }) => ({ x, y: 0 })), rescale, { closed })

  if (otherProps.onMouseOver) {
    // TODO: Refactor and apply to all other elements.
    const listener = otherProps.onMouseOver
    otherProps.onMouseOver = () => listener(identifier)
  }

  otherProps.style = {
    strokeWidth: 2,
    strokeLinecap: 'square',
    fill: 'none',
    ...otherProps.style,
  }

  return (
    <AnimG>
      <AnimPolyline
        points={svgPoints}
        y={0}
        animable={{ points: svgZeroPoints }}
        {...otherProps}
      />
    </AnimG>
  )
})
