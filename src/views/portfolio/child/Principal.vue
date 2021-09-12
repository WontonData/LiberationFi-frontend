<template>
<!--  <div>principal</div>-->
  <div class="pri-card">
    <el-card class="box-card" shadow="hover">
<!--      1-->
      <el-row class="card1">
        <el-col :span="6" class="card1-1">
          <img src="img/token/cDAI.svg" alt="" height="75" width="75">
        </el-col>
        <el-col :span="18" class="card1-2">
          <div class="card1-2-1">cDAI Principal Token</div>
          <div class="card1-2-2"><el-tag effect="dark">{{formatDate}}</el-tag></div>
        </el-col>
      </el-row>
<!--2-->
      <el-row class="card2">
        <el-col :span="24">
          <span>Reaches term in {{restDate}} days</span><br>
          <el-progress :percentage="2" :format="format"></el-progress>
        </el-col>
      </el-row>
<!--      3-->
      <el-row class="card3">
        <el-col :span="24">
          <el-tag type="info" class="card3-tag">
            Total balance  {{ptSymbol}}<br/>
            <span style="font-weight: bolder">{{ptBalance}}</span>
          </el-tag>
        </el-col>
      </el-row>
<!--      4-->
      <el-row class="card4">
        <el-col :span="24">
          <el-tag type="info" class="card4-tag">
            Current value<br/>
            <span style="font-weight: bolder">$ {{ptBalance * 0.98}}</span><br/>
          </el-tag>
        </el-col>
      </el-row>
<!--      5-->
      <el-row class="card5">
        <el-col :span="24">
          <el-row :gutter="20" class="card5-text">
            <el-col :span="8">Redeem</el-col>
            <el-col :span="8">Add Liquidity</el-col>
            <el-col :span="8">Sell</el-col>
          </el-row>
        </el-col>
      </el-row>
<!--      6-->
      <el-row class="card6">
        <el-col :span="24">
          Fixed yield is backed by cDAI deposited in<span> Flux cDAI</span>
        </el-col>
      </el-row>

    </el-card>
  </div>

</template>

<script>
  import {mapState} from "vuex";
  // import About from "../../About";

  export default {
    name: "Principal",
    data() {
      return {
        unlockTimestamp: '',
        formatDate: '',
        restDate: '',
        ptBalance: 0.00,
        ptSymbol: '',
      }
    },
    // components: {About},
    computed: {
      ...mapState(["account"]),
    },
    props: {
      tokenList: {
        type: Array
      }
    },
    // create() {
    //
    // },
    mounted: function () {
      this.getData();
      this.tokenList[0].pToken.balanceOf(this.account).then(res => {
        this.ptBalance = (res / 1000000000000000000).toFixed(3)
      })
    },
    methods: {
      async getData() {
        this.ptSymbol = await this.tokenList[0].pToken.symbol();
        const unlockTimestamp = await this.tokenList[0].pToken.unlockTimestamp();
        this.restDate = this.restDatee(unlockTimestamp);
        this.formatDate = this.formatDatee(unlockTimestamp);
      },
      //
      // // eslint-disable-next-line vue/no-dupe-keys
      formatDatee(timestamp) {
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return year + ' 年 ' + (String(month).length > 1 ? month : '0' + month) + ' 月 ' +
            (String(day).length > 1 ? day : '0' + day) + ' 日 '
      },

      // eslint-disable-next-line vue/no-dupe-keys
      restDatee(timestamp) {
        const now = new Date().getTime();
        return Math.floor((timestamp*1000 - now)/(1000*60*60*24))
      },

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
    background: linear-gradient(to bottom right, #7a3e99, #361d7a);
    border-radius: 15px;
    border: none;
  }
  .card1 {
    /*background-color: #7f8d9b;*/
    height: 120px;
  }
  .card2 {
    /*background-color: #9c93c4;*/
    height: 50px;
    display: flex;
    justify-content: center;
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
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: var(--color-text);
    /*width: 1000px;*/
  }
  .card1-2-2 {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: first;
    /*width: 100px;*/
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
  .el-tag--dark {
    background-color: var(--purple-light);
    border-color: var(--purple-light);
    color: var(--color-text);
  }
  >>> .el-progress-bar__inner {
    background-color: #3e414d !important;
  }
  >>> .el-progress-bar__outer {
    background-color: var(--purple-card) !important;
  }
  >>> .el-progress__text {
    color: #ffffff!important;
  }
</style>

