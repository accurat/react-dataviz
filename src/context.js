import React from 'react'
import { zipObject, pick } from 'lodash'

function any() { return null }

function buildContextTypesAny(keys) {
  return zipObject(keys, Array(keys.length).fill(any))
}

export class Context extends React.Component {
  static childContextTypes = buildContextTypesAny(['scales', 'mouse'])

  getChildContext() {
    return pick(this.props, ['scales', 'mouse'])
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

export function inject(...contextKeys) {
  return (Injected) => {
    return class Injector extends React.Component {
      static contextTypes = buildContextTypesAny(contextKeys)

      render() {
        const props = {
          ...pick(this.context, contextKeys),
          ...this.props,
        }
        return <Injected {...props} />
      }
    }
  }
}
