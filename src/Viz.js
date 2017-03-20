import React from 'react'
import { omit } from 'lodash'
import { Context } from './context'
import ReactiveMouse from './ReactiveMouse'
import { dimension, calculateScales, noop } from './utils'

export const Viz = dimension(class Viz extends React.Component {
  scales = calculateScales(1, 1)
  mouse = null

  componentWillMount() {
    this.mouse = new ReactiveMouse()

    this.componentWillUpdate(this.props)
  }

  componentWillUpdate(nextProps) {
    const { width, height } = nextProps.dimensions
    const { margin } = nextProps
    this.scales = calculateScales(width, height, margin)
  }

  render() {
    const { children, onClick = noop, onMouseMove = noop, ...otherProps } = this.props
    const { scales, mouse } = this
    const svgProps = omit(otherProps, ['dimensions', 'margin'])
    const listeners = {
      onMouseMove({ clientX, clientY }) {
        mouse.x = clientX
        mouse.y = clientY
        onMouseMove({
          ...mouse,
          scaledX: scales.inverse.x(mouse.x),
          scaledY: scales.inverse.y(mouse.y),
        })
      },
      onMouseLeave() {
        mouse.x = null
      },
      onMouseDown() {
        mouse.click = true
      },
      onMouseUp() {
        mouse.click = false
      },
      onClick(event) {
        onClick({
          ...mouse,
          scaledX: scales.inverse.x(mouse.x),
          scaledY: scales.inverse.y(mouse.y),
        })
      },
    }

    return (
      <Context scales={scales} mouse={mouse}>
        <svg width="100%" height="100%" {...svgProps} {...listeners}>
          {children}
        </svg>
      </Context>
    )
  }
})
