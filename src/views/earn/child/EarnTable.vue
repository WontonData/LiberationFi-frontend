<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2" class="center_flex_container">
          <div f-w="3">Vault</div>
          <div f-w="2">TVL</div>
          <div f-w="2">Vault APY</div>
          <div f-w="2">LP APY</div>
          <div f-w="2">Liquidity</div>
          <div f-w="2">Price</div>
          <div f-w="2">Fixed APR</div>
          <div f-w="2">Term</div>
          <div f-w="2"></div>
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