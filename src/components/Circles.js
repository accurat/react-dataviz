import React from 'react'
import { inject } from '../context'
import { series } from './series'

export const Circle = inject('scales')(({ scales, x, y, r = 4, ...otherProps }) => {
  return <circle cx={scales.x(x)} cy={scales.y(y)} r={r} {...otherProps} />
})

export const Circles = series(Circle)
