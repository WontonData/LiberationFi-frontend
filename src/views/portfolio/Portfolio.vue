<template>
<!--  <div>Portfolio.vue</div>-->
  <el-row>
    <el-col :span="24">
      <el-row>
        <!--已连接钱包-->
        <el-col v-if="account" :span="24">
          <el-row>
            <el-col :span="24" class="port-text">Portfolio({{accountCut}})</el-col>
          </el-row>
          <port-card></port-card>
        </el-col>

        <!--未连接钱包-->
        <el-col v-else disabled :span="24">Connect your wallet to view your portfolio</el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import {mapActions, mapState} from "vuex";
  import PortCard from "../../components/card/PortCard";

  export default {
  name: "Portfolio",
  components: {PortCard},
  computed: {
    ...mapState(["account", "ConvergentPoolFactory", "TrancheFactory"]),
    accountCut(){
      return this.account.substring(0,7) + "..." + this.account.substring(37,42)
    },
  },
}
</script>

<style scoped>
  .port-text {
    color: var(--color-text);
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  >>> .el-tabs__item {
    padding: 0 130px!important;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 18px!important;
    font-weight: 550;
    color: #303133;
    position: relative;
  }
</style>
