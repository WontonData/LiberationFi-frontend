<template>
  <!--  <div>-->
  <el-row>
    <el-col :span="4">
      <slot name="logo"/>
    </el-col>
    <el-col :span="16">
      <Menu :menuData=menuData />
    </el-col>
    <el-col :span="1">
      <slot name="account"/>
    </el-col>
    <el-col :span="3">
      <slot name="more"/>
    </el-col>
  </el-row>
</template>

<script>
import Menu from "../menu/Menu";

export default {
  name: "Nav",
  components: {
    Menu
  },
  props: {
    menuData: {
      type: Array
    }
  }
}
</script>

<style scoped>
.el-row {
  padding-top: 10px;
}
</style>