<template>
<!--  <div>NoLp</div>-->
  <div>
    <el-row>
      <el-col :span="24" class="col">
        <i style="font-size: 100px" class="el-icon-s-promotion"></i>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" class="col">
        <span>该钱包不含任何LP token</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "NoLp"
  }
</script>

<style>
  .col {
    margin: 8px;
  }
</style>