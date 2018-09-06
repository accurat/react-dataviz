import { AreaClosed as VXAreaClosed, LinePath as VXLinePath } from '@vx/shape'
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

export { AreaStack, Bar, BarGroup, BarGroupHorizontal, Pie, Line } from '@vx/shape'
