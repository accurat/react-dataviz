import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import { kebabCase, capitalize } from 'lodash'
import { omit } from 'lodash/fp'
import * as easings from 'd3-ease'
import { select } from 'd3-selection'
import 'd3-transition'

const DEFAULT_ANIM_PARAMS = { duration: 500, delay: 0, ease: 'cubic' }

function animate(elementSelection, fromAttrs, toAttrs, animParams = {}) {
  const params = { ...DEFAULT_ANIM_PARAMS, ...animParams }
  const transition = elementSelection.transition()
  if (params.duration !== undefined) transition.duration(params.duration)
  if (params.delay !== undefined) transition.delay(params.delay)
  if (params.ease !== undefined) transition.ease(easings[params.ease] || easings[`ease${capitalize(params.ease)}`])

  for (let key in fromAttrs) {
    elementSelection.attr(kebabCase(key), fromAttrs[key])
    console.log('attr', kebabCase(key), fromAttrs[key])
  }
  for (let key in toAttrs) {
    transition.attr(kebabCase(key), toAttrs[key])
    console.log('trans', kebabCase(key), toAttrs[key])
  }
  return new Promise((resolve, reject) => {
    transition.on('end', resolve)
  })
}

const filterAnimableProps = omit(['animable', 'style'])

export default function Animable(Element) {
  if (['svg', 'g'].includes(Element)) {
    return (props) => <TransitionGroup component={Element} {...props} />
  }

  class Animated extends React.Component {
    componentWillMount() {
      const { animable, ...elementProps } = this.props

      const enterProps = {}
      const exitProps = {}
      for (let key in elementProps) {
        const val = animable[key]

        if (typeof val === 'object') {
          if (val.enter !== undefined) enterProps[key] = val.enter
          if (val.exit !== undefined) exitProps[key] = val.exit
        } else if (val !== undefined) {
          enterProps[key] = val
          exitProps[key] = val
        } else {
          const propVal = elementProps[key]
          if (Number.isFinite(Number(propVal))) {
            enterProps[key] = 0
            exitProps[key] = 0
          } else if (['fill', 'stroke'].includes(key)) {
            enterProps[key] = 'transparent'
            exitProps[key] = 'transparent'
          }
        }
      }
      this.enterProps = enterProps
      this.exitProps = exitProps
    }

    componentWillUpdate(newProps) {
      this.oldPropsAnimable = filterAnimableProps(this.props)
      this.newPropsAnimable = filterAnimableProps(newProps)
    }

    componentDidUpdate() {
      animate(this.elementSelection, this.oldPropsAnimable, this.newPropsAnimable)
    }

    componentWillAppear(callback) {
      animate(this.elementSelection, this.enterProps, filterAnimableProps(this.props)).then(callback)
    }

    componentWillEnter(callback) {
      animate(this.elementSelection, this.enterProps, filterAnimableProps(this.props)).then(callback)
    }

    componentWillLeave(callback) {
      animate(this.elementSelection, {}, this.exitProps).then(callback)
    }

    selRef = (el) => {
      this.elementSelection = select(el)
    }

    render() {
      return <Element ref={this.selRef} {...omit('animable', this.props)} />
    }
  }

  Animated.defaultProps = {
    animable: {},
  }

  return Animated
}
