<template>
  <div>
    <Nav/>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from "@/components/main/navigation/nav";

export default {
  name: "categoryList",
  components: {Nav},
}
</script>

<style scoped>

</style>