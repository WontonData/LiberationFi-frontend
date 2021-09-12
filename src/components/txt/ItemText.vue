<!--
 * @Author: OOO--li--OOO
 * @Date: 2021-09-11 22:35:46
 * @LastEditTime: 2021-09-12 19:47:55
-->
<template>
  <div>
    <div class="item-data textOverflow1">{{ data }}</div>
    <div class="item-suffix textOverflow1">{{ suffix }}</div>
    <div class="item-title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: "ItemText",
  props: {
    data: {
      type: String,
    },
    suffix: {
      type: String,
    },
    title: {
      type: String
    }
  }
}
</script>

<style scoped>
.item-data {
  font-size: 15px;
  /*color: #f5f8fa;*/
  color: #e8eaed;
  font-weight: 550;

}
.item-title {
  font-size: 14px;
  line-height: 25px;
  color: white;
}
</style>
