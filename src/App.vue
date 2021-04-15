<template>
  <html>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
  </html>
</template>

<script>

import header from './components/header/header'
import footer from './components/footer/footer.vue'

export default {
  components: {
    'v-header': header,
    'v-footer': footer,
  }
}

</script>

<style>
#app {
  background-color: rgb(237, 237, 237);
  margin: 0px;
  padding: 0px;
  width: 100%;
}

*{
  list-style-type: none;
}
</style>
