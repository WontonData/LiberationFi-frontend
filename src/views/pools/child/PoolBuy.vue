<template>
  <div>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-input @input="calculate('token')"
                  type="number"
                  class="number-input"
                  placeholder="0.00"
                  v-model="number">
          <template slot="prepend">{{ token.token1 }}</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11" :offset="1"><span class="left">Balance： {{ tokenBalance + ' ' + token.token1 }}</span></el-col>
      <el-col :span="11">
        <el-button @click="toMax('token')" class="right" type="warning" plain size="mini">Max</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <i class="el-icon-arrow-down"></i>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-input @input="calculate('e')" type="number" class="number-input" placeholder="0.00" v-model="buyNumber">
          <template slot="prepend">{{ tokenName }}</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11" :offset="1"><span class="left">Balance： {{ YPBalance + ' ' + tokenName }}</span></el-col>
      <el-col :span="11">
        <el-button @click="toMax('e')" class="right" type="warning" plain size="mini">Max</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11" :offset="1"><span class="left b">Market rate：</span></el-col>
      <el-col :span="11">
        <span class="right"> {{ rate + ' ' + token.token1 + ' / ' + tokenName }} </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  calcSwapOutGivenInCCPoolUnsafe,
  calcSwapInGivenOutCCPoolUnsafe,
  calcSwapOutGivenInWeightedPoolUnsafe,
  calcSwapInGivenOutWeightedPoolUnsafe
} from '@/network/helpers/calcPoolSwap'

export default {
  name: "PoolSell",
  data() {
    return {
      number: null,
      buyNumber: null,
      rate: null,
    }
  },
  created() {
    setTimeout(() => {
      let rate;
      console.log(this.type)
      if (this.type === 'Y')
        rate = calcSwapOutGivenInWeightedPoolUnsafe(
            1000000000000000000,
            this.token.xReserves,
            this.token.yReserves,
        ) / 1000000000000000000
      // return  ().toFixed(2)
      else
        rate = calcSwapInGivenOutCCPoolUnsafe(
            1000000000000000000,
            this.token.xReserves,
            this.token.yReserves,
            this.token.totalSupply,
            this.token.unlockTimestamp - Date.parse(new Date()) / 1000,
            this.token.unitSeconds,
            false
        ) / 1000000000000000000
      this.rate = rate.toFixed(2)
    }, 3000)


  },
  props: {
    token: {
      type: Object
    },
    tokenName: {
      type: String
    },
    tokenBalance: {
      type: Number
    },
    YPBalance: {
      type: Number
    },
    type: {
      type: String
    }
  },
  methods: {
    toMax(direction) {
      if (direction === "token") {
        this.number = this.tokenBalance
        // this.buyNumber = this.tokenBalance + 1
      } else {
        this.buyNumber = this.YPBalance
        // this.number = this.YPBalance - 1
      }
      this.calculate(direction)

    },
    calculate(direction) {
      if (direction === "token") {
        if (this.type === 'Y')
          this.buyNumber = calcSwapOutGivenInWeightedPoolUnsafe(
              this.number * 1000000000000000000,
              this.token.yReserves,
              this.token.xReserves,
          ) / 1000000000000000000
        else
          this.buyNumber = calcSwapOutGivenInCCPoolUnsafe(
              this.number * 1000000000000000000,
              this.token.xReserves,
              this.token.yReserves,
              this.token.totalSupply,
              this.token.unlockTimestamp - Date.parse(new Date()) / 1000,
              this.token.unitSeconds,
              true
          ) / 1000000000000000000
      } else {
        if (this.type === 'Y')
          this.number = calcSwapOutGivenInWeightedPoolUnsafe(
              this.buyNumber * 1000000000000000000,
              this.token.xReserves,
              this.token.yReserves
          ) / 1000000000000000000
        else
          this.number = calcSwapInGivenOutCCPoolUnsafe(
              this.buyNumber * 1000000000000000000,
              this.token.xReserves,
              this.token.yReserves,
              this.token.totalSupply,
              this.token.unlockTimestamp - Date.parse(new Date()) / 1000,
              this.token.unitSeconds,
              false
          ) / 1000000000000000000
      }
      this.$emit("calculate", this.number, this.buyNumber, this.limit)

    },
  }
}
</script>

<style scoped>
.el-row {
  padding-top: 14px;
}

span {
  font-size: 14px;
}

i {
  font-size: 20px;
  font-weight: 600;
}

.b {
  font-weight: 600;
  font-size: 15px;
}
</style>