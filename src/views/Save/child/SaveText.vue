<template>
<!--  <div>SaveText</div>-->
  <div>
    <el-row>
      <el-col :span="24" class="save-title">
        <span>The simplest way to grow your crypto.</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="save-word">
        <span>No minimums, no withdrawal penalties, exit anytime. </span>
        <span class="save-word-blue">Read more about Fixed Yield.</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "SaveText"
  }
</script>

<style scoped>
  .save-title{
    height: 150px;
    /*background-color: rgba(66, 185, 131, 0.43);*/
    color: white;
    font-size: 35px;
    font-weight: bolder;
    padding-top: 85px;
  }
  .save-word{
    height: 60px;
    /*background-color: rgba(88, 139, 198, 0.15);*/
    color: #a4a4a4;
    font-size: 18px;
  }
  .save-word-blue {
    color: #4fb0d1;
  }
</style>