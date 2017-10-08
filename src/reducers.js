export function mapCouples(f, g) {
  return (acc, e, i) => {
    acc.push(i % 2 === 0 ? f(e, i) : g(e, i))
    return acc
  }
}

export function flatten() {
  return (acc, e, i) => {
    Array.isArray(e) ? acc.push(...e) : acc.push(e)
    return acc
  }
}
