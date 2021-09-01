<template>
  <div>
    <h2>web3签名</h2>
    <el-row>
      <el-col :span="10" :offset="7">
        <el-card shadow="always">
          <el-input placeholder="请输入内容" v-model="address">
            <template slot="prepend">address</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="spender">
            <template slot="prepend">spender</template>
          </el-input>
          <el-button type="warning" plain @click="addressHex">地址转换</el-button>
          <el-button type="warning" plain @click="sign">签名</el-button>
          <el-button type="warning" plain @click="permit">permit</el-button>
          <div >
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
import confluxPortal from '@/network/conflux-portal'

export default {
  name: "Tools",
  computed: {
    ...mapState(["web3", "TrancheFactory", "Tranche", "ConvergentCurvePool", "USDA"]),
  },
  data() {
    return {
      address: '',
      spender: '',
      result: '',
    }
  },
  methods: {
    async addressHex() {

      this.address = format.hexAddress(this.address)
      console.log(format.hexAddress('cfxtest:acbbuu2y4k736279c40cabjfwcdfp4y4x66eep7ee1'));
      //0x82184314d27b9e63bf16ac2005059086566a9a9f
    },
    sign() {
      const params = {
        address: this.address,
        spender: this.spender,
      }
      confluxPortal.sign(params).then(res => {

        const sig = res.result;
        console.log('signature', sig);
        this.result.r = '0x' + sig.substring(2).substring(0, 64);
        this.result.s = '0x' + sig.substring(2).substring(64, 128);
        this.result.v = '0x' + sig.substring(2).substring(128, 130);
        // console.log("r:" + r)
        // console.log("s:" + s)
        // console.log("v:" + v)
      })
      // confluxPortal.sign()

      //function
      // const called = this.TrancheFactory['deployTranche'].call(
      //         1630996603621,
      //         "cfxtest:acfkmkfse864y16cn9261y5j2785d75rmeed68hskd")
      // console.log(called)
      // const result = confluxPortal.sendTransaction({
      //   from: confluxPortal.getAccount(),
      //   to: called.to,
      //   data: called.data,
      // }).then(res => {
      //   console.log(res)
      // })
      //"0x17af1e089ed5a4a4b6a1e7fad366e2c669ae3679fa5d63c5d33d6d5d3cec5c37"
      //"0x01693097e8572b2c4f83c38984a1b343958ede12ba003abd6aa149c5c459d7ab"
      // console.log(result)

      //event
      // console.log(Array(2))
      // const res = await this.TrancheFactory['TrancheCreated'].call(
      //     '0x65748E8287Ce4B9E6D83EE853431958851550311',
      //     '0x65748E8287Ce4B9E6D83EE853431958851550311',
      //     '0x65748E8287Ce4B9E6D83EE853431958851550311',
      // ).getLogs()
      // console.log(res)

      //read
      //cfxtest:acegc96nmps0hb7we2zb29d5eth1f5fcv6bu6jwp3j
      // this.Tranche['interestToken'].call().then(res => {
      //0: -559939584  1: 902409669  2: 54
      // this.Tranche['interestSupply'].call().then(res => {
      //Element Principal Token wp-30SEP21
      // this.Tranche['name'].call().then(res => {
      //   console.log(res)
      //   // resolve(res)
      // }).catch(error => {
      //   console.log(error)
      //   // reject(error)
      // })
      //      this.ConvergentCurvePool['name'].call().then(res => {

      //sign
      // await confluxPortal.sign()

    },

    permit() {
      const called = this.USDA['permit'].call(
          "cfxtest:aar9fe37w61vadm62ds132ntxgn5ngnnej277edujw",
          "cfxtest:aam90kc4anf1941w2sysbpcnm31vt6eepjvvg8k231",
          "1000000000000000000000",
          "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          "28",
          "0x75c4cc109df18bf9ca88d1b9a076cf83d935dd74d5a26234273d87c9bde3fe6f",
          "0x3eff39b074aeb28618b58f7df5e06e448261f72439816a95df17870df8add116"
      )
      console.log(called)
      const result = confluxPortal.sendTransaction({
        from: confluxPortal.getAccount(),
        to: called.to,
        data: called.data,
      }).then(res => {
        console.log(res)
      })
      // "0x17af1e089ed5a4a4b6a1e7fad366e2c669ae3679fa5d63c5d33d6d5d3cec5c37"
      // "0x01693097e8572b2c4f83c38984a1b343958ede12ba003abd6aa149c5c459d7ab"
      console.log(result)
    }

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
  font-size: 12px !important;
}
</style>