<template>
  <div class="about">
    <Nav :menuData="menuData">
      <template #logo>
        <span class="logo"><a href="/">WontonData</a></span>
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
    <router-view :tokenList="tokenList" :xbbTokenList="xbbTokenList" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import Nav from "../components/nav/Nav";
import * as contract from "../network/conflux";
import {USDACCPool, USDAeP, USDAWeightPool} from "../network/conflux";

export default {
  name: "about",
  components: {
    Nav
  },
  computed: {
    ...mapState(["account", "EarnTokenList"]),
    accountCut() {
      return this.account.substring(0, 13) + "..." + this.account.substring(32, 42)
    },
  },
  data() {
    return {
      menuData: [
        {
          name: "Earn",
          routerPath: "/earn",
        },
        {
          name: "Trade",
          routerPath: "/pools",
        },
        {
          name: "Portfolio",
          routerPath: "/portfolio",
        },
        // {
        //   name: "Sign",
        //   routerPath: "/sign",
        // },
        // {
        //   name: "Tools",
        //   routerPath: "/tools",
        // },
      ],
      earnTokenList: [],
      xbbTokenList: [
        {
          name: 'cDAI',
          icon: 'cDAI',
          token1: 'cDAI',
          token2: 'loadding..',
          token3: 'loadding..',
          elementTVL: '208.489',
          vaultAPY: '16.99',
          lpAPY1: '0.81',
          lpAPY2: '0.24',
          liquidity1: '108.858',
          liquidity2: '993.043',
          price1: '0.9892',
          price2: '0.0143',
          fixedAPR: '6.64',
          term: 'loadding..',
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

        {
          name: 'cUSDC',
          icon: 'USDC',
          token1: 'USDC',
          token2: 'loadding..',
          token3: 'loadding..',
          elementTVL: '2046.489',
          vaultAPY: '11.7',
          lpAPY1: '0.81',
          lpAPY2: '0.24',
          liquidity1: '116.553',
          liquidity2: '987,042',
          price1: '0.9851',
          price2: '0.0151',
          fixedAPR: '4.72',
          term: 'loadding..',
          unlockTimestamp: '',
          interestToken: '',
          tranche: '',
          info: null,
        },
      ],
      tokenList: [
        {
          name: 'cDAI',
          icon: 'cDAI',
          token1: 'cDAI',
          token2: 'ePyvcDAI',
          token3: 'eYyvcDAI',
          elementTVL: '208.489',
          vaultAPY: '16.99',
          lpAPY1: '0.81',
          lpAPY2: '0.24',
          liquidity1: '108.858',
          liquidity2: '993.043',
          price1: '0.9892',
          price2: '0.0143',
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

        {
          name: 'cUSDC',
          icon: 'USDC',
          token1: 'cUSDC',
          token2: 'ePyvUSDC',
          token3: 'eYyvUSDC',
          elementTVL: '2046.489',
          vaultAPY: '11.7',
          lpAPY1: '0.81',
          lpAPY2: '0.24',
          liquidity1: '108.858',
          liquidity2: '993.043',
          price1: '0.9851',
          price2: '0.0151',
          fixedAPR: '4.72',
          term: '2021 年 10 月 30 日',
          unlockTimestamp: '',
          interestToken: '',
          tranche: '',
          uToken: contract.USDA,
          pToken: contract.USDAeP,
          yToken: contract.USDAeY,
          CCPool: contract.USDACCPool,
          WeightPool: contract.USDAWeightPool,
          poolId1: '0x8d54e208da62d09bcfe5ac132e842281daabef89000200000000000000000002',
          poolId2: '0x81a363ab4bb8f1455f346f01951443fff3d0986c000200000000000000000003'
        },
      ],
    }
  },
  mounted() {
    setTimeout(() => {
      this.earnTokenList = [
        this.EarnTokenList['cDAI'],
        this.EarnTokenList['cUSDC'],
      ]
      console.log(this.EarnTokenList)
      this.init();
      this.init2();
    }, 100);
  },
  methods: {
    ...mapActions(["getAccount"]),
    conn() {
      this.getAccount();
    },
    async init() {
// <<<<<<< HEAD
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
        this.tokenList[i].proportion = this.proportionDate(unlockTimestamp,1631376000*1000);
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

// =======
      
    },
    async init2() {
      let tNum = 0
      for (let i = 0; i < this.earnTokenList.length; i++) {
        let EarnToken = this.earnTokenList[i]
        for (let j=0;j<EarnToken.token.length; j++,tNum++){
          let token = EarnToken.token[j]
          console.log(this.xbbTokenList[tNum])
          console.log(tNum)
          // this.tokenList[tNum] = {}
          this.xbbTokenList[tNum].info = {
            ...EarnToken.info,
            token: EarnToken.info.token[j]
          }
          this.xbbTokenList[tNum].contract = {
            ...EarnToken,
            token: EarnToken.token[j]
          }
          // let token1 = await EarnToken.uToken.name();
          // this.xbbTokenList[tNum].token1 = token1;
          // this.xbbTokenList[tNum].name = token1;
          // this.xbbTokenList[tNum].icon = await EarnToken.uToken.symbol();

          // let res = await token.pToken.interestSupply();
          // console.log("token2",res)
          this.xbbTokenList[tNum].interestToken = await token.pToken.interestToken();

          const token2 = await token.pToken.symbol();
          this.xbbTokenList[tNum].token2 = token2;
          this.xbbTokenList[tNum].position = await token.pToken.position();
          // let speedbump = await this.Tranche.speedbump()
          // let symbol1 = await this.Tranche.symbol()
          this.xbbTokenList[tNum].underlying = await token.pToken.underlying();
          const unlockTimestamp = await token.pToken.unlockTimestamp();
          console.log("unlockTimestamp",unlockTimestamp)
          this.xbbTokenList[tNum].unlockTimestamp = unlockTimestamp[0];
          this.xbbTokenList[tNum].term = this.formatDate(unlockTimestamp);
          this.xbbTokenList[tNum].proportion = this.proportionDate(unlockTimestamp,token.start*1000);
          
          console.log("proportion-------------------proportion",unlockTimestamp,token.start*1000,this.proportionDate(unlockTimestamp,token.start*1000))
          this.xbbTokenList[tNum].restDate = this.restDate(unlockTimestamp);

          // let valueSupplied = await this.Tranche.valueSupplied()
          // let totalSupply1 = await token.pToken.totalSupply()
          // this.xbbTokenList[tNum].totalSupply1 = totalSupply1
          // let hitSpeedbump = await this.Tranche.hitSpeedbump()

          const token3 = await token.yToken.symbol();
          this.xbbTokenList[tNum].token3 = this.splitName(token3);
          // let symbol2 = await token.yToken.symbol();
          this.xbbTokenList[tNum].tranche = await token.yToken.tranche();
          // let totalSupply2 = await token.yToken.totalSupply();
          // this.xbbTokenList[tNum].totalSupply2 = totalSupply2
        }

      }
    },
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return (
        year +
        " 年 " +
        (String(month).length > 1 ? month : "0" + month) +
        " 月 " +
        (String(day).length > 1 ? day : "0" + day) +
        " 日 "
      );
    },

    proportionDate(timestamp,start) {
      const now = new Date().getTime();
      console.log(now, start)
      // const start = new Date("2021-8-1").getTime();
      return ((now - start) / (timestamp * 1000 - start)) * 100;
    },

    restDate(timestamp) {
      const now = new Date().getTime();

      return Math.floor((timestamp * 1000 - now) / (1000 * 60 * 60 * 24));
    },

    splitName(name) {
      const arr = name.split(" ");
      return arr[arr.length - 1];
    },
  },
};
</script>

<style>
.logo,
.address,
.icon {
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
  color: #6fedcf;
  background-color: rgba(134, 175, 209, 0.09);
  border-color: #6fedcf;
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
