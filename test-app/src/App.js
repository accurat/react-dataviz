import React from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { Viz, SubViz, buildReactiveMouse } from 'react-dataviz'
import { times, random } from 'lodash'
import { Polyline, polyPoints } from './components/Polyline'
import Animable from 'react-dataviz/Animable'

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

const AnimG = Animable('g')
const AnimCircle = Animable('circle')
const AnimPolyline = Animable('polyline')

export default class App extends React.Component {
  state = {
    data1: times(11, i => ({ x: i / 10, y: random(1, true) })),
    data2: times(11, i => ({ x: i / 10, y: random(1, true) })),
  }

  componentDidMount() {
    window.addEventListener('keydown', (ev) => { if (ev.key === ' ') this.forceUpdate() })

    window.setInterval(() => {
      this.setState({
        data1: times(11, i => ({ x: i / 10, y: random(1, true) })),
        data2: times(11, i => ({ x: i / 10, y: random(1, true) })),
      })
    }, 3000)
  }

  mouse = buildReactiveMouse()

  render() {
    const { data1, data2 } = this.state
    return (
      <div className="w-100 h-100 bg-black">
        <div className="absolute pa2 bottom-0 right-0 code">
          <MouseDisplay mouse={this.mouse} />
        </div>
        <Viz margin={{ vert: 50, horiz: 50 }} mouse={this.mouse}>
          <SubViz flipY from={[0, 0]} to={[0.5, 0.5]} margin={20} debug="#333">
            {rescale =>
              <AnimG>
                <AnimPolyline
                  points={polyPoints(data1, rescale, { closed: true })}
                  y={0}
                  stroke='none'
                  fill='rgba(0, 0, 255, 0.5)'
                  animable={{
                    points: polyPoints(data1.map(({ x, y }) => ({ x: 0, y })), rescale, { closed: true }),
                  }}
                />
              </AnimG>
            }
          </SubViz>
          <SubViz flipY from={[0.5, 0]} to={[1, 0.5]} margin={20} debug="#333">
            <Polyline points={data2} style={{ stroke: 'rgba(255, 0, 0, 0.6)', strokeWidth: 5, fill: 'none' }} />
          </SubViz>
          <SubViz flipY from={[0, 0.5]} to={[1, 1]} margin={20} debug="#333">
            {rescale =>
              <AnimG>
                {data1.map(d =>
                  <AnimCircle
                    key={d.x}
                    cx={rescale.x(d.x)}
                    cy={rescale.y(d.y)}
                    r={5}
                    fill="green"
                    animable={{
                      fillOpacity: { enter: 0.5, exit: 0 },
                      cx: rescale.x(0),
                      cy: rescale.y(0),
                    }}
                  />
                )}
              </AnimG>
            }
            {/*
            <Circles points={data1} style={{ fill: 'green' }} />
            <Polyline points={data1} style={{ stroke: 'green' }} />
            <Squares points={data2} style={{ fill: 'purple' }} />
            <Polyline points={data2} style={{ stroke: 'purple' }} /> */}
          </SubViz>
        </Viz>
      </div>
    )
  }
}
