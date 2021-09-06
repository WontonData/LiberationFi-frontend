<template>
  <el-card shadow="hover">
    <el-row style="padding-top: 0">
      <el-col :span="24"><span class="title">Mint Principal and Yield tokens with your {{ token.token1 }}</span></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-input @input="calculate" type="number" class="number-input" placeholder="0.00" v-model="number">
          <template slot="prepend">
            <img alt="美元" :src="'img/token/' + token.icon + '.svg'" height="22" width="22">
          </template>
        </el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12"><span class="left">Available balance：{{ max }} {{ token.token1 }}</span></el-col>
      <el-col :span="12">
        <el-button @click="toMax" class="right" type="warning" plain size="mini">MAX</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <item-text :data="Pnumber + ' ' + token.token2" title="Principal Tokens you receive"/>
      </el-col>
      <el-col :span="12">
        <item-text :data="Ynumber + ' ' + token.token3" title="Yield Tokens you receive"/>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-button v-if="account"
                   @click="mint"
                   :disabled="number == null || number === '' || number >= max"
                   class="mint" type="warning" plain>Mint</el-button>
        <el-button v-else @click="mint" disabled class="mint" type="warning" plain>Enter an amount</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import {mapState} from "vuex";
import ItemText from "../txt/ItemText";

export default {
  name: "MintCard",
  components: {ItemText},
  computed: {
    ...mapState(["conflux", "account", "USDA"]),
  },
  watch: {
    account() {
      this.USDA.balanceOf(this.account).then(res => {
        this.max = res.toString() / 1000000000000000000
      })
    }
  },
  data() {
    return {
      IERC20: null,
      number: null,
      Ynumber: 0.00,
      Pnumber: 0.00,
      max: 0.000
    }
  },
  props: {
    token: {
      type: Object
    },
    show: {
      type: Boolean
    }
  },
  created() {

  },
  methods: {
    toMax() {
      this.number = this.max
      this.Ynumber = this.Pnumber = this.number

    },
    calculate() {
      console.log(this.number)
      this.Ynumber = this.Pnumber = this.number
    },
    mint() {
      this.$emit("mint", this.number)
    }
  }
}
</script>

<style scoped>
.el-row {
  padding-top: 18px;
}

.el-card {
  background-color: var(--purple-card-background);
  color: var(--color-text);
  padding: 10px;
  margin: 10px;
  border-radius: 10px;

}

.mint {
  width: 100%;
}

.title {
  font-weight: 600;
  font-size: 16px;
}

span {
  font-size: 14px;
}
</style>
<style>
.el-input__inner {
  text-align: right;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
  border: 0;
  outline: none;
  /*background-color: rgba(0, 0, 0, 0);*/
}
</style>