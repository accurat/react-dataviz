import React from 'react'
import { observer } from 'mobx-react'
import { Viz, Polyline, Line, Squares, Square, Circles } from 'react-viz'

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

let mouseDisplayRerender = null
const MouseDisplay = @observer class MouseDisplay extends React.Component {
  componentDidMount() {
    mouseDisplayRerender = mouse => {
      this.setState({ ...mouse })
      this.forceUpdate()
    }
  }

  render() {
    return (
      <table>
        <tbody>
          {Object.entries(this.state || {}).filter(([k, v]) => ['x', 'y', 'sx', 'sy'].includes(k)).map(([k, v]) =>
            <tr key={k}>
              <td className="w2 blue">{k}</td>
              <td className="w4">{v.toFixed(2)}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default class App extends React.Component {
  componentDidMount() {
    window.setTimeout(() => {
      this.forceUpdate()
    }, 1000)
  }

  render() {
    console.log('App render')
    return (
      <div className="w-100 h-100 bg-black-10">
        <div className="absolute pa2 bottom-0 right-0 code">
          <MouseDisplay />
        </div>
        <Viz margin={{ vert: 200, horiz: 200 }} onMouseMove={mouseDisplayRerender || (d => {})}>
          <g>
            <Line from={{ x: 0, y: 0 }} to={{ x: 0, y: 1 }} style={gridStyle} />
            <Line from={{ x: 0, y: 0 }} to={{ x: 1, y: 0 }} style={gridStyle} />
            <Line from={{ x: 0, y: 1 }} to={{ x: 1, y: 1 }} style={gridStyle} />
            <Line from={{ x: 1, y: 0 }} to={{ x: 1, y: 1 }} style={gridStyle} />
            <Square x={0.5} y={0.5} s={10} style={centerStyle} />
          </g>
          <Polyline points={dataToPoints(data1)} style={style1} closed />
          <Circles points={dataToPoints(data1)} style={{ stroke: 'none', fill: 'steelblue', opacity: 0.5 }} />
          <Polyline points={dataToPoints(data2)} style={style2} />
          <Squares points={dataToPoints(data2)} style={{ stroke: 'none', fill: 'yellow', opacity: 0.5 }} />
        </Viz>
      </div>
    )
  }
}
