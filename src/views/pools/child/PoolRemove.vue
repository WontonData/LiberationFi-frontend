<template>
  <div>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-input @input="calculate" type="number" class="number-input" placeholder="0.00" v-model="number">
          <template slot="prepend">LP Tokens</template>
        </el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11" :offset="1"><span class="left">余额： {{LPBalance + ' ' + tokenName }}</span></el-col>
      <el-col :span="11">
        <el-button @click="toMax()" class="right" type="warning" plain size="mini">最大</el-button>
      </el-col>
    </el-row>

    <el-row class="remove">
      <el-col :span="8">
        <item-text data="0.32%" title="池份额" />
      </el-col>
      <el-col :span="8">
        <item-text data="78.8818" :title="tokenName + ' 流动性'" />
      </el-col>
      <el-col :span="8">
        <item-text data="296.3551" :title="token.token1 + ' 流动性'" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ItemText from "../../../components/txt/ItemText";
export default {
  name: "PoolRemove",
  components: {ItemText},
  data() {
    return {
      number: 0.00,
    }
  },
  props: {
    token: {
      type: Object
    },
    tokenName: {
      type: String
    },
    LPBalance: {
      type: Number
    },
  },
  methods: {
    toMax() {
      this.number = this.LPBalance
    },
    calculate() {
      console.log(this.number)
      this.$emit("calculate", this.number)

    },
  }
}
</script>

<style scoped>
.el-row {
  padding-top: 14px;
}
.remove {
  padding-top: 30px;
}
span {
  font-size: 14px;
}
i {
  font-size: 20px;
  font-weight: 600;
}
</style>