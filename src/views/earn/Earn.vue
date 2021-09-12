<template>
  <div>
    <h1>Capital efficiency for your yield positions.</h1>
    <p class="introduce">Mint Principal and Yield Tokens from your base asset, boost your APY by providing liquidity and
      view current APYs across all available terms.</p>
    <earn-table class="earn-table" :token-list="xbbTokenList"/>
  </div>
</template>

<script>
import EarnTable from "./child/EarnTable";
import {mapActions, mapState} from "vuex";

export default {
  name: "Earn",
  components: {EarnTable},
  data() {
    return {

    }
  },
  props: {
    xbbTokenList: {
      type: Array
    }
  },
}
</script>

<style scoped>
.introduce {
  font-weight: 400;
  width: 40%;
  margin: 15px auto;
  line-height: 25px;
}

.earn-table {
  margin-top: 45px;
}

  div h1 {
    position: relative;
    /*text-indent:30px;*/
    font-weight: bolder;
    /*line-height: 50px;*/
    background-image: -webkit-linear-gradient(0deg, #53bcef, #58e998);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

div p {
  position: relative;
  /*text-indent:30px;*/
  font-weight: bolder;
  /*line-height: 50px;*/
  background-image: -webkit-linear-gradient(0deg, #99d7ef, #8be9cb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
