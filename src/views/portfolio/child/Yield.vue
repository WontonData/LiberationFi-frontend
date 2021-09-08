<template>
<!--  <div>yield</div>-->
  <div class="pri-card">
    <el-card class="box-card" shadow="hover">
      <!--      1-->
      <el-row class="card1">
        <el-col :span="6" class="card1-1">
          <img src="img/token/USDC.svg" alt="" height="75" width="75">
        </el-col>
        <el-col :span="18" class="card1-2">
          <div class="card1-2-1">USDC收益代币</div>
          <div class="card1-2-2"><el-tag effect="dark">2022年8月11日</el-tag></div>
        </el-col>
      </el-row>
      <!--2-->
      <el-row class="card2">
        <el-col :span="24">
          <span>在11个月零22天内达到任期 </span><br>
          <el-progress :percentage="7" :format="format"></el-progress>
        </el-col>
      </el-row>
      <!--      3-->
      <el-row class="card3">
        <el-col :span="24">
          <el-tag type="info" class="card3-tag">
            总余额<br/>
            <span style="font-weight: bolder">10.000000 eY:eyUSDC:10</span>
          </el-tag>
        </el-col>
      </el-row>
      <!--      4-->
      <el-row class="card4">
        <el-col :span="24">
          <el-tag type="info" class="card4-tag">
            当前值<br/>
            <span style="font-weight: bolder">0.781000 USDC</span><br/>
            0.78美元
          </el-tag>
        </el-col>
      </el-row>
      <!--      5-->
      <el-row class="card5">
        <el-col :span="24">
          <el-row :gutter="20" class="card5-text">
            <el-col :span="8">赎回</el-col>
            <el-col :span="8">增加流动性</el-col>
            <el-col :span="8">卖</el-col>
          </el-row>
        </el-col>
      </el-row>
      <!--      6-->
      <el-row class="card6">
        <el-col :span="24">
          存放在<span>向往USDC 0.3.0中的</span>USDC的应计收益率
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Yield",
    methods: {
      format() {
        return ''
      }
    }
  }
</script>

<style scoped>
  .pri-card {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box-card {
    width: 500px;
    height: 570px;
    background-color: var(--purple-card-save);
    border-radius: 15px;
  }
  .card1 {
    /*background-color: #7f8d9b;*/
    height: 120px;
  }
  .card2 {
    /*background-color: #9c93c4;*/
    height: 50px;
    display: flex;
    justify-content: right;
    align-items: center;
    color: var(--color-text);
  }
  .card3 {
    /*background-color: #7f8d9b;*/
    height: 100px;
  }
  .card4 {
    /*background-color: #9c93c4;*/
    height: 120px;
  }
  .card5 {
    /*background-color: #7f8d9b;*/
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card6 {
    /*background-color: #9c93c4;*/
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-text);
    font-size: 16px;
  }

  .card1-1 {
    display: flex!important;
    justify-content: center!important;
    align-items: center!important;
    height: 120px;
  }
  .card1-2 {
    float: right!important;
    height: 120px;
  }

  .card1-2-1 {
    height: 60px;
    display: flex;
    justify-content: right;
    align-items: center;
    font-size: 20px;
    color: var(--color-text);
    /*width: 1000px;*/
  }
  .card1-2-2 {
    height: 60px;
    display: flex;
    justify-content: right;
    align-items: first;
    /*width: 100px;*/
  }
  .el-tag--dark {
    background-color: var(--purple-light);
    border-color: var(--purple-light);
    color: var(--color-text);
  }
  >>> .el-progress-bar__inner {
    background-color: var(--purple-dark-shade) !important;
  }
  >>> .el-progress-bar__outer {
    background-color: var(--purple-card) !important;
  }
  .card3-tag {
    height: 80px;
    width: 420px;
    margin: 10px;
    padding: 10px;
    background-color: rgba(148, 140, 185, 0.3) !important;
    border-color: rgba(167, 182, 194, 0) !important;
    color: var(--color-text) !important;
    font-size: 16px;
    border-radius: 8px;
  }
  .card4-tag {
    height: 100px;
    width: 420px;
    margin: 10px;
    padding: 8px;
    background-color: rgba(148, 140, 185, 0.3) !important;
    border-color: rgba(167, 182, 194, 0) !important;
    color: var(--color-text) !important;
    font-size: 16px;
    border-radius: 8px;
  }
  .card5-text {
    color: var(--color-text);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
  >>> .el-tabs__item.is-active {
    color: var(--purple-dark-shade) !important;
    background-color: rgba(255, 255, 255, 0) !important;
    font-weight: 600;
  }
  >>> .el-tabs--card>.el-tabs__header .el-tabs__item {
    border-radius: 7px;
    border: none!important;
    background-color: rgba(255, 255, 255, 0) !important;
  }
</style>