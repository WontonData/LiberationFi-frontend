<template>
<!--  <div>SaveMain</div>-->
  <div>
    <el-row>
      <el-col :span="24" class="save-button">
        <el-button icon="el-icon-thumb">View balances</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="save-card">
        <SaveCard></SaveCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import SaveCard from "../../../components/card/SaveCard";
  export default {
    name: "SaveMain",
    components: {
      SaveCard
    }
  }
</script>

<style scoped>
  .save-button {
    height: 65px;
    /*background-color: #8fb8d1;*/
    padding-left: 575px;
  }
  .save-card {
    height: 535px;
    /*background-color: #a0b3c2;*/
  }
  .el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: rgba(255,255,255,0);
    border: 0px solid #DCDFE6;
    color: var(--color-text);
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  .el-button:hover {
    background-color: var(--purple-background);
    color: var(--color-text);
  }
  .el-button:focus {
    background-color: var(--purple-background);
    color: var(--color-text);
  }
</style>