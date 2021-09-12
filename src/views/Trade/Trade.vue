<template>
  <div>
    <el-row>
      <el-col :span="4" :offset="8">
        <div @click="changeTab('P')" :class="selectPools? 'trade-title select' : 'trade-title'"><h2>Principal Pools</h2>
        </div>
      </el-col>
      <el-col :span="4">
        <div @click="changeTab('T')" :class="selectPools? 'trade-title' : 'trade-title select'"><h2>Yield Pools</h2></div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 35px;">
      <el-col>Buy and sell principal tokens or provide liquidity in principal pools.</el-col>
    </el-row>

    <p-trade-table v-if="selectPools" class="trade-table" :token-list="tokenList" />

    <y-trade-table v-else class="trade-table" :token-list="tokenList" />



  </div>
</template>

<script>
import PTradeTable from "./child/PTradeTable";
import YTradeTable from "./child/YTradeTable";
export default {
  name: "Trade",
  components: {YTradeTable, PTradeTable},
  data() {
    return {
      selectPools: false,

    }
  },
  mounted() {
    this.getData()
  },
  props: {
    tokenList: {
      type: Array
    }
  },
  methods: {
    changeTab(type) {
      this.selectPools = type === "P";
    },
    getData() {
      this.selectPools = this.$route.params.selectPools
    }
  }
}
</script>

<style scoped>
div {
  /*color: #a7b6c2;*/
}
h2 {
  /*color: white;*/
}
.el-col {
  position: relative;
}
.trade-title {
  font-family: Segoe UI;
  padding-bottom: 7px;
}
.select::before {
  content: "";
  position: absolute;
  top: 5%;
  left: 20%;
  width: 60%;
  height: 100%;
  border-bottom: 3.5px solid var(--purple-dark);
}
.trade-table {
  margin-top: 45px;
}
</style>
