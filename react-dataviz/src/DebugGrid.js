import React from 'react'
import { times } from 'lodash'
import { flatten, mapCouples } from './reducers'
import { injectRescale } from './context'

export default injectRescale(function DebugGrid({ rescale, color = 'black' }) {
  const gridPoints = [].concat(
    times(11, i => [
      i % 2 === 0 ? 0 : 1,
      i / 10,
      i % 2 === 0 ? 1 : 0,
      i / 10,
    ]),
    times(11, i => [
      i / 10,
      i % 2 === 0 ? 1 : 0,
      i / 10,
      i % 2 === 0 ? 0 : 1,
    ]),
  )
  return (
    <polyline
      points={
        gridPoints
        .reduce(flatten(), [])
        .reduce(mapCouples(rescale.x, rescale.y), [])
      }
      fill="none"
      stroke={color}
      strokeWidth="1"
      strokeOpacity="0.5"
    />
  )
})
