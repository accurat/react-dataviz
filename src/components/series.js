import React from 'react'
import { checkCoordinates } from '../scales-utils'

export function series(SubComponent, name = SubComponent.name + 's') {
  const SeriesComponent = function SeriesComponent({ points, keyFunc = ({ x }) => x, ...otherProps }) {
    checkCoordinates(points, { component: name, details: otherProps })
    return (
      <g>
        {points.map(d =>
          <SubComponent key={keyFunc(d)} x={d.x} y={d.y} {...otherProps} />
        )}
      </g>
    )
  }
  SeriesComponent.displayName = name
  return SeriesComponent
}
