<template>
  <el-menu
      router
      mode="horizontal"
      background-color="#cbc9ea"
      active-text-color="#665794"
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

<style >
.el-menu--horizontal>.el-menu-item.is-active {
  font-weight: 600;
}

</style>