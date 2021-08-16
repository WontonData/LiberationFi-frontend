<template>
  <div>
    <div class="item-data">{{ data }}</div>
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
  color: var(--purple-dark-shade);
  font-weight: 550;

}
.item-title {
  font-size: 14px;
  line-height: 25px;
  /*color: white;*/
}
</style>