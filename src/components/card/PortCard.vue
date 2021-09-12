<template>
  <el-row>
    <el-rol :span="24">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane label="Principal Tokens" name="principal" class="tab">
          <el-row>
            <el-col :span="24">
              <Principal :token-list="tokenList"></Principal>
<!--              <NoPrincipal></NoPrincipal>-->
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="Yield Tokens" name="yield" class="tab">
          <el-row>
            <el-col :span="24">
              <Yield :token-list="tokenList"></Yield>
<!--              <NoYield></NoYield>-->
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="LP Positions" name="lp" class="tab">
          <el-row>
            <el-col :span="24">
              <Lp :token-list="tokenList"></Lp>
<!--              <NoLp></NoLp>-->
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-rol>
  </el-row>
</template>

<script>
  import Principal from "../../views/portfolio/child/Principal";
  import NoPrincipal from "../../views/portfolio/child/NoPrincipal";
  import Yield from "../../views/portfolio/child/Yield";
  import NoYield from "../../views/portfolio/child/NoYield";
  import Lp from "../../views/portfolio/child/Lp";
  import NoLp from "../../views/portfolio/child/NoLp";
  export default {
    name: "PortCard",
    components: {NoLp, NoYield, NoPrincipal, Lp, Yield, Principal},
    data() {
      return {
        activeName: 'principal'
      };
    },
    props: {
      tokenList: {
        type: Array
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style scoped>
  >>> .el-tabs__nav-scroll {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tab {
    font-size: 16px!important;
    font-weight: 550!important;
    color: var(--purple-light);
  }
</style>
