<template>
<!--  <div>SaveText</div>-->
  <div>
    <el-row>
      <el-col :span="24" class="save-title">
        <span>增长加密货币的最简单方法</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="save-word">
        <span>没有最低限额，没有提款罚款，随时退出。 </span>
        <span class="save-word-blue">阅读有关固定收益的更多信息。</span>
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
    color: var(--color-text);
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
    color: var(--purple-dark);
  }
</style>