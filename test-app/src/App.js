import React from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { Viz, SubViz, Polyline, Squares, Circles, buildReactiveMouse } from 'react-dataviz'

const data1 = [ 0.12, 0.65, 0.76, 0.73, 0.64, 0.76, 0.22, 0.32, 0.83, 0.18, 0.27 ]
const data2 = [ 0.15, 0.12, 0.22, 0.76, 0.73, 1.00, 0.64, 0.76, 0.32, 0.28, 0.29 ]

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
              <td className="w4 gray"> {displayFloatOrValue(v)} </td>
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
      <div className="w-100 h-100 bg-black">
        <div className="absolute pa2 bottom-0 right-0 code">
          <MouseDisplay mouse={this.mouse} />
        </div>
        <Viz margin={{ vert: 50, horiz: 50 }} mouse={this.mouse}>
          <SubViz flipY from={[0, 0]} to={[0.5, 0.5]} margin={20} debug="#333">
            <Polyline closed points={dataToPoints(data1)} style={{ stroke: 'none', fill: 'rgba(0, 0, 255, 0.5)' }} />
          </SubViz>
          <SubViz flipY from={[0.5, 0]} to={[1, 0.5]} margin={20} debug="#333">
            <Polyline closed points={dataToPoints(data2)} style={{ stroke: 'none', fill: 'rgba(255, 0, 0, 0.5)' }} />
          </SubViz>
          <SubViz flipY from={[0, 0.5]} to={[1, 1]} margin={20} debug="#333">
            <Circles points={dataToPoints(data1)} style={{ fill: 'green' }} />
            <Polyline points={dataToPoints(data1)} style={{ stroke: 'green' }} />
            <Squares points={dataToPoints(data2)} style={{ fill: 'purple' }} />
            <Polyline points={dataToPoints(data2)} style={{ stroke: 'purple' }} />
          </SubViz>
        </Viz>
      </div>
    )
  }
}
