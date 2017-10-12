import React from 'react'
import { checkCoordinates } from '../rescale-utils'
import { injectRescale } from '../context'

export const Polyline = injectRescale(props => {
  const { identifier, rescale, points, closed = false, ...otherProps } = props
  checkCoordinates(points, { component: 'Polyline', details: otherProps })
  const scaledPoints = points.map(({ x, y }) => ({ x: rescale.x(x), y: rescale.y(y) }))
  const { x: beginX, y: beginY } = scaledPoints[0]
  const { x: endX } = scaledPoints[scaledPoints.length - 1]

  const svgPoints = scaledPoints
    .map(({ x, y }) => `${x},${y}`)
    .concat(closed ? `${endX},${rescale.y(0)} ${beginX},${rescale.y(0)} ${beginX},${beginY}` : '')
    .join(' ')

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

  return <polyline points={svgPoints} y={0} {...otherProps} />
})
