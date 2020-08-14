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
          .vintro-tootip-arrow
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
      step: 1
    }
  },
  directives: {
    clickOut: clickOut
  },
  methods: {
    move (position, targetElm, step) {
      const {
        // bottom,
        left,
        // right,
        top,
        width,
        height
      } = position
      this.step = step
      const helperStyle = Object.assign(this.helperStyle, {
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px'
      })
      this.helperStyle = helperStyle
      const tootipStyle = Object.assign(this.tootipStyle, {
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px'
      })
      this.tootipStyle = tootipStyle
      console.log('targetElm')
      console.log(targetElm)
    },
    show () {
      this.isShow = true
    },
    hide () {
      this.isShow = false
    }
  }
}
</script>

<style lang="stylus">
  @import "index.styl"
</style>
