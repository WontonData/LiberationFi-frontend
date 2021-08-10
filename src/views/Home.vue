<template>
  <div class="home">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from "./home/header/Header";

export default {
  name: 'home',
  components: {Header}
}
</script>

<style>

</style>