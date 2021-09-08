<template>
  <el-menu
      router
      mode="horizontal"
      background-color="rgba(0,0,0,0)"
      active-text-color="#c66eff"
      text-color="#ffffff"
      :default-actie="$route.path">
    <el-menu-item v-for="item in menuData" :key="item.name" :index="item.routerPath">
      <template slot="title">
        <i :class=item.icon style="color: #6fedcf" ></i>
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

<style >
.el-menu--horizontal>.el-menu-item.is-active {
  font-weight: 600;
}
.el-menu--horizontal>.el-menu-item:hover {
  background-color: rgba(26, 35, 62, 0.6) !important;
}
.el-menu-item {
  font-size: 18px;
  font-weight: 700;
}
</style>
