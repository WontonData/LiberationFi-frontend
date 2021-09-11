<template>
  <div>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-input @input="calculate('e')" type="number" class="number-input" placeholder="0.00" v-model="addNumber">
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
      <el-col :span="24">
        <i class="el-icon-coin"></i>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-input @input="calculate('token')" type="number" class="number-input" placeholder="0.00" v-model="number">
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
      <el-col :span="11" :offset="1"><span class="left b">Market rate：</span></el-col>
      <el-col :span="11">
        <span class="right"> {{ rate + ' ' + tokenName + ' / ' + token.token1 }} </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "PoolAdd",
  data() {
    return {
      number: null,
      addNumber: null,
      rate: null,
    }
  },
  created() {
    setTimeout(() => {
      this.rate = (this.token.yReserves / this.token.xReserves).toFixed(2)
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
      } else {
        this.addNumber = this.YPBalance
      }
      this.calculate(direction)
    },
    calculate(direction) {
      if (direction === "token") {

        this.addNumber = this.number * this.token.yReserves / this.token.xReserves
      } else {
        this.number = this.addNumber * this.token.xReserves / this.token.yReserves
      }
      this.$emit("calculate", this.number, this.addNumber)

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
</style>