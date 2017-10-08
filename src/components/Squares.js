import React from 'react'
import { inject } from '../context'
import { series } from './series'

export const Square = inject('scales')(({ scales, x, y, r = 4, ...otherProps }) => {
  return <rect x={scales.x(x) - r} y={scales.y(y) - r} width={2 * r} height={2 * r} {...otherProps} />
})

export const Squares = series(Square)
