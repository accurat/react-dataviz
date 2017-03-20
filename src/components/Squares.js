import React from 'react'
import { inject } from '../context'
import { series } from './series'

export const Square = inject('scales')(({ scales, x, y, s = 14, ...otherProps }) => {
  return <rect x={scales.x(x) - s / 2} y={scales.y(y) - s / 2} width={s} height={s} {...otherProps} />
})

export const Squares = series(Square)
