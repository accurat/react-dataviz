import { observable, computed } from 'mobx'

export default class ReactiveMouse {
  constructor(scales) {
    this.scales = scales
  }

  @observable x = null
  @observable y = null
  @observable click = false
  @observable rightClick = false
  @observable middleClick = false

  @computed get sx() {
    return this.scales.inverse.x(this.x)
  }
  @computed get sy() {
    return this.scales.inverse.y(this.y)
  }
}
