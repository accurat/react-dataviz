import { AreaClosed as VXAreaClosed, LinePath as VXLinePath } from '@vx/shape'
import { injectRescale } from 'react-dataviz'

export const AreaClosed = injectRescale(props =>
  VXAreaClosed({
    x: d => d.x,
    y: d => d.y,
    y0: props.rescale.bbox.y0,
    xScale: props.rescale.x,
    yScale: props.rescale.y,
    ...props,
  }),
)

export const LinePath = injectRescale(props =>
  VXLinePath({
    x: d => d.x,
    y: d => d.y,
    xScale: props.rescale.x,
    yScale: props.rescale.y,
    ...props,
  }),
)

export { AreaStack, Bar, BarGroup, BarGroupHorizontal, Pie, Line } from '@vx/shape'
