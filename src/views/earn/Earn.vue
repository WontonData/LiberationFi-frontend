<template>
  <div>
    <h1>您的收益头寸的资本效率</h1>
    <p class="introduce">来自您的基础资产的 Mint Principal 和 Yield Tokens，
      通过提供流动性来提高您的 APY，并查看所有可用条款的当前 APY。</p>
    <earn-table class="earn-table" :token-list="tokenList"/>
  </div>
</template>

<script>
import EarnTable from "./child/EarnTable";

export default {
  name: "Earn",
  components: {EarnTable},
  data() {
    return {
      tokenList: [
        {
          name: 'USDC v2',
          icon: 'USDC',
          elementTVL: '5,759,150',
          vaultAPY: '6.41',
          lpAPY1: '0.81',
          lpAPY2: '0.24',
          liquidity1: '5,378,950',
          liquidity2: '17,028',
          price1: '0.9851',
          price2: '0.0151',
          fixedAPR: '6.64',
          term: '2021 年 10 月 30 日'
        },
        {
          name: 'USDC v2',
          icon: 'USDC',
          elementTVL: '5,759,150',
          vaultAPY: '6.41',
          lpAPY1: '0.81',
          lpAPY2: '0.24',
          liquidity1: '5,378,950',
          liquidity2: '17,028',
          price1: '0.9851',
          price2: '0.0151',
          fixedAPR: '6.64',
          term: '2021 年 10 月 30 日'
        }
      ]
    }
  }
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
p {
  color: #a7b6c2;
}

</style>