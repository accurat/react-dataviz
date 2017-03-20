import React from 'react'
import { checkCoordinates } from './utils'
import { inject } from './context'

const injectScales = inject('scales')

export const Square = injectScales(({ scales, x, y, ...props }) => {
  return <rect x={scales.x(x) - 1} y={scales.y(y) - 1} width="2" height="2" {...props} />
})

export function SquaresChart({ points, keyFunc = ({ x }) => x, ...props }) {
  checkCoordinates(points)
  return (
    <g>
      {points.map(d =>
        <Square key={keyFunc(d)} x={d.x} y={d.y} {...props} />
      )}
    </g>
  )
}

export const VerticalLine = injectScales(({ scales, x, y = 0, w = 1, ...props }) => {
  return <rect x={scales.x(x) - w / 2} y={y} width={w} height="100%" {...props} />
})

export const Polyline = injectScales(({ identifier, scales, points, closed = false, ...props }) => {
  checkCoordinates(points)
  const scaledPoints = points.map(({ x, y }) => ({ x: scales.x(x), y: scales.y(y) }))
  const { x: beginX, y: beginY } = scaledPoints[0]
  const { x: endX } = scaledPoints[scaledPoints.length - 1]

  const svgPoints = scaledPoints
    .map(({ x, y }) => `${x},${y}`)
    .concat(closed ? `${endX},${scales.y(0)} ${beginX},${scales.y(0)} ${beginX},${beginY}` : '')
    .join(' ')
  if (props.onMouseOver) {
    // TODO: Refactor and apply to all other elements.
    const listener = props.onMouseOver
    props.onMouseOver = () => listener(identifier)
  }
  return <polyline points={svgPoints} y={0} {...props} />
})
