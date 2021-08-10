<template>
  <el-row>
    <el-col :span="20" :offset="2">
      <table style='width: 100%;border: #42b983 2px solid'>
        <tr>
          <th width=20%>金库</th>
          <th width=11%>元素TVL</th>
          <th width=7%>保险库APY</th>
          <th width=5%>LPAPY</th>
          <th width=11%>流动性</th>
          <th width=9%>价钱</th>
          <th width=8%>固定年利率</th>
          <th width=18%>学期</th>
          <th width=11%>尾</th>
        </tr>
        <eran-table-item />
      </table>
    </el-col>

  </el-row>
</template>

<script>
import EranTableItem from "./EranTableItem";
export default {
  name: "EarnTable",
  components: {EranTableItem}
}
</script>

<style scoped>
th {
  padding: 7px;
}
</style>