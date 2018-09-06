import { scaleLinear } from '@vx/scale'
import { injectRescale } from 'react-dataviz'
import { omit } from 'lodash'

import {
  AxisBottom as VXAxisBottom,
  AxisLeft as VXAxisLeft,
  AxisRight as VXAxisRight,
  AxisTop as VXAxisTop,
} from '@vx/axis'

export const AxisBottom = injectRescale(props => {
  const { x0, x1, y0, y1 } = props.rescale.bbox
  const scale = scaleLinear({
    domain: [0, 1],
    range: [x0, x1],
  })

  return VXAxisBottom({
    scale,
    top: y0,
    ...omit(props, ['rescale']),
    labelProps: {
      ...props.labelProps,
      x: (x0 + x1) / 2,
    },
  })
})

export const AxisLeft = injectRescale(props => {
  const { x0, x1, y0, y1 } = props.rescale.bbox
  const scale = scaleLinear({
    domain: [0, 1],
    range: [y0, y1],
  })

  return VXAxisLeft({
    scale,
    left: x0,
    ...omit(props, ['rescale']),
    labelProps: {
      ...props.labelProps,
      x: -(y0 + y1) / 2,
    },
  })
})

export const AxisTop = injectRescale(props => {
  const { x0, x1, y0, y1 } = props.rescale.bbox
  const scale = scaleLinear({
    domain: [0, 1],
    range: [x0, x1],
  })

  return VXAxisTop({
    scale,
    top: y1,
    ...omit(props, ['rescale']),
    labelProps: {
      ...props.labelProps,
      x: (x0 + x1) / 2,
    },
  })
})

export const AxisRight = injectRescale(props => {
  const { x0, x1, y0, y1 } = props.rescale.bbox
  const scale = scaleLinear({
    domain: [0, 1],
    range: [y0, y1],
  })

  return VXAxisRight({
    scale,
    left: x1,
    ...omit(props, ['rescale']),
    labelProps: {
      ...props.labelProps,
      x: (y0 + y1) / 2,
    },
  })
})

export { Axis } from '@vx/axis'
