<template>
<!--  <div>Save.vue</div>-->
  <div class="save">
    <el-row>
      <el-col :span="24" class="SaveHeader">
        <SaveHeader></SaveHeader>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" class="SaveText">
        <SaveText></SaveText>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" class="SaveMain">
        <SaveMain></SaveMain>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import SaveHeader from "./child/SaveHeader";
  import SaveText from "./child/SaveText";
  import SaveMain from "./child/SaveMain";
  export default {
    name: "Save",
    components: {
      SaveHeader,SaveText,SaveMain
    }
  }
</script>

<style scoped>
  .save {
    /*background-color: var(--purple-background);*/
  }
  .SaveHeader {
    height: 70px;
    /*background-color: #c3bfff;*/
  }
  .SaveText {
    height: 210px;
    /*background-color: #c3bfff;*/
  }
  .SaveMain {
    height: 600px;
    /*background-color: #7f95d1;*/
  }
</style>