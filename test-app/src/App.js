import React from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { Viz, SubViz, Polyline, Line, Squares, Square, Circles, buildReactiveMouse } from 'react-dataviz'

const data1 = [ 0.12, 0.65, 0.76, 0.73, 0.64, 0.76, 0.22, 0.32, 0.83, 0.18, 0.27 ]
const data2 = [ 0.15, 0.12, 0.22, 0.76, 0.73, 1.00, 0.64, 0.76, 0.32, 0.28, 0.29 ]

const style1 = { stroke: 'blue', fill: 'rgba(0, 0, 255, 0.1)', opacity: 0.5 }
const style2 = { stroke: 'red', fill: 'none', opacity: 0.5 }
const gridStyle = { stroke: 'lightgreen' }
const centerStyle = { fill: 'lightgreen' }

function dataToPoints(data) {
  const interval = 1 / (data.length - 1)
  return data.map((d, i) => ({ x: interval * i, y: d }))
}

@observer
class MouseDisplay extends React.Component {
  render() {
    const { mouse } = this.props
    const displayFloatOrValue = v => Number.isFinite(v) ? v.toFixed(2) : String(v)
    const mouseAttrs = Object.entries(toJS(mouse) || {})
    return (
      <table>
        <tbody>
          {mouseAttrs.map(([k, v]) =>
            <tr key={k}>
              <td className="w2 blue"> {k} </td>
              <td className="w4"> {displayFloatOrValue(v)} </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default class App extends React.Component {
  constructor() {
    super()
    this.mouse = buildReactiveMouse()
  }

  componentDidMount() {
    window.addEventListener('keydown', (ev) => { if (ev.key === ' ') this.forceUpdate() })
  }

  render() {
    return (
      <div className="w-100 h-100 bg-black-10">
        <div className="absolute pa2 bottom-0 right-0 code">
          <MouseDisplay mouse={this.mouse} />
        </div>
        <Viz margin={{ vert: 100, horiz: 100 }} mouse={this.mouse} debug="green">
          <Polyline points={dataToPoints(data1)} style={style1} closed />
          <Circles points={dataToPoints(data1)} style={{ stroke: 'none', fill: 'steelblue', opacity: 0.5 }} />
          <Polyline points={dataToPoints(data2)} style={style2} />
          <Squares points={dataToPoints(data2)} style={{ stroke: 'none', fill: 'yellow', opacity: 0.5 }} />
        </Viz>
      </div>
    )
  }
}
