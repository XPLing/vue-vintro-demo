<template>
  <div class="home" ref="introWrapper" v-intro-scope>
    <img alt="Vue logo" src="../assets/logo.png" v-intro="{step:1, intro:'Step 1, Start'}">
    <button @click="start">start</button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  mounted () {
    this.introInstance = this.$intro({
      introTargetComp: this
    })
  },
  methods: {
    start () {
      this.introInstance.start()
    }
  },
  components: {
    HelloWorld
  }
}
</script>
