<template>
  <html>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
    <v-footer></v-footer>
    <upload-goods></upload-goods>
  </div>
  </html>
</template>

<script>

import header from './components/header/header'
import footer from './components/footer/footer.vue'
import UploadGoods from "./components/goods/upload/uploadGoods";

export default {
  components: {
    UploadGoods,
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
}

*{
  list-style-type: none;
}
</style>
