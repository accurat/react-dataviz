import React from 'react'
import { checkCoordinates } from '../utils'
import { inject } from '../context'

export const Square = inject('scales')(({ scales, x, y, s = 2, ...otherProps }) => {
  return <rect x={scales.x(x) - s / 2} y={scales.y(y) - s / 2} width={s} height={s} {...otherProps} />
})

export function Squares({ points, keyFunc = ({ x }) => x, ...otherProps }) {
  checkCoordinates(points, { component: 'Squares', details: otherProps })
  return (
    <g>
      {points.map(d =>
        <Square key={keyFunc(d)} x={d.x} y={d.y} {...otherProps} />
      )}
    </g>
  )
}
