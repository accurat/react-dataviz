import React from 'react'
import { omit } from 'lodash'
import { Context, inject } from './context'
import { calculateRescale } from './rescale-utils'
import { execChildrenFunctions } from './react-utils'
import Grid from './components/Grid'
import Frame from './components/Frame'

export default inject('rescale')(class SubViz extends React.Component {
  innerScales = null

  componentWillMount() {
    this.updateScales(this.props)
  }

  componentWillUpdate(nextProps) {
    this.updateScales(nextProps)
  }

  updateScales({ from, to, rescale: outerScales, margin, flipY }) {
    this.innerScales = calculateRescale(outerScales.xy(from), outerScales.xy(to), margin, { flipY })
  }

  render() {
    const { children, debug, margin, ...otherProps } = this.props
    const { innerScales } = this
    const gProps = omit(otherProps, ['rescale', 'from', 'to', 'margin', 'flipY'])

    return (
      <Context rescale={innerScales}>
        <g {...gProps}>
          {debug && (
            <g>
              <Grid color={typeof debug === 'string' ? debug : 'tomato'} />
              <Frame margin={margin} color={typeof debug === 'string' ? debug : 'tomato'} />
            </g>
          )}
          {execChildrenFunctions(children, [innerScales])}
        </g>
      </Context>
    )
  }
})
