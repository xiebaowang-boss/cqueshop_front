<template>
  <div class="inner-container">
    <v-nav></v-nav>
    <banner></banner>
    <hot></hot>
    <brand></brand>
    <news></news>
  </div>

</template>
<style lang="stylus" rel="stylesheet/stylus">
.inner-container
  width: 1220px
  margin: 0 auto

</style>
<script>
import vNav from './navigation/nav.vue'
import banner from './banner/banner.vue'
import news from './panel/news/news.vue'
import hot from './panel/hot/hot.vue'
import brand from './panel/brand/brand.vue'

export default {
  data() {
    return {}
  },
  components: {
    vNav,
    banner,
    news,
    hot,
    brand,
  }
}
</script>
