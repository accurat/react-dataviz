import React from 'react'
import { times } from 'lodash'
import { flatten, mapCouples } from '../reducers'
import { inject } from '../context'

export default inject('scales')(function Grid({ scales, color = 'black' }) {
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
        .reduce(mapCouples(scales.x, scales.y), [])
      }
      fill="none"
      stroke={color}
      strokeWidth="1"
      strokeOpacity="0.5"
    />
  )
})
