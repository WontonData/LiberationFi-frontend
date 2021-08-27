<template>
  <div>
    <span class="item-time ">{{ time }}</span>
    <el-tag
        style="margin-right: 5px"
        type="info"
        class="right"
        size="mini">
      {{ day }}
    </el-tag>
    <el-progress
        :stroke-width="7"
        :percentage="50"
        :format="format"
        color="#7c6eab"></el-progress>
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
  color: var(--purple-dark-shade);
  font-weight: 550;

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
  background-color: var(--purple-card-background)!important;
}
</style>