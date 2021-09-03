<template>
  <div>
    <h1>Capital efficiency for your yield positions.</h1>
    <p class="introduce">Mint Principal and Yield Tokens from your base asset, boost your APY by providing liquidity and
      view current APYs across all available terms.</p>
    <earn-table class="earn-table" :token-list="tokenList"/>
  </div>
</template>

<script>
import EarnTable from "./child/EarnTable";
import {mapActions, mapState} from "vuex";

export default {
  name: "Earn",
  components: {EarnTable},
  computed: {
    ...mapState(["conflux", ]),
  },
  data() {
    return {

    }
  },
  props: {
    tokenList: {
      type: Array
    }
  },

  methods: {


  }
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

</style>