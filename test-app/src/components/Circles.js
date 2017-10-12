import React from 'react'
import { injectRescale } from 'react-dataviz'
import { series } from './series'

export const Circle = injectRescale(({ rescale, x, y, r = 4, ...otherProps }) => {
  return <circle cx={rescale.x(x)} cy={rescale.y(y)} r={r} {...otherProps} />
})

export const Circles = series(Circle)
