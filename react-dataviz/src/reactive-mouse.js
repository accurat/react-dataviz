import { observable, action, computed, autorun, toJS } from 'mobx'

const LEFT_BUTTON = 1
const RIGHT_BUTTON = 2
const MIDDLE_BUTTON = 4

class ReactiveMouse {
  @observable x = null
  @observable y = null

  @observable sx = null
  @observable sy = null

  @computed get click() {
    return this.clickLeft
  }
  @observable clickLeft = false
  @observable clickRight = false
  @observable clickMiddle = false

  @action fromEvent(event, rescale = null) {
    this.x = event.clientX
    this.y = event.clientY
    if (rescale) {
      this.sx = rescale.inverse.x(this.x)
      this.sy = rescale.inverse.y(this.y)
    }
    this.clickLeft = (event.buttons & LEFT_BUTTON) > 0
    this.clickRight = (event.buttons & RIGHT_BUTTON) > 0
    this.clickMiddle = (event.buttons & MIDDLE_BUTTON) > 0
  }
}

export function buildReactiveMouse(...args) {
  const mouse = new ReactiveMouse()
  if (args.includes('debug'))
    autorun(() => {
      console.debug(toJS(mouse))
    })
  return mouse
}
