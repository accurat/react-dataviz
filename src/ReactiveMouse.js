import { observable } from 'mobx'

export default class ReactiveMouse {
  @observable x = null
  @observable y = null
  @observable click = false
  @observable rightClick = false
  @observable middleClick = false
}
