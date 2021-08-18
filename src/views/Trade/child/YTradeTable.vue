<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <div style="width: 25%">水池</div>
        <div style="width: 11%" >流动性</div>
<!--        <div style="width: 10%" >Fixed APR</div>-->
        <div style="width: 6%" >LP APY</div>
        <div style="width: 11%" >保险库APY</div>
        <div style="width: 11%" >价钱</div>
        <!--        <div style="width: 8%" >Term</div>-->
        <div style="width: 25%" >学期</div>
        <div style="width: 11%"></div>
      </el-col>
    </el-row>
    <y-trade-table-item v-for="(item, index) in tokenList" :key="index" :token="item" />
    <!--    <p-trade-table-item />-->
  </div>
</template>

<script>
import YTradeTableItem from "./YTradeTableItem";
export default {
  name: "YTradeTable",
  components: {YTradeTableItem},
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