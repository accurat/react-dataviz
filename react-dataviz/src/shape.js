import { AreaClosed as VXAreaClosed, LinePath as VXLinePath, Pie as VXPie } from '@vx/shape'
import { injectRescale } from 'react-dataviz'
import { omit } from 'lodash'

export const AreaClosed = injectRescale(props =>
  VXAreaClosed({
    x: d => d.x,
    y: d => d.y,
    y0: props.rescale.bbox.y0,
    xScale: props.rescale.x,
    yScale: props.rescale.y,
    ...omit(props, ['rescale']),
  }),
)

export const LinePath = injectRescale(props =>
  VXLinePath({
    x: d => d.x,
    y: d => d.y,
    xScale: props.rescale.x,
    yScale: props.rescale.y,
    ...omit(props, ['rescale']),
  }),
)

export const Pie = injectRescale(props => {
  const { x0, x1, y0, y1 } = props.rescale.bbox
  return VXPie({
    outerRadius: Math.min(x1 - x0, y1 - y0) / 2,
    top: (y0 + y1) / 2,
    left: (x0 + x1) / 2,
    ...omit(props, ['rescale']),
  })
})

export { AreaStack, Bar, BarGroup, BarGroupHorizontal, Line } from '@vx/shape'
