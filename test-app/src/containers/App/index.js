import React from 'react'
import { Viz, Polyline, Line, Squares, Square } from 'react-viz'
console.assert(Viz && Polyline && Line)

const data1 = [ 0.12, 0.65, 0.76, 0.73, 0.64, 0.76, 0.22, 0.32, 0.83, 0.18, 0.27 ]
const data2 = [ 0.15, 0.12, 0.22, 0.76, 0.73, 1.00, 0.64, 0.76, 0.32, 0.28, 0.29 ]

const style1 = { stroke: 'blue', strokeWidth: 5, fill: 'rgba(0, 0, 255, 0.1)', opacity: 0.5 }
const style2 = { stroke: 'red', strokeWidth: 5, fill: 'none', opacity: 0.5 }
const gridStyle = { stroke: 'lightgreen', strokeWidth: 5 }
const centerStyle = { fill: 'lightgreen' }

function dataToPoints(data) {
  const interval = 1 / (data.length - 1)
  return data.map((d, i) => ({ x: interval * i, y: d }))
}

export default class App extends React.Component {
  render() {
    return (
      <div className="w-100 h-100 bg-black-10">
        <Viz margin={{ vert: 200, horiz: 200 }}>
          <Line from={{ x: 0, y: 0 }} to={{ x: 0, y: 1 }} style={gridStyle} />
          <Line from={{ x: 0, y: 0 }} to={{ x: 1, y: 0 }} style={gridStyle} />
          <Line from={{ x: 0, y: 1 }} to={{ x: 1, y: 1 }} style={gridStyle} />
          <Line from={{ x: 1, y: 0 }} to={{ x: 1, y: 1 }} style={gridStyle} />
          <Polyline points={dataToPoints(data1)} style={style1} closed/>
          <Polyline points={dataToPoints(data2)} style={style2}/>
          <Squares points={dataToPoints(data2)} s={15} style={{ stroke: 'none', fill: 'tomato', opacity: 0.5 }}/>
          <Square x={0.5} y={0.5} s={10} style={centerStyle} />
        </Viz>
      </div>
    )
  }
}
