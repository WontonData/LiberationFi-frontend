<template>
  <el-card shadow="always">
    <el-row style="padding-top: 0">
      <el-col :span="24">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" >

          <el-tab-pane name="buy">
            <span slot="label"><i class="el-icon-sold-out"></i> buy</span>
            <pool-buy
                :token="token"
                :token-name="tokenName"
                :YPBalance="YPBalance"
                :tokenBalance="tokenBalance"
                :type="type"
                @calculate="calculate"
            />
          </el-tab-pane>

          <el-tab-pane name="sell">
            <span slot="label"><i class="el-icon-sell"></i> sell</span>
            <pool-sell
                :token="token"
                :token-name="tokenName"
                :YPBalance="YPBalance"
                :tokenBalance="tokenBalance"
                :type="type"
                @calculate="calculate"
            />
          </el-tab-pane>

          <el-tab-pane name="add">
            <span slot="label"><i class="el-icon-s-claim"></i> Add LP</span>
            <pool-add
                :token="token"
                :token-name="tokenName"
                :YPBalance="YPBalance"
                :tokenBalance="tokenBalance"
                :type="type"
                @calculate="calculate"
            />
          </el-tab-pane>

          <el-tab-pane name="remove">
            <span slot="label"><i class="el-icon-s-release"></i> Remove LP</span>
            <pool-remove
                :token="token"
                :token-name="tokenName"
                :LPBalance="LPBalance"
                :type="type"
                @calculate="calculate"
            />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="22" :offset="1" >
        <el-button v-if="account && activeName==='buy'" @click="mint" class="mint" type="warning" plain>Buy</el-button>
        <el-button v-else-if="account && activeName==='sell'" @click="mint" class="mint" type="warning" plain>Sell</el-button>
        <el-button v-else-if="account && activeName==='add'" @click="mint" class="mint" type="warning" plain>Add liquidity</el-button>
        <el-button v-else-if="account && activeName==='remove'" @click="mint" class="mint" type="warning" plain>Remove liquidity</el-button>
        <el-button v-else disabled class="mint" type="warning" plain>Connect wallet</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import ItemText from "../txt/ItemText";
import {mapState} from "vuex";
import PoolBuy from "../../views/pools/child/PoolBuy";
import PoolSell from "../../views/pools/child/PoolSell";
import PoolAdd from "../../views/pools/child/PoolAdd";
import PoolRemove from "../../views/pools/child/PoolRemove";
import {conflux} from "../../network/conflux";

export default {
  name: "TradeCard",
  components: {PoolRemove, PoolAdd, PoolSell, PoolBuy, ItemText},
  computed: {
    ...mapState(["account", "Tranche", "InterestToken", "USDA"]),
  },
  data() {
    return {
      YPContract: null,
      tokenNumber: 0.00,
      YPNumber: 0.00,

      YPBalance: 0.00,
      tokenBalance: 0.00,
      LPBalance: 0.00,

      activeName: 'buy',
      limit: 0.00
    }
  },
  props: {
    token: {
      type: Object
    },
    tokenName: {
      type: String
    },
    type: {
      type: String
    }
  },
  created() {
    if (this.type === 'Y') {
      this.YPContract = this.token.yToken
    } else {
      this.YPContract = this.token.pToken
    }
    //LP Token
    this.YPContract.balanceOf(this.account).then(res => {
      this.YPBalance = (res.toString()/1000000000000000000).toFixed(2)
    })
    this.token.uToken.balanceOf(this.account).then(res => {
      this.tokenBalance = (res.toString()/1000000000000000000).toFixed(2)
    })
  },
  methods: {

    calculate(tokenNumber, YPNumber) {
      console.log(tokenNumber, YPNumber)
      this.tokenNumber = tokenNumber*1
      this.YPNumber = YPNumber*1
    },
    //类型 主币数量 收益币数量
    mint() {
      console.log(this.activeName)
      this.$emit("mint", this.activeName, this.tokenNumber, this.YPNumber)
    },
    handleClick(tab, event) {
      this.YPNumber = 0;
      this.tokenNumber = 0;
    }
  }
}
</script>

<style scoped>
.el-row {
  padding-top: 35px;
}
.el-card {
  /*background-color: white;*/
  background: linear-gradient(to bottom right, #7a3e99, #361d7a);
  border: 0px;
  color: var(--color-text);
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
}
.mint {
  width: 100%;
}
.title {
  font-weight: 600;
  font-size: 16px;
}
span {
  font-size: 14px;
  /*margin-left: 5px;*/
}
i {
  margin-right: 5px;
}
</style>
<style>
.el-tabs--card>.el-tabs__header .el-tabs__item {
  border-radius: 7px;
  border: none!important;
  /*background-color: #123342;*/
}
.el-tabs--card>.el-tabs__header .el-tabs__nav {
  border: none!important;
}
.el-tabs__item.is-active {
  color: var(--purple-dark-shade) !important;
  background-color: var(--purple-card-background);
  font-weight: 600;
}
.el-tabs__item {
  color: var(--color-text) !important;
  /*cursor: pointer;*/
}
.el-tabs__item:hover {
  color: var(--purple-dark-shade) !important;
  /*cursor: pointer;*/
}
.number-input, .el-input__inner {
  background-color: var(--purple-card) !important;
  border-radius: 7px;
}
</style>
