<template>
  <div>
    <el-row>
      <el-col :span="4" :offset="8">
        <div @click="changeTab" :class="selectPools? 'trade-title select' : 'trade-title'"><h2>Principal Pools</h2>
        </div>
      </el-col>
      <el-col :span="4">
        <div @click="changeTab" :class="selectPools? 'trade-title' : 'trade-title select'"><h2>Yield Pools</h2></div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 35px;color: #a7b6c2;">
      <el-col>买卖本金代币或在 Element 本金池中提供流动性。</el-col>
    </el-row>


  </div>
</template>

<script>
export default {
  name: "Trade",
  data() {
    return {
      selectPools: true
    }
  },
  methods: {
    changeTab() {
      this.selectPools = !this.selectPools;
    }
  }
}
</script>

<style scoped>
.el-col {
  position: relative;
}
.trade-title {
  font-family: Segoe UI;
  padding-bottom: 7px;
}

.select::before {
  content: "";
  position: absolute;
  top: 5%;
  left: 18%;
  width: 66%;
  height: 100%;
  border-bottom: 3.5px solid #00c4ff;

}

</style>