<template>
  <el-card shadow="hover">
    <el-row style="padding-top: 0">
      <el-col :span="24">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" >

          <el-tab-pane name="buy">
            <span slot="label"><i class="el-icon-sold-out"></i> 买入</span>
            <pool-buy
                :max="max"
                :token="token"
                :number="number"
                :buy-number="buyNumber"
                :token-name="tokenName"
                :p-ymax="YPmax"
                @toMax="toMax"
            />
          </el-tab-pane>

          <el-tab-pane name="sell">
            <span slot="label"><i class="el-icon-sell"></i> 卖出</span>
            <pool-sell
                :max="max"
                :token="token"
                :number="number"
                :sell-number="sellNumber"
                :token-name="tokenName"
                :p-ymax="YPmax"
                @toMax="toMax"
            />
          </el-tab-pane>

          <el-tab-pane name="add">
            <span slot="label"><i class="el-icon-s-claim"></i> 增加流动性</span>
            <pool-add
                :max="max"
                :token="token"
                :number="number"
                :add-number="addNumber"
                :token-name="tokenName"
                :p-ymax="YPmax"
                @toMax="toMax"
            />
          </el-tab-pane>

          <el-tab-pane name="remove">
            <span slot="label"><i class="el-icon-s-release"></i> 去除流动性</span>
            <pool-remove
                :max="max"
                :token="token"
                :number="number"
                :remove-number="removeNumber"
                :token-name="tokenName"
                :p-ymax="YPmax"
                @toMax="toMax"
            />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="22" :offset="1" >
        <el-button v-if="account" @click="mint" class="mint" type="warning" plain>Mint</el-button>
        <el-button v-else disabled class="mint" type="warning" plain>请先连接钱包</el-button>
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

export default {
  name: "TradeCard",
  components: {PoolRemove, PoolAdd, PoolSell, PoolBuy, ItemText},
  computed: {
    ...mapState(["account"]),
  },
  data() {
    return {
      number: 0.00,
      buyNumber: 0.00,
      sellNumber: 0.00,
      addNumber: 0.00,
      removeNumber: 0.00,
      YPmax: 4.670,
      // Pnumber: 0.00,
      max: 3.095,
      activeName: 'buy'

    }
  },
  props: {
    token: {
      type: Object
    },
    tokenName: {
      type: String
    }
  },
  methods: {
    toMax(type, direction) {
      if (direction === "token") {
        this.number = this.max

        switch (type) {
          case "buy":
            this.buyNumber = this.max+1
            break;
          case "sell":
            this.sellNumber = this.max+1
            break;
          case "add":
            this.addNumber = this.max+1
            break;
        }
      } else {
        this.number = this.max+1

        switch (type) {
          case "buy":
            this.buyNumber = this.YPmax
              //补充
            break;
          case "sell":
            this.sellNumber = this.YPmax
            break;
          case "add":
            this.addNumber = this.YPmax
            break;
        }
      }


    },
    calculate() {
      console.log(this.number)
      this.Ynumber = this.Pnumber = this.number
    },
    mint() {
      this.$emit("mint", this.number)
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>
.el-row {
  padding-top: 35px;
}
.el-card {
  background-color: var(--purple-background);
  color: var(--color-text);
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
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
  border: none!important;
}
.el-tabs--card>.el-tabs__header .el-tabs__nav {
  border: none!important;
}
.el-tabs__item.is-active {
  color: var(--purple-dark-shade) !important;
  font-weight: 600;
}
.el-tabs__item {
  color: var(--color-text) !important;
  cursor: pointer;
}
.el-tabs__item:hover {
  color: var(--purple-dark-shade) !important;
  cursor: pointer;
}
</style>