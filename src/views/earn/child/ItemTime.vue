<template>
  <div>
    <span class="item-time ">{{ time }}</span>
    <el-tag
        style="margin-right: 15px"
        class="right"
        size="mini"
        effect="dark">
      {{ day }}
    </el-tag>
    <el-progress
        :stroke-width="7"
        :percentage="50"
        :format="format"
        color="#3174c1"></el-progress>
    <div class="item-rest">{{ rest }}</div>
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
    rest: {
      type: String
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
  color: #f5f8fa;
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
  background-color: #2c3e50;
}
</style>