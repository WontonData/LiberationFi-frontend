<template>
  <el-menu
      router
      mode="horizontal"
      background-color="#232e38"
      text-color="#fff"
      active-text-color="#d7dcef"
      :default-actie="$route.path">
    <el-menu-item v-for="item in menuData" :key="item.name" :index="item.routerPath">
      <template slot="title">
        <i :class=item.icon style="color: #d7dcef" ></i>
        {{ item.name }}
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {

    }
  },
  props: {
    menuData: {
      type: Array
    }
  }
}
</script>

<style scoped>


</style>