import React from 'react'
import { injectRescale } from '../context'
import { series } from './series'

export const Square = injectRescale(({ rescale, x, y, r = 4, ...otherProps }) => {
  return <rect x={rescale.x(x) - r} y={rescale.y(y) - r} width={2 * r} height={2 * r} {...otherProps} />
})

export const Squares = series(Square)
