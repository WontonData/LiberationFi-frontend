<template>
  <div>
    <div class="item-time ">{{ time }}</div>

    <div>
      <el-progress
          type="circle"
          :width="50"
          :stroke-width="7"
          :percentage="percentage"
          :format="format"
          color="#273652"></el-progress>
    </div>
    <el-tag
        style="margin-right: 5px"
        type="success"
        size="mini">
      {{ day }}
    </el-tag>
    <!--    <div class="item-rest">{{ rest }}</div>-->
  </div>
</template>

<script>
export default {
  name: "ItemTime",
  props: {
    time: {
      type: String,
    },
    day: {
      type: String,
    },
    percentage: {
      type: Number,
      default: 56
    }
  },
  methods: {
    format() {
      return ''
    }
  }
}
</script>

<style scoped>
.item-time {
  font-size: 15px;
  color: #e8eaed;
  font-weight: 550;
  margin-bottom: 5px;
}

.item-rest {
  font-size: 14px;
  /*line-height: 35px;*/
}

div {
  line-height: 25px;
}
</style>

<style>
.el-progress-bar__outer {
  background-color: #273652 !important;
}
  .el-tag {
    color: #000000!important;
  }
</style>
