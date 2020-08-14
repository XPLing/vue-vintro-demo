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
    this.currentStep = null
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
    this.resetStepsStatus()
    const stepItem = this.stepItems.find(item => item.step === num)
    if (stepItem) {
      this.currentStep = stepItem
      this.showStep()
      this._changeIntroPosition()
    }
  }

  resetStepsStatus () {
    // reset show status of current step
    const currentShowStep = document.body.querySelector('[data-intro].vintro-show')
    if (!currentShowStep) return false
    console.log(currentShowStep.className)
    const className = currentShowStep.className.replace(/\s?vintro-show\s?/, '')
    console.log(className)
    currentShowStep.className = className
  }

  showStep () {
    const { el } = this.currentStep
    // add 'vintro-show' class to adjustment 'z-index' of the step target elemet
    el.className += ' vintro-show'
  }

  _changeIntroPosition = () => {
    const { el, step } = this.currentStep
    const position = el.getBoundingClientRect()
    this.elm.move(position, el, step)
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
