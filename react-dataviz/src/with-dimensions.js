import React from 'react'
import { debounce } from 'lodash'

export default function withDimensions(ComponentToWrap) {
  return class Dimension extends React.Component {
    el = null
    state = { dimensions: null }

    debouncedUpdate = debounce(() => {
      const dimensions = this.el
        ? this.el.getBoundingClientRect() // HEAVY
        : null
      this.setState({ dimensions })
    }, 100)

    componentDidMount() {
      window.addEventListener('resize', this.debouncedUpdate)
      this.timer = window.setTimeout(this.debouncedUpdate, 400) // Necessary, don't know why
      this.debouncedUpdate()
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.debouncedUpdate)
      this.timer = window.clearTimeout(this.timer)
      this.debouncedUpdate.cancel && this.debouncedUpdate.cancel()
    }

    render() {
      const { dimensions } = this.state
      const { width = '100%', height = '100%' } = this.props // Only to override a dimension

      return (
        <div style={{ width, height }} ref={el => { this.el = el }}>
          {dimensions !== null
            ? <ComponentToWrap {...this.props} dimensions={dimensions} />
            : <div/>
          }
        </div>
      )
    }
  }
}
