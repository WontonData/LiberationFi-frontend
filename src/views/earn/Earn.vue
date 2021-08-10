<template>
  <div>
    <h1>您的收益头寸的资本效率</h1>
    <p class="introduce">来自您的基础资产的 Mint Principal 和 Yield Tokens，
      通过提供流动性来提高您的 APY，并查看所有可用条款的当前 APY。</p>
    <earn-table class="earn-table"/>
  </div>
</template>

<script>
import EarnTable from "./child/EarnTable";

export default {
  name: "Earn",
  components: {EarnTable}
}
</script>

<style scoped>
.introduce {
  color: #a7b6c2;
  font-weight: 400;
  width: 40%;
  margin: 15px auto;
  line-height: 25px;
}
.earn-table {
  margin-top: 45px;
}
div {
  color: #a7b6c2;
}
h1 {
  color: white;
}
</style>