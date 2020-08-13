import introCreate from './dom'
import { DEFAULT_OPTIONS } from './conf'
import DIRECTIVES from './directive'

let Vue = null
let cid = 0
const INSTANCE = []

function formatterStepFromDirective (stepData, stepItems) {
  const { el, value } = stepData
  const options = value.split(',')
  let step = options[0]
  if (step) {
    step = step.match(/^step\s(\d*)$/)
    step = step && step[1]
  }
  step = ~~step || stepItems.length + 1
  return {
    el,
    step
  }
}

export default class Intro {
  constructor (insertTarget, options) {
    this.options = options
    this.id = ++cid
    this.elm = Intro.prototype.introDom
    this.insertTarget = insertTarget
    this.stepItems = []
  }

  init = () => {
    const hasId = INSTANCE.find(item => item.id === this.id)
    if (!hasId) INSTANCE.push(this)
  }

  start = () => {
    this.elm.show()
    this.step(1)
  }

  step = (num) => {
    const stepItem = this.stepItems.find(item => item.step === num)
    if (stepItem) {
      const { el } = stepItem
      this._changeIntroPosition(el)
    }
  }

  _changeIntroPosition = (el) => {
    const position = el.getBoundingClientRect()
    this.elm.move(position, el)
  }

  close = () => {
    this.elm.hide()
  }

  addStep = (step) => {
    step = formatterStepFromDirective(step)
    console.log('step')
    console.log(step)
    this.stepItems.push(step)
    this.stepItems.sort(function (a, b) {
      return a.step - b.step
    })
  }

  create = (...args) => new Intro(...args)

  clear () {
    let index
    const instance = INSTANCE.find((item, idx) => {
      if (item.id === this.id) {
        index = idx
        return item
      }
    })
    if (instance) {
      INSTANCE.splice(index, 1)
    }
  }
}

Intro.install = function (_Vue, options) {
  options = Object.assign({}, DEFAULT_OPTIONS, options)
  Vue = _Vue
  Vue.prototype.$intro = (insertTarget, options) => {
    if (!(insertTarget instanceof HTMLElement)) {
      insertTarget = document.body
    }
    return new Intro(insertTarget, options)
  }
  Intro.prototype.introDom = introCreate(options)
  Vue.directive('intro', DIRECTIVES.intro)
}
