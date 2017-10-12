import React from 'react'
import { omit } from 'lodash'
import { Context } from './context'
import { calculateRescale } from './rescale-utils'
import withDimensions from './with-dimensions'
import { execChildrenFunctions } from './react-utils'
import DebugGrid from './DebugGrid'

export default withDimensions(class Viz extends React.Component {
  rescale = calculateRescale([0, 0], [1, 1])

  componentWillMount() {
    this.componentWillUpdate(this.props)
  }

  componentWillUpdate(nextProps) {
    const { margin, dimensions, flipY } = nextProps
    const { width, height } = dimensions
    this.rescale = calculateRescale([0, 0], [width, height], margin, { flipY })
  }

  render() {
    const { children, mouse, debug, ...otherProps } = this.props
    const { rescale } = this
    const svgProps = omit(otherProps, ['dimensions', 'margin', 'flipY'])
    const listeners = mouse ? buildListeners(otherProps, mouse, rescale) : {}

    return (
      <Context rescale={rescale}>
        <svg width="100%" height="100%" {...svgProps} {...listeners}>
          {debug && <DebugGrid rescale={rescale} color={typeof debug === 'string' ? debug : 'steelblue'} /> }
          {execChildrenFunctions(children, [rescale])}
        </svg>
      </Context>
    )
  }
})

function buildListeners(props, mouse, rescale) {
  const listeners = [
    'onClick',
    'onMouseDown',
    'onMouseUp',
    'onMouseMove',
  ]
  return listeners.reduce((obj, key) => {
    const originalListener = props[key]
    obj[key] = (event) => {
      mouse.fromEvent(event, rescale)
      if (originalListener) originalListener(mouse)
    }
    return obj
  }, {})
}
