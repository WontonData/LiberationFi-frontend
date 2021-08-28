<template>
  <div>
      <h2>web3签名</h2>
    <el-row>
      <el-col :span="10" :offset="7">
        <el-card shadow="always">
          <el-input placeholder="请输入内容" v-model="address">
            <template slot="prepend">data</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="key">
            <template slot="prepend">privateKey</template>
          </el-input>
          <el-button type="warning" plain @click="addressHex">地址转换</el-button>
          <el-button type="warning" plain @click="sign">签名</el-button>
          <div v-show="result">
            <el-divider>message</el-divider>
            <span>{{ this.result.message }}</span>
            <el-divider>messageHash</el-divider>
            <span>{{ this.result.messageHash }}</span>
            <el-divider>r</el-divider>
            <span>{{ this.result.r }}</span>
            <el-divider>s</el-divider>
            <span>{{ this.result.s }}</span>
            <el-divider>v</el-divider>
            <span>{{ this.result.v }}</span>
<!--            <el-divider>signature</el-divider>-->
<!--            <span>{{ this.result.signature }}</span>-->
          </div>


        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
// import web3 from 'web3'
// import {Conflux, Drip, format} from 'js-conflux-sdk'
import {format} from 'js-conflux-sdk'
import {sign} from 'js-conflux-sdk';
import {mapActions, mapState} from "vuex";

export default {
  name: "Tools",
  computed: {
    ...mapState(["web3"]),
  },
  data() {
    return {
      address: '',
      key: '',
      result: '',
    }
  },
  methods: {
    addressHex() {
      this.address = format.hexAddress(this.address)
      console.log(format.hexAddress('cfxtest:acbbuu2y4k736279c40cabjfwcdfp4y4x66eep7ee1'));
      //0x82184314d27b9e63bf16ac2005059086566a9a9f
    },
    sign() {
      const messageBuffer = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
      const privateKeyBuffer = Buffer.from("207D3178BD4B15EDF1D6354721591F9E")//5321ADBC 4F421E1D78 3A1BBD8866 23E2
      console.log(messageBuffer)
      console.log(privateKeyBuffer)
      const typedData = { /*...*/};
      // const message = getMessage(typedData).toString('hex'); // Build message
      const message = '1901f2cee375fa42b42143804025fc449deafd50cc031ca257e0b194a650a912090fc52c0ee5d84264471806290a3f2c4cecfc5490626bf912d01f240d7a274b371e' // Build message
//
//       const messageHash = getMessage(typedData, true).toString('hex'); // Build message hash
      const messageHash = '0x82184314d27b9e63bf16ac2005059086566a9a9f' // Build message hash
// be609aee343fb3c4b28e1df9e632fca64fcfaede20f02e86244efddf30957bd2
      const privateKey = '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'; // use your own private key here
// Sign message hash with private key
      const sig = sign.ecdsaSign(messageBuffer, privateKeyBuffer);
      //0a83fb83e86946bef4334d80b4400ee3a896c2137b5d41f2d2de8d4a8b613114
      // this.result = this.web3.eth.accounts.sign(this.address, this.key)
      // console.log(this.result)
      console.log(sig)
    },
  }
}
</script>

<style scoped>
.el-row {
  margin-top: 1rem;
}

.el-input, .el-button {
  margin-top: 1rem;
}
span {
  font-size: 15px
}
</style>
<style>

.el-divider {
  font-size: 12px!important;
}
</style>