<template>
<!--  <div>Save.vue</div>-->
  <div class="save">
    <div class="SaveHeader">
      <SaveHeader></SaveHeader>
    </div>
    <div class="SaveText">
      <SaveText></SaveText>
    </div>
    <div class="SaveMain">
      <SaveMain></SaveMain>
    </div>
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
    background-color: #232e38;
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