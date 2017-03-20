import React from 'react'
import { checkCoordinates } from '../utils'
import { inject } from '../context'

export const Polyline = inject('scales')(props => {
  const { identifier, scales, points, closed = false, ...otherProps } = props
  checkCoordinates(points, { component: 'Polyline', details: otherProps })
  const scaledPoints = points.map(({ x, y }) => ({ x: scales.x(x), y: scales.y(y) }))
  const { x: beginX, y: beginY } = scaledPoints[0]
  const { x: endX } = scaledPoints[scaledPoints.length - 1]

  const svgPoints = scaledPoints
    .map(({ x, y }) => `${x},${y}`)
    .concat(closed ? `${endX},${scales.y(0)} ${beginX},${scales.y(0)} ${beginX},${beginY}` : '')
    .join(' ')
  if (otherProps.onMouseOver) {
    // TODO: Refactor and apply to all other elements.
    const listener = otherProps.onMouseOver
    otherProps.onMouseOver = () => listener(identifier)
  }
  return <polyline points={svgPoints} y={0} {...otherProps} />
})
