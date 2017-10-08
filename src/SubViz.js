import React from 'react'
import { omit } from 'lodash'
import { Context, inject } from './context'
import { calculateScales } from './scales-utils'
import { execChildrenFunctions } from './react-utils'
import Grid from './components/Grid'

export default inject('scales')(class SubViz extends React.Component {
  innerScales = null

  componentWillMount() {
    this.updateScales(this.props)
  }

  componentWillUpdate(nextProps) {
    this.updateScales(nextProps)
  }

  updateScales({ from, to, scales: outerScales, margin, flipY }) {
    this.innerScales = calculateScales(outerScales.xy(from), outerScales.xy(to), margin, { flipY })
  }

  render() {
    const { children, debug, margin, ...otherProps } = this.props
    const { innerScales } = this
    const gProps = omit(otherProps, ['scales', 'from', 'to', 'margin', 'flipY'])

    return (
      <Context scales={innerScales}>
        <g {...gProps}>
          {debug && <Grid color={typeof debug === 'string' ? debug : 'tomato'} /> }
          {execChildrenFunctions(children, [innerScales])}
        </g>
      </Context>
    )
  }
})
