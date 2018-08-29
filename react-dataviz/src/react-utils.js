import React from 'react'

export function execChildrenFunctions(children, args) {
  // React.Children.map does't work with children functions
  return (Array.isArray(children) ? children : [children]).map((child, i) => {
    const element = typeof child === 'function' ? child(...args) : child
    const keyed = React.isValidElement(element) ? React.cloneElement(element, { key: i }) : element
    return keyed
  })
}
