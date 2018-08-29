# Accurat React Dataviz

Collection of data visualization oriented React components used [@accurat](http://www.accurat.it/), built on top of vx, with the addition of some extra goodies.

The purpose is to provide ready-to-use, easily customizable dataviz components to generate beautiful charts.

## Install

`yarn add react-dataviz`

## Usage

```js
import { Viz, SubViz, buildReactiveMouse } from "react-dataviz"
import { AreaClosed, LinePath } from "react-dataviz/shape" // as you would do with @vx/shape
```

and then in your `render` function:

```js
<Viz margin={{ vert: 50, horiz: 50 }} mouse={this.mouse}>
  <SubViz flipY from={[0, 0]} to={[0.5, 0.5]} margin={20} debug="#333">
    <AreaClosed
      data={normalizedDataToXYPoints(data)}
      style={{ stroke: "none", fill: "blue" }}
    />
  </SubViz>
</Viz>
```

where `data` is an array of normalized values in a range from `0` to `1` like this:

```
const data = [0.12, 0.65, 0.76, 0.73, 0.64, 0.76, 0.22, 0.32, 0.83, 0.18, 0.27]`
```

You can see a simple usage example in the `/test-app` folder.

## Development 

Run `yarn start` from the root directory to start the test app.

Running `yarn build` from `react-dataviz/` will output production ready files in `react-dataviz/dist/`