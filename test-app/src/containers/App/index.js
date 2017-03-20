import React from 'react'
import { Viz, Polyline } from 'react-viz'

console.log(Viz, Polyline)

const data1 = [ 0.12, 0.65, 0.76, 0.73, 0.64, 0.76, 0.22, 0.32, 0.83, 0.18, 0.27 ]
const data2 = [ 0.15, 0.12, 0.22, 0.76, 0.73, 1.00, 0.64, 0.76, 0.32, 0.28, 0.29 ]

const style1 = { stroke: 'blue', strokeWidth: 5, fill: 'rgba(0, 0, 255, 0.1)', opacity: 0.5 }
const style2 = { stroke: 'red', strokeWidth: 5, fill: 'none', opacity: 0.5 }

function dataToPoints(data) {
  const interval = 1 / (data.length - 1)
  return data.map((d, i) => ({ x: interval * i, y: d }))
}

export default class App extends React.Component {
  render() {
    return (
      <div className="w-100 h-100 bg-black-10">
        <Viz margin={{ vert: 200, horiz: 200 }}>
          <Polyline points={dataToPoints(data1)} style={style1} closed/>
          <Polyline points={dataToPoints(data2)} style={style2}/>
        </Viz>
      </div>
    )
  }
}
