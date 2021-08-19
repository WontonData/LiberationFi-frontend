<template>
<!--  <div>NoPrincipal</div>-->
  <div>
    <el-row>
      <el-col :span="24" class="col">
        <i style="font-size: 100px" class="el-icon-s-promotion"></i>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" class="col">
        <span>该钱包不含任何主体代币</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" class="col">
        <el-button type="primary" plain>去赚取</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "NoPrincipal"
  }
</script>

<style scoped>

</style>