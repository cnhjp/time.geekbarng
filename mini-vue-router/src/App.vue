<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  <a href="#">click me</a>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    onMounted(() => {
      window.addEventListener('hashchange', (e: Event) => {
        console.log(1)
        console.log(e)
      })
      window.addEventListener('popstate', (e: Event) => {
        console.log(2)
        console.log(e)
      })
    })
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
