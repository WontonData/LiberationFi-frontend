<template>
  <div class="about">
    <Nav :menuData=menuData >
      <template #logo>
        <span class="logo">WontonData</span>
      </template>
      <template #account>
        <div v-if="account">
          <span class="address">{{accountCut}}</span>
        </div>
        <el-button v-else class="wallet" type="warning" plain @click="conn">Connect wallet</el-button>
<!--        <el-button type="warning" plain @click="test">test</el-button>-->
      </template>
      <template #more>
        <i class="icon el-icon-more"></i>
      </template>
    </Nav>
<!--    <button @click="tra">转账</button>-->
    <router-view :tokenList="tokenList"/>
  </div>

</template>

<script>
import {mapActions, mapState} from "vuex";

import Nav from "../components/nav/Nav";
export default {
  name: 'about',
  components: {
    Nav
    // HelloWorld
  },
  computed: {
    ...mapState(["account", "Tranche", "InterestToken", "USDA"]),
    accountCut(){
      return this.account.substring(0,13) + "..." + this.account.substring(32,42)
    },
  },
  data() {
    return {
      menuData: [
        {
          name: "Earn", routerPath: "/earn"
        },
        {
          name: "Trade", routerPath: "/pools"
        },
        {
          name: "Portfolio", routerPath: "/portfolio"
        },
        {
          name: "Sign", routerPath: "/sign"
        },
        {
          name: "Tools", routerPath: "/tools"
        },
      ],
      tokenList: [
        {
          name: 'USDC v2',
          icon: 'USDC',
          token1: 'USDC',
          token2: 'ePyvUSDC',
          token3: 'eYyvUSDC',
          elementTVL: '5,759,150',
          vaultAPY: '6.41',
          lpAPY1: '0.81',
          lpAPY2: '0.24',
          liquidity1: '5,378,950',
          liquidity2: '17,028',
          price1: '0.9851',
          price2: '0.0151',
          fixedAPR: '6.64',
          term: '2021 年 10 月 30 日',
          unlockTimestamp: '',
          interestToken: '',
          tranche: '',
        },
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 100)
  },
  methods: {
    ...mapActions(["getAccount"]),
    conn() {
      this.getAccount()
    },
    async init() {
      this.tokenList[0].poolId1 = '0x86ae2e0b6a0e68bd4108e271da10d7f4741fe04300020000000000000000000a'
      this.tokenList[0].poolId2 = '0x8dd0223177b135f650bd4828da0f46f0e99f4bc700020000000000000000000b'

      let token1 = await this.USDA.name()
      this.tokenList[0].token1 = token1
      this.tokenList[0].name = token1 + " v2"
      this.tokenList[0].icon = await this.USDA.symbol()

      let interestSupply = await this.Tranche.interestSupply()
      this.tokenList[0].interestToken = await this.Tranche.interestToken()
      const token2 = await this.Tranche.name()
      this.tokenList[0].token2 = "eP:" + this.splitName(token2)
      this.tokenList[0].position = await this.Tranche.position()
      // let speedbump = await this.Tranche.speedbump()
      // let symbol1 = await this.Tranche.symbol()
      this.tokenList[0].underlying = await this.Tranche.underlying()
      const unlockTimestamp = await this.Tranche.unlockTimestamp()
      this.tokenList[0].unlockTimestamp = unlockTimestamp[0]
      this.tokenList[0].term = this.formatDate(unlockTimestamp)
      this.tokenList[0].proportion = this.proportionDate(unlockTimestamp)
      this.tokenList[0].restDate = this.restDate(unlockTimestamp)

      // let valueSupplied = await this.Tranche.valueSupplied()
      // let totalSupply1 = await this.Tranche.totalSupply()
      // let hitSpeedbump = await this.Tranche.hitSpeedbump()

      const token3 = await this.InterestToken.name()
      this.tokenList[0].token3 = "eY:" + this.splitName(token3)
      let symbol2 = await this.InterestToken.symbol()
      this.tokenList[0].tranche = await this.InterestToken.tranche()
      let totalSupply2 = await this.InterestToken.totalSupply()


    },
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return year + ' 年 ' + (String(month).length > 1 ? month : '0' + month) + ' 月 ' +
          (String(day).length > 1 ? day : '0' + day) + ' 日 '
    },

    proportionDate(timestamp) {
      const now = new Date().getTime();
      const start = new Date('2021-8-1').getTime()
      return (now-start)/(timestamp*1000-start)*100
    },

    restDate(timestamp) {
      const now = new Date().getTime();
      return Math.floor((timestamp*1000 - now)/(1000*60*60*24))
    },

    splitName(name) {
      const arr = name.split(" ")
      return arr[arr.length-1];
    },

  }
}
</script>

<style >
.logo , .address, .icon{
  font-size: 24px;
  display: flex;
  height:60px;
  letter-spacing: 1px;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
}
.address {
  font-size: 17px;

}
.icon {
  margin-top: 20px;
}
.about {
  padding-bottom: 50px;
}
</style>

<style>
.wallet {
  margin-top: 10px!important;
}
.el-button--warning.is-plain {
  color: #6fedcf!important;
  background-color: rgba(134, 175, 209, 0.09) !important;
  border-color: #6fedcf!important;
  font-weight: 600;
}
.el-button--warning.is-plain:hover {
  color:  var(--purple-dark-shade)!important;
  background: #6fedcf!important;
  border-color: #6fedcf!important;
}
.left {
  float: left;
}
.right {
  float: right;
}
</style>
