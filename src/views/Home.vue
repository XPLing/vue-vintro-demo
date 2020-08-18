<template>
  <div class="home" ref="introWrapper">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="start">start</button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  created () {
    // this.introInstance = this.$intro(this.$refs.introWrapper)
  },
  methods: {
    start () {
      // this.introInstance.start()
    }
  },
  components: {
    HelloWorld
  }
}
</script>
