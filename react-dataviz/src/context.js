import React from 'react'
import { pick, omit } from 'lodash'

function propTypesAny() { return null }

export class Context extends React.Component {
  static childContextTypes = {
    reactDatavizContext: propTypesAny,
  }

  getChildContext() {
    return {
      reactDatavizContext: omit(this.props, ['children']),
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

export function inject(...contextKeys) {
  return (InjectedComponent) => {
    return class Injector extends React.Component {
      static contextTypes = {
        reactDatavizContext: propTypesAny,
      }

      render() {
        const props = {
          ...pick(this.context.reactDatavizContext, contextKeys),
          ...this.props,
        }
        return <InjectedComponent {...props} />
      }
    }
  }
}

export function injectRescale(...args) {
  return inject('rescale')(...args)
}
