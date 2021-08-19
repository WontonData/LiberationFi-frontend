<template>
  <div>
    <el-row>
      <el-col :span="4" :offset="8">
        <div @click="changeTab('P')" :class="selectPools? 'trade-title select' : 'trade-title'"><h2>主池</h2>
        </div>
      </el-col>
      <el-col :span="4">
        <div @click="changeTab('T')" :class="selectPools? 'trade-title' : 'trade-title select'"><h2>收益池</h2></div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 35px;">
      <el-col>买卖代币或在 Element 本金池中提供流动性。</el-col>
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
      selectPools: true,
      tokenList: [
        {
          name: 'USDC v2',
          icon: 'USDC',
          token1: 'USDC',
          token2: 'ePyUSDC',
          token3: 'eYyUSDC',
          liquidity1: '5,378,950',
          liquidity2: '18,662',
          fixedAPR: '6.64',
          lpAPY1: '0.81',
          lpAPY2: '0.18',
          vaultAPY: '6.41',
          price1: '0.9851',
          price2: '0.0151',
          term: 'Oct 30, 2021'
        },
        {
          name: 'DAI v2',
          icon: 'DAI',
          token1: 'DAI',
          token2: 'ePyDAI',
          token3: 'eYyDAI',
          liquidity1: '5,304,503',
          liquidity2: '17,954',
          fixedAPR: '4.54',
          lpAPY1: '0.05',
          lpAPY2: '0.18',
          vaultAPY: '6.43',
          price1: '0.9919',
          price2: '0.0118',
          term: 'Oct 30, 2021'
        }
      ]
    }
  },
  methods: {
    changeTab(type) {
      this.selectPools = type == "P" ? true : false;
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
  left: 35%;
  width: 30%;
  height: 100%;
  border-bottom: 3.5px solid var(--purple-dark);
}
.trade-table {
  margin-top: 45px;
}
</style>