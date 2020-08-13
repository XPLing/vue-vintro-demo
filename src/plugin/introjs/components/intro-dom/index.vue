<template lang="pug">
  .c-intro(:style="wrapperStyle")
    .overlay
    .intro-helper(:style="helperStyle")
    .intro-tootip(:style="helperStyle")

</template>

<script>
export default {
  name: 'CIntro',
  data () {
    return {
      wrapperStyle: 'display:none;',
      helperStyle: {
        position: 'absolute',
        backgroundColor: '#fff',
        opacity: '0.8'
      },
      tootipStyle: {
        position: 'absolute'
      }
    }
  },
  methods: {
    move (position, targetElm) {
      const {
        // bottom,
        left,
        // right,
        top,
        width,
        height
      } = position
      this.helperStyle = Object.assign(this.helperStyle, {
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px'
        // right: right + 'px',
        // bottom: bottom + 'px'
      })
    },
    show () {
      this.wrapperStyle = 'display:block;'
    },
    hide () {
      this.wrapperStyle = 'display:none;'
    }
  }
}
</script>

<style scoped lang="stylus">
  .c-intro
    .overlay
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      background-color #000
      opacity 0.8
</style>
