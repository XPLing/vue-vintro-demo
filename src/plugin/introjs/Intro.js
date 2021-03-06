import introCreate from './dom'
import hub from './util/hub'
import { DEFAULT_OPTIONS } from './conf'
import DIRECTIVES from './directive'
import mixin from './mixin'

let Vue = null
let cid = 0
const INSTANCE = []
// TODO to remove
// function formatterStepFromDirective (stepData, stepItems) {
//   const { el, value } = stepData
//   const options = value.split(',')
//   let step = options[0]
//   if (step) {
//     step = step.match(/^step\s(\d*)$/)
//     step = step && step[1]
//   }
//   step = ~~step || stepItems.length + 1
//   return {
//     el,
//     step
//   }
// }

export default class Intro {
  constructor (insertTarget, options) {
    this.options = Object.assign({}, new.target._OPTIONS, options)
    this.id = ++cid
    this.elm = null // intro dom
    this.introComp = null // intro dom component instance
    this.insertTarget = insertTarget // the parent dom for to insert intro dom
    this.currentStep = null // current step
    this.stepItems = [] // step collections
    this.introCreate()
  }

  init = () => {
    const hasId = INSTANCE.find(item => item.id === this.id)
    if (!hasId) INSTANCE.push(this)
  }

  start = () => {
    this.introComp.show()
    this.step(1)
  }

  step = (num) => {
    this.resetStepsStatus()
    const stepItem = this.stepItems.find(item => item.step === num)
    if (stepItem) {
      this.currentStep = stepItem
      this.showStep()
      this.changeIntroPosition()
    }
  }

  nextStep () {
    const length = this.stepItems.length
    if (this.currentStep.step >= length) throw new TypeError(`No found next step, max step is ${this.currentStep.step}.`)
    this.step(this.currentStep.step + 1)
  }

  prevStep () {
    if (this.currentStep.step < 1) throw new TypeError('No found previous step, min step is 1.')
    this.step(this.currentStep.step - 1)
  }

  resetStepsStatus () {
    // reset show status of current step
    const currentShowStep = document.body.querySelector('[data-intro].vintro-show')
    if (!currentShowStep) return false
    const className = currentShowStep.className.replace(/\s?vintro-show\s?/, '')
    currentShowStep.className = className
  }

  showStep () {
    const { el } = this.currentStep
    // add 'vintro-show' class to adjustment 'z-index' of the step target elemet
    el.className += ' vintro-show'
  }

  // set position of the intro dom according the current step dom
  changeIntroPosition = () => {
    const { el, step } = this.currentStep
    this.introComp.move(el, step, this)
  }

  close = () => {
    this.introComp.hide()
  }

  initSteps = () => {
    const { __introSteps } = this.options.introTargetComp
    if (__introSteps) {
      __introSteps.forEach(step => {
        this.addStep(step)
      })
    }
  }

  addStep = (step) => {
    this.stepItems.push(step)
    this.stepItems.sort(function (a, b) {
      return a.step - b.step
    })
  }

  create = (...args) => new Intro(...args)
  introCreate = () => {
    this.init()
    const comp = introCreate(this.options, this.insertTarget)
    this.elm = comp.$el
    this.introComp = comp
    if (this.options.introTargetComp) {
      this.initSteps()
    }
    return comp
  }

  clear () {
    let index
    let instance = INSTANCE.find((item, idx) => {
      if (item.id === this.id) {
        index = idx
        return item
      }
    })
    this.introComp && this.introComp.remove()
    this.introComp = null
    if (instance) {
      instance = null
      INSTANCE.splice(index, 1)
    }
  }
}
Intro._OPTIONS = {
  /* Next button label in tooltip box */
  nextLabel: 'Next &rarr;',
  /* Previous button label in tooltip box */
  prevLabel: '&larr; Back',
  /* Skip button label in tooltip box */
  skipLabel: 'Skip',
  /* Intro target Component */
  introTargetComp: null
}
Intro.install = function (_Vue, options) {
  options = Object.assign({}, DEFAULT_OPTIONS, options)
  Vue = _Vue
  Vue.prototype.$intro = (insertTarget, options) => {
    if (!(insertTarget instanceof HTMLElement)) {
      if (Object.prototype.toString.call(insertTarget) === '[object Object]') {
        options = insertTarget
      }
      insertTarget = document.body
    }
    return new Intro(insertTarget, options)
  }
  const HubComp = Vue.extend(hub)
  Vue.prototype.$introHub = new HubComp()
  Vue.directive('intro', DIRECTIVES.intro)
  Vue.directive('intro-scope', DIRECTIVES.scope)
  Vue.mixin(mixin)
}
