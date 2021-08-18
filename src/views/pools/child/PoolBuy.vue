<template>
  <div>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-input @input="calculate" type="number" class="number-input" placeholder="0.00" v-model="number">
          <template slot="prepend">{{ token.token1 }}</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11" :offset="1"><span class="left">余额： {{max + ' ' + token.token1 }}</span></el-col>
      <el-col :span="11">
        <el-button @click="toMax('token')" class="right" type="warning" plain size="mini">最大</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <i class="el-icon-arrow-down"></i>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-input @input="calculate" type="number" class="number-input" placeholder="0.00" v-model="buyNumber">
          <template slot="prepend">{{ tokenName }}</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11" :offset="1"><span class="left">余额： {{PYmax + ' ' + tokenName }}</span></el-col>
      <el-col :span="11">
        <el-button @click="toMax('e')" class="right" type="warning" plain size="mini">最大</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "PoolSell",
  props: {
    token: {
      type: Object
    },
    tokenName: {
      type: String
    },
    number: {
      type: Number
    },
    buyNumber: {
      type: Number
    },
    max: {
      type: Number
    },
    PYmax: {
      type: Number
    }
  },
  methods: {
    toMax(direction) {
      this.$emit("toMax", "buy", direction)
      this.number = this.max
      this.buyNumber  = this.number

    },
    calculate() {
      console.log(this.number)
      this.buyNumber = this.number
    },
    mint() {
      this.$emit("mint", this.number)
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