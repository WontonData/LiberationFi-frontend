<template>
  <!--  <div>-->
  <el-row>
    <el-col :span="4">
      <slot name="logo"/>
    </el-col>
    <el-col :span="4" :offset="11">
      <slot name="advanced"/>
    </el-col>
    <el-col :span="3">
      <slot name="account"/>
    </el-col>
    <el-col :span="2">
      <slot name="more"/>
    </el-col>
  </el-row>
</template>

<script>
import Menu from "../menu/Menu";

export default {
  name: "NavSave",
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