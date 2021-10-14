<template>
  <el-card shadow="hover">
    <el-row style="padding-top: 0">
      <el-col :span="24"><span class="title">Confirm the information</span></el-col>
    </el-row>

    <el-row>
      <el-col :span="8"><span class="left front">amount：</span></el-col>
      <el-col :span="16">
        <span class="left">{{ accountCut }}</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8"><span class="left front">deposit：</span></el-col>
      <el-col :span="16">
        <span class="left"><span class="textOverflow1">{{numberB}}</span> {{ token.token1}} </span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8"><span class="left front">Principal：</span></el-col>
      <el-col :span="16">
        <span class="left">{{ numberB }} {{ token.token2 }}</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8"><span class="left front">Yield：</span></el-col>
      <el-col :span="16">
        <span class="left">{{ numberB }} {{ token.token3 }}</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8"><span class="left front">Term date：</span></el-col>
      <el-col :span="16">
        <span class="left">{{ token.term }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" >
        <el-button @click="confirm" class="mint" type="warning" plain>Confirm</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import {mapState} from "vuex";
import {  nBig2Small,nSmall2Big }  from"../../network/tool"

export default {
  name: "ConfirmCard",
  computed: {
    ...mapState(["account"]),
    accountCut(){
      return this.account.substring(0,15) + "...." + this.account.substring(30,42)
    },
    numberB(){
      console.log(this.number,nBig2Small(this.number)) 
      return nBig2Small(this.number)
    }
  },
  props: {
    number: {
      type: String
    },
    token: {
      type: Object
    }
  },
  methods: {
    confirm() {
      this.$emit("confirm", this.number)
    }
  }
}
</script>

<style scoped>
.el-row {
  padding-top: 16px;
  line-height: 18px;
}

.el-card {
  background-color: rgb(81, 50, 142);
  color: #ffffff;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  border: 0px;
  box-shadow: #1c1c1c 3px 3px;
}

.title {
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 16px;
}

.front {
  font-weight: 550;
  color: #cef9f7;
}
.mint {
  width: 100%;
}
span {
  font-size: 14px;
}
</style>
