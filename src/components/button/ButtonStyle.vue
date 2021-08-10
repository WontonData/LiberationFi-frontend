<template>
  <button :style="btnStyle">{{ text }}</button>
</template>

<script>
export default {
  name: "ButtonStyle",
  props: {
    text: {
      type: String,
      default: '按钮'
    },
    borderColor: {
      type: String,
      default: 'blue'
    },
    textColor: {
      type: String,
      default: 'blue'
    }
  },
  data () {
    return {
      btnStyle:  {
        border: '1px solid ' + this.borderColor,
        color: this.textColor,
        backgroundColor: this.borderColor
      }
    }
  },
}
</script>

<style scoped>
button {
  background-color: transparent;
  width: 100%;
  height: 40px;
  border-radius: 5px;

  display: table-cell;
  vertical-align: middle;
}
button :hover {
  background-color: transparent;
  width: 100%;
  height: 40px;
  border-radius: 5px;

  display: table-cell;
  vertical-align: middle;
}
</style>