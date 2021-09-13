<!--
 * @Author: OOO--li--OOO
 * @Date: 2021-09-11 22:35:46
 * @LastEditTime: 2021-09-13 21:36:04
-->
<template>
  <div>
    <div class="item-time ">{{ time }}</div>

    <div>
      <el-progress
          type="circle"
          :width="60"
          :stroke-width="7"
          :percentage="percentage"
          :format="format"
          color="rgba(208,223,230,0.8)"></el-progress>
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
      default: 0
    }
  },
  methods: {
    format() {
      return Number(this.percentage).toFixed(1)+"%"
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
.el-progress-circle__track {
    stroke: rgba(129,60,133,0.5);
} 
.el-progress__text {
  color: rgba(255,255,255,0.9) !important
}
  .el-tag {
    color: #ffffff !important;
    
    background-color: rgba(129,92,148,0.7) !important;
    border-color:rgba(129,92,148,0.0) !important;
  }
</style>
