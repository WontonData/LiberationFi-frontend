<template>
  <div>
    <div v-if="type === 'buy'">
      <el-input class="dialog-input" disabled type="number" v-model="tokenNumber">
        <template slot="prepend">{{ token.token1 }}</template>
      </el-input>

      <i class="el-icon-arrow-down"></i>

      <el-input class="dialog-input" disabled type="number" v-model="YPNumber">
        <template slot="prepend">{{ tokenName }}</template>
      </el-input>

      <div class="box">
        <div class="item-title left">Market rate</div>
        <div class="item-data right">{{ '1 Principal Token ≈ 0.993 ' + token.token1 }}</div>
      </div>
      <div class="box">
        <div class="item-title left">Trade fee</div>
        <div class="item-data right">0.31%</div>
      </div>
      <div class="box">
        <div class="item-title left">Price impact</div>
        <span class="item-data right">0.30%</span>
      </div>
    </div>
    <div v-if="type === 'sell'">

      <el-input class="dialog-input" disabled type="number" v-model="YPNumber">
        <template slot="prepend">{{ tokenName }}</template>
      </el-input>
      <i class="el-icon-arrow-down"></i>
      <el-input class="dialog-input" disabled type="number" v-model="tokenNumber">
        <template slot="prepend">{{ token.token1 }}</template>
      </el-input>

      <div class="box">
        <div class="item-title left">Market rate</div>
        <div class="item-data right">{{ '1 Principal Token ≈ 0.993 ' + token.token1 }}</div>
      </div>
      <div class="box">
        <div class="item-title left">Trade fee</div>
        <div class="item-data right">0.31%</div>
      </div>
      <div class="box">
        <div class="item-title left">Price impact</div>
        <span class="item-data right">0.30%</span>
      </div>
    </div>
    <div v-if="type === 'add'">

      <el-input class="dialog-input" disabled type="number" v-model="YPNumber">
        <template slot="prepend">{{ tokenName }}</template>
      </el-input>
      <i class="el-icon-coin"></i>
      <el-input class="dialog-input" disabled type="number" v-model="tokenNumber">
        <template slot="prepend">{{ token.token1 }}</template>
      </el-input>

      <div class="box">
        <div class="item-title left">Share of pool</div>
        <div class="item-data right">{{ '0.07%' }}</div>
      </div>
      <div class="box">
        <div class="item-title left">LP APY</div>
        <div class="item-data right">0.01%</div>
      </div>
      <div class="box">
        <div class="item-title left">Pool fees</div>
        <span class="item-data right">0.31%(当前)</span>
      </div>
    </div>
    <div v-if="type === 'remove'">

      <el-input class="dialog-input" disabled type="number" v-model="YPNumber">
        <template slot="prepend">LP Tokens</template>
      </el-input>
      <i class="el-icon-bottom"></i>

      <el-input class="dialog-input" disabled type="number" v-model="YPNumber">
        <template slot="prepend">{{ tokenName }}</template>
      </el-input>
      <el-input class="dialog-input get-input" disabled type="number" v-model="tokenNumber">
        <template slot="prepend">{{ token.token1 }}</template>
      </el-input>
    </div>

  </div>
</template>

<script>
import ItemText from "../../../components/txt/ItemText";
export default {
  name: "MsgDialog",
  components: {ItemText},
  props: {
    token: {
      type: Object
    },
    tokenName: {
      type: String
    },
    type: {
      type: String
    },
    tokenNumber: {
      type: Number
    },
    YPNumber: {
      type: Number
    }
  }
}
</script>

<style scoped>
.box {
  width: 100%;
  display: inline-block;
  font-size: 14px;
  line-height: 15px;
  margin-top: 20px;
}
.item, .get-input {
  margin-top: 15px;
}
i {
  margin: 10px;
}
.item-data {
  color: var(--purple-dark-shade);
  font-weight: 550;
  text-align: right;
}

</style>
<style>
.dialog-input .el-input__inner {
  background-color: var(--purple-card) !important;
  color: var(--color-text) !important;
}
.dialog-input .el-input-group__prepend {
  background-color: var(--purple-card-background);
  color: var(--color-text) !important;
}
</style>