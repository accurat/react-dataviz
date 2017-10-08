import React from 'react'
import { inject } from '../context'
import { buildMargin } from '../scales-utils'

export default inject('scales')(function Frame({ scales, margin, color = 'black' }) {
  margin = buildMargin(margin)
  const flipY = scales.y(0) > scales.y(1)

  const l = scales.x(0)
  const r = scales.x(1)
  const t = scales.y(0)
  const b = scales.y(1)

  const fl = scales.x(0) - margin.left
  const fr = scales.x(1) + margin.right
  const ft = scales.y(0) + (flipY ? margin.bottom : -margin.top)
  const fb = scales.y(1) + (flipY ? -margin.top : margin.bottom)

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
