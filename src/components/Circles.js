import React from 'react'
import { inject } from '../context'
import { series } from './series'

export const Circle = inject('rescale')(({ rescale, x, y, r = 4, ...otherProps }) => {
  return <circle cx={rescale.x(x)} cy={rescale.y(y)} r={r} {...otherProps} />
})

export const Circles = series(Circle)
