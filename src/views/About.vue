<template>
  <div class="about" v-intro-scope>
    <h1 v-intro="{intro:'Step 1, About welcome', step: 1}">This is an about page</h1>
    <h2 v-intro="{intro:'Step 2, Content 1', step: 2}">About Content 1</h2>
    <h3 v-intro="{intro:'Step 3, Content 2', step: 3}">About Content 2</h3>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'About',
  mounted () {
    this.introInstance = this.$intro({
      introTargetComp: this
    })
    this.start()
  },
  methods: {
    start () {
      this.introInstance.start()
    }
  }
}
</script>
