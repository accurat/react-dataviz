import React from 'react'
import { checkCoordinates } from '../rescale-utils'
import { injectRescale } from '../context'

function scaleXY(rescale, { x, y }) {
  return {
    x: rescale.x(x),
    y: rescale.y(y),
  }
}

const ZERO = { x: 0, y: 0 }

export const Line = injectRescale(({ rescale, from = ZERO, to = ZERO, w = 5, ...otherProps }) => {
  checkCoordinates([from, to], { component: 'Line', details: otherProps })
  const { x: sx1, y: sy1 } = scaleXY(rescale, from)
  const { x: sx2, y: sy2 } = scaleXY(rescale, to)
  otherProps.style = {
    strokeWidth: w,
    strokeLinecap: 'square',
    ...otherProps.style,
  }
  return <line x1={sx1} y1={sy1} x2={sx2} y2={sy2} {...otherProps} />
  // return <rect x={sx} y={sy} width={w} height={sx + sy} {...otherProps} />
})
