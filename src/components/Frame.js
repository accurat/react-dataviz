import React from 'react'
import { injectRescale } from '../context'
import { buildMargin } from '../rescale-utils'

export default injectRescale(function Frame({ rescale, margin, color = 'black' }) {
  margin = buildMargin(margin)
  const flipY = rescale.y(0) > rescale.y(1)

  const l = rescale.x(0)
  const r = rescale.x(1)
  const t = rescale.y(0)
  const b = rescale.y(1)

  const fl = rescale.x(0) - margin.left
  const fr = rescale.x(1) + margin.right
  const ft = rescale.y(0) + (flipY ? margin.bottom : -margin.top)
  const fb = rescale.y(1) + (flipY ? -margin.top : margin.bottom)

  const framePoints = [].concat(
    [
      l, t, fl, ft, l, t,
      l, b, fl, fb, l, b,
      r, b, fr, fb, r, b,
      r, t, fr, ft, r, t,
      l, t,
      fl, ft,
      fl, fb,
      fr, fb,
      fr, ft,
      fl, ft,
    ],
  )
  return (
    <polyline
      points={framePoints}
      fill="none"
      stroke={color}
      strokeWidth="1"
      strokeOpacity="0.5"
    />
  )
})
