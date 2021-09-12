<template>
  <div class="about">
    <Nav :menuData=menuData>
      <template #logo>
        <span class="logo">WontonData</span>
      </template>
      <template #account>
        <div v-if="account">
          <span class="address">{{ accountCut }}</span>
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
import * as contract from "../network/conflux";
import {USDACCPool, USDAeP, USDAWeightPool} from "../network/conflux";
// import {USDA} from "../network/conflux";


export default {
  name: 'about',
  components: {
    Nav
  },
  computed: {
    ...mapState(["account",]),
    accountCut() {
      return this.account.substring(0, 13) + "..." + this.account.substring(32, 42)
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
          name: 'USDC',
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
          uToken: contract.USDA,
          pToken: contract.USDAeP,
          yToken: contract.USDAeY,
          CCPool: contract.USDACCPool,
          WeightPool: contract.USDAWeightPool,
          poolId1: '0x86ae2e0b6a0e68bd4108e271da10d7f4741fe04300020000000000000000000a',
          poolId2: '0x8dd0223177b135f650bd4828da0f46f0e99f4bc700020000000000000000000b'
        },
        {
          name: 'cDAI',
          icon: 'cDAI',
          token1: 'cDAI',
          token2: 'ePyvcDAI',
          token3: 'eYyvcDAI',
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
          uToken: contract.cDAI,
          pToken: contract.cDAIeP,
          yToken: contract.cDAIeY,
          CCPool: contract.cDAICCPool,
          WeightPool: contract.cDAIWeightPool,
          poolId1: '0x8b1940e27a659a861abd772d8d62f704afbbed61000200000000000000000000',
          poolId2: '0x880010b8db6c2b374e6c5ce477c903a0fdaaa90f000200000000000000000001'
        },
      ],
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
      for (let i = 0; i < 2; i++) {

        this.tokenList[i].icon = await this.tokenList[i].uToken.symbol()

        let interestSupply = await this.tokenList[i].pToken.interestSupply()
        this.tokenList[i].interestToken = await this.tokenList[i].pToken.interestToken()
        const token2 = await this.tokenList[i].pToken.name()
        console.log(token2)
        this.tokenList[i].token2 = "p" + this.splitName(token2)
        this.tokenList[i].position = await this.tokenList[i].pToken.position()
        // let speedbump = await this.Tranche.speedbump()
        // let symbol1 = await this.Tranche.symbol()
        this.tokenList[i].underlying = await this.tokenList[i].pToken.underlying()
        const unlockTimestamp = await this.tokenList[i].pToken.unlockTimestamp()
        this.tokenList[i].unlockTimestamp = unlockTimestamp[0]
        this.tokenList[i].term = this.formatDate(unlockTimestamp)
        this.tokenList[i].proportion = this.proportionDate(unlockTimestamp)
        this.tokenList[i].restDate = this.restDate(unlockTimestamp)

        // let valueSupplied = await this.Tranche.valueSupplied()
        // let totalSupply1 = await this.Tranche.totalSupply()
        // let hitSpeedbump = await this.Tranche.hitSpeedbump()

        const token3 = await this.tokenList[i].yToken.name()
        this.tokenList[i].token3 = "y" + this.splitName(token3)
        let symbol2 = await this.tokenList[i].yToken.symbol()
        this.tokenList[i].tranche = await this.tokenList[i].yToken.tranche()
        let totalSupply2 = await this.tokenList[i].yToken.totalSupply()

      }

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
      return (now - start) / (timestamp * 1000 - start) * 100
    },

    restDate(timestamp) {
      const now = new Date().getTime();
      return Math.floor((timestamp * 1000 - now) / (1000 * 60 * 60 * 24))
    },

    splitName(name) {
      const arr = name.split(" ")
      return arr[arr.length - 1];
    }
  }
}
</script>

<style>
.logo, .address, .icon {
  font-size: 24px;
  display: flex;
  height: 60px;
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
  margin-top: 10px !important;
}

.el-button--warning.is-plain {
  color: #6fedcf !important;
  background-color: rgba(134, 175, 209, 0.09) !important;
  border-color: #6fedcf !important;
  font-weight: 600;
}

.el-button--warning.is-plain:hover {
  color: var(--purple-dark-shade) !important;
  background: #6fedcf !important;
  border-color: #6fedcf !important;
}

.left {
  float: left;
}

.right {
  float: right;
}
</style>
