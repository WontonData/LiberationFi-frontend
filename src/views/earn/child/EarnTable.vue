<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
          <div style="width: 17%">Vault</div>
          <div style="width: 12%" >TVL</div>
          <div style="width: 10%" >Vault APY</div>
          <div style="width: 7%" >LP APY</div>
          <div style="width: 12%" >Liquidity</div>
          <div style="width: 9%" >Price</div>
          <div style="width: 8%" >Fixed APR</div>
          <div style="width: 18%" >Term</div>
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