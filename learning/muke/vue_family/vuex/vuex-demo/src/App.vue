<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>
      count:
      {{ count }}
    </h1>
    <button @click="countIncrease">点我啊</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
  methods: {
    countIncrease() {
      const v = 100;
      this.$store.commit('countIncrease', v);
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
