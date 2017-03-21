import React from 'react'
import { omit } from 'lodash'
import { Context } from './context'
import ReactiveMouse from './ReactiveMouse'
import { dimension, calculateScales, noop } from './utils'

export const Viz = dimension(class Viz extends React.Component {
  scales = calculateScales(1, 1)
  mouse = null

  componentWillMount() {
    this.mouse = new ReactiveMouse(this.scales)

    this.componentWillUpdate(this.props)
  }

  componentWillUpdate(nextProps) {
    const { width, height } = nextProps.dimensions
    const { margin } = nextProps
    this.scales = calculateScales(width, height, margin)
  }

  render() {
    const { children, ...otherProps } = this.props
    const { scales, mouse } = this
    const svgProps = omit(otherProps, ['dimensions', 'margin'])
    const listeners = getListeners(otherProps, mouse)

    return (
      <Context scales={scales} mouse={mouse}>
        <svg width="100%" height="100%" {...svgProps} {...listeners}>
          {children}
        </svg>
      </Context>
    )
  }
})

const LEFT_BUTTON = 1
const RIGHT_BUTTON = 2
const MIDDLE_BUTTON = 4

function getListeners(props, mouse) {
  const listenerProps = Object.keys(props).filter(k => k.match(/^on[A-Z]/))
  return listenerProps.reduce((obj, k) => {
    const originalListener = obj[k]
    const newListener = (event) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
      mouse.click = (event.buttons & LEFT_BUTTON > 0)
      mouse.clickRight = (event.buttons & RIGHT_BUTTON > 0)
      mouse.clickMiddle = (event.buttons & MIDDLE_BUTTON > 0)
      originalListener(mouse)
    }
    obj[k] = newListener
  }, {})
}
