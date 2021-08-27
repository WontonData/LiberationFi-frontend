<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
          <div style="width: 17%">金库</div>
          <div style="width: 12%" >元素TVL</div>
          <div style="width: 10%" >保险库APY</div>
          <div style="width: 7%" >LPAPY</div>
          <div style="width: 12%" >流动性</div>
          <div style="width: 9%" >价钱</div>
          <div style="width: 8%" >固定年利率</div>
          <div style="width: 18%" >学期</div>
          <div style="width: 7%"></div>
      </el-col>
    </el-row>
    <eran-table-item v-for="(item, index) in tokenList" :key="index" :token="item" />
<!--    <eran-table-item />-->
  </div>


</template>

<script>
import EranTableItem from "./EranTableItem";
export default {
  name: "EarnTable",
  components: {EranTableItem},
  props: {
    tokenList: {
      type: Array
    }
  }
}
</script>

<style scoped>
.el-col div {
  padding: 7px;
  font-weight: 600;
}
.el-col {
  display: flex;
}
</style>