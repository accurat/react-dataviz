import React from 'react'
import { omit } from 'lodash'
import { Context, inject } from './context'
import { denormalize } from './scales-utils'
import { execChildrenFunctions } from './react-utils'
import Grid from './components/Grid'

export default inject('scales')(class SubViz extends React.Component {
  scales = null

  componentWillMount() {
    this.updateScales(this.props)
  }

  componentWillUpdate(nextProps) {
    this.updateScales(nextProps)
  }

  updateScales({ from, to, scales: outerScales }) {
    const [x1, x2] = [from[0], to[0]].map(outerScales.x)
    const [y1, y2] = [from[1], to[1]].map(outerScales.y)
    const w = x2 - x1
    const h = y2 - y1
    this.scales = {
      x: x => denormalize([x1, x2], x),
      y: y => denormalize([y1, y2], y),
      w: x => x * w,
      h: y => y * h,
    }
  }

  render() {
    const { children, debug, ...otherProps } = this.props
    const { scales } = this
    const gProps = omit(otherProps, ['scales', 'from', 'to'])

    return (
      <Context scales={scales}>
        <g {...gProps}>
          {debug && <Grid color={typeof debug === 'string' ? debug : 'tomato'} /> }
          {execChildrenFunctions(children, [scales])}
        </g>
      </Context>
    )
  }
})
