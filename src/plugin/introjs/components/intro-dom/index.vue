<template lang="pug">
  transition(name="fade")
    .c-vintro(v-show="isShow")
      .vintro-overlay(v-click-out="hide")
      .vintro-helper(:style="helperStyle")
      .vintro-tootip-layer(:style="helperStyle")
        i.vintro-step {{step}}
        .vintro-tootip
          .vintro-tootip-text 'step 1'
          .vintro-tootip-bullets
          .vintro-tootip-arrow.top
          .vintro-tootip-buttons
            button.vintro-tootip-button Skip
</template>

<script>
import clickOut from '../../directive/clickOut'

export default {
  name: 'CIntro',
  data () {
    return {
      isShow: false,
      helperStyle: {},
      tootipStyle: {},
      step: 1,
      currentTarget: null
    }
  },
  created () {
    this.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    this.recordTragetOldValue = {}
  },
  directives: {
    clickOut: clickOut
  },
  methods: {
    move (targetElm, step, introInstance) {
      // remove resize listener on previous step element
      if (this.oldTarget) this.removeResizeListener(this.oldTarget)
      // add resize listener on current step element
      // to avoid appear scrollbar cause to inaccurate width calculation of the target element
      this.addResizeListener(targetElm)
      this.step = step
      this.currentTarget = targetElm
      console.log('move')
      this.setPosition()
      this.oldTarget = targetElm
      if (!this.introInstance) this.introInstance = introInstance
    },
    addResizeListener (targetElm) {
      console.log(targetElm)
      this.resizeHandle = this.resize
      this.observer = new MutationObserver((mutations) => {
        const width = getComputedStyle(targetElm).getPropertyValue('width')
        const height = getComputedStyle(targetElm).getPropertyValue('height')
        console.log('mutations')
        console.log(mutations)
        if (width === this.recordTragetOldValue.width && height === this.recordTragetOldValue.height) return
        this.recordTragetOldValue = {
          width,
          height
        }
        this.resizeHandle()
      })
      this.observer.observe(targetElm, { attributes: true, childList: true, subtree: true })
      // targetElm.addEventListener('resize', this.resizeHandle)
    },
    resize (e) {
      console.log('resize cont')
      console.log(e.target)
      this.setPosition()
    },
    setPosition () {
      if (!(this.isShow && this.currentTarget)) return false
      const {
        left,
        top,
        width,
        height
      } = this.currentTarget.getBoundingClientRect()
      const helperStyle = Object.assign({}, this.helperStyle, {
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px'
      })
      this.helperStyle = helperStyle
      this.$set(this.$data, 'helperStyle', helperStyle)
      const tootipStyle = Object.assign({}, this.tootipStyle, {
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px'
      })
      this.tootipStyle = tootipStyle
    },
    removeResizeListener (targetElm) {
      // targetElm.removeEventListener('resize', this.resizeHandle)
      this.observer.disconnect()
      this.observer.takeRecords()
      this.observer = null
    },
    show () {
      this.isShow = true
      // this.addResizeListener(document.body)
    },
    hide () {
      this.isShow = false
      this.removeResizeListener(this.oldTarget)
      this.removeResizeListener(this.currentTarget)
      // this.removeResizeListener(document.body)
      this.oldTarget = null
    }
  }
}
</script>

<style lang="stylus">
  @import "index.styl"
</style>
