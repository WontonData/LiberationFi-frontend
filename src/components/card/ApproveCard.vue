<!--
 * @Author: OOO--li--OOO
 * @Date: 2021-09-12 12:05:44
 * @LastEditTime: 2021-09-12 14:38:09
-->
<template>
  <el-card shadow="hover">
    <el-row style="padding-top: 0">
      <el-col :span="24"><span class="title">Approve for contract</span></el-col>
    </el-row>

    <el-row>
      <el-col :span="24" >
        <el-button @click="approve" class="mint" type="warning" plain>Approve & Sign</el-button>
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
    toApprove: {
      type: Object
    }
  },
  methods: {
    approve() {
      this.$emit("approve")
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
