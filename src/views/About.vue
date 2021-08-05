<template>
  <div>
    <div id="nav">
      <router-link to="/earn">earn</router-link> |
      <router-link to="/pools">pools</router-link>
      <router-link to="/pools/123">Trade</router-link>
      <router-link to="/portfolio">portfolio</router-link>
    </div>
    <router-view/>
  </div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import web from "../network/web";

export default {
  name: 'about',
  components: {
    // HelloWorld
  }
}
</script>