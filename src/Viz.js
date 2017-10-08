import React from 'react'
import { omit } from 'lodash'
import { Context } from './context'
import { calculateScales } from './scales-utils'
import withDimensions from './with-dimensions'
import { execChildrenFunctions } from './react-utils'
import Grid from './components/Grid'

export default withDimensions(class Viz extends React.Component {
  scales = calculateScales(1, 1)

  componentWillMount() {
    this.componentWillUpdate(this.props)
  }

  componentWillUpdate(nextProps) {
    const { width, height } = nextProps.dimensions
    const { margin } = nextProps
    this.scales = calculateScales(width, height, margin)
  }

  render() {
    const { children, mouse, debug, ...otherProps } = this.props
    const { scales } = this
    const svgProps = omit(otherProps, ['dimensions', 'margin'])
    const listeners = mouse ? buildListeners(otherProps, mouse, scales) : {}

    return (
      <Context scales={scales}>
        <svg width="100%" height="100%" {...svgProps} {...listeners}>
          {debug && <Grid scales={scales} color={typeof debug === 'string' ? debug : 'steelblue'} /> }
          {execChildrenFunctions(children, [scales])}
        </svg>
      </Context>
    )
  }
})

function buildListeners(props, mouse, scales) {
  const listeners = [
    'onClick',
    'onMouseDown',
    'onMouseUp',
    'onMouseMove',
  ]
  return listeners.reduce((obj, key) => {
    const originalListener = props[key]
    obj[key] = (event) => {
      mouse.fromEvent(event, scales)
      if (originalListener) originalListener(mouse)
    }
    return obj
  }, {})
}
