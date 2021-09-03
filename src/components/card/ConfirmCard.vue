<template>
  <el-card shadow="hover">
    <el-row style="padding-top: 0">
      <el-col :span="24"><span class="title">信息确认</span></el-col>
    </el-row>

    <el-row>
      <el-col :span="5"><span class="left front">用户地址：</span></el-col>
      <el-col :span="19">
        <span class="left">{{ accountCut }}</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="5"><span class="left front">押金：</span></el-col>
      <el-col :span="19">
        <span class="left">{{ number + ' ' + token.token1}} </span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="5"><span class="left front">主要代币：</span></el-col>
      <el-col :span="19">
        <span class="left">{{ number }} {{ token.token2 }}</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="5"><span class="left front">收益代币：</span></el-col>
      <el-col :span="19">
        <span class="left">{{ number }} {{ token.token3 }}</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="5"><span class="left front">到期时间：</span></el-col>
      <el-col :span="19">
        <span class="left">{{ token.term }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" >
        <el-button @click="confirm" class="mint" type="warning" plain>确认</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ConfirmCard",
  computed: {
    ...mapState(["account"]),
    accountCut(){
      return this.account.substring(0,15) + "...." + this.account.substring(30,42)
    },
  },
  props: {
    number: {
      type: Number
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
  padding-top: 14px;
  line-height: 18px;
}

.el-card {
  background-color: var(--purple-card-background);
  color: var(--color-text);
  padding: 10px;
  margin: 10px;
}

.title {
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 16px;
}

.front {
  font-weight: 550;
  color: var(--purple-dark-shade);
}
.mint {
  width: 100%;
}
span {
  font-size: 14px;
}
</style>