<template>
  <div>
    <h2>web3签名</h2>
    <el-row>
      <el-col :span="10" :offset="7">
        <el-card shadow="always">
          <el-input placeholder="请输入内容" v-model="address">
            <template slot="prepend">contract</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="spender">
            <template slot="prepend">spender</template>
          </el-input>
          <el-button type="warning" plain @click="addressHex">地址转换</el-button>
          <el-button type="warning" plain @click="sign">签名</el-button>
          <el-button type="warning" plain @click="permit">permit</el-button>
          <div >
            <el-input
                style="margin-top:20px"
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 20}"
                resize="none"
                placeholder=""
                v-model="textarea">
            </el-input>
          </div>


        </el-card>
      </el-col>
    </el-row>

    <h2 style="margin-top:50px">生成calldata签名</h2>
    <el-row>
      <el-col :span="10" :offset="7">
        <el-card shadow="always">
          <el-input placeholder="签名者地址" v-model="signer">
            <template slot="prepend">owner(signer)</template>
          </el-input>
          <el-input placeholder="userProxy地址" v-model="userProxyAddr">
            <template slot="prepend">userProxy</template>
          </el-input>
          <el-input placeholder="underlyingToken地址" v-model="underlyingTokenAddr">
            <template slot="prepend">underlyingToken</template>
          </el-input>
          <el-input placeholder="wrappedPosition地址" v-model="wrappedPositionAddr">
            <template slot="prepend">wrappedPosition</template>
          </el-input>
          <el-input placeholder="trancheFactory地址" v-model="trancheFactoryAddr">
            <template slot="prepend">trancheFactory</template>
          </el-input>
          <el-input placeholder="trancheBytecodeHash" v-model="trancheBytecodeHash">
            <template slot="prepend">trancheBytecodeHash</template>
          </el-input>
          <el-input placeholder="时间戳" v-model="expiration">
            <template slot="prepend">expiration</template>
          </el-input>
          <el-input placeholder="value" v-model="value">
            <template slot="prepend">value</template>
          </el-input>
          <el-button type="warning" plain @click="genSignature_calldata">生成签名</el-button>
          <el-button type="warning" plain @click="deriveTranche(wrappedPositionAddr,expiration)">生成预测地址</el-button>
          <el-input
            style="margin-top:20px"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 20}"
            resize="none"
            placeholder=""
            v-model="textarea">
          </el-input>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { keccak256,keccakFromString,keccakFromHexString, ecsign,isValidPrivate,privateToPublic} from 'ethereumjs-util'
import {Conflux,format} from 'js-conflux-sdk'
import {sign} from 'js-conflux-sdk';
import {mapActions, mapState} from "vuex";
import confluxPortal from '@/network/conflux-portal'

import ERC20PermitAbi from "@/network/abi/ERC20Permit.json"
import UserProxyAbi from '@/network/abi/UserProxy.json'
import TrancheAbi from "@/network/abi/Tranche.json"

export default {
  name: "Tools",
  computed: {
    ...mapState(["conflux","web3", "TrancheFactory", "Tranche", "ConvergentCurvePool", "USDA"]),
  },
  data() {
    return {
      address: '',
      spender: '',
      result: '',
      contractName: '',
      contractNonces: '',
      signer: '',
      userProxyAddr: 'cfxtest:acc8k6yz4s9fxu85j397b1k1je1jzferxpgr65ngzx',
      underlyingTokenAddr: 'cfxtest:acgfgvhxwfeduu07a6pf6u538aj7at2veasb6fxhu0',
      wrappedPositionAddr: 'cfxtest:acfkmkfse864y16cn9261y5j2785d75rmeed68hskd',
      trancheFactoryAddr: 'cfxtest:acgk31mt25khe2mhc6ak60c1u0c49wa5xjjnrrddbv',
      trancheBytecodeHash: '33353283da9febabe800962de594ae7c9f274743d76e7af5f88afe3e6ea5a94a',
      expiration: '1633023038',
      value: '1633023038',
      textarea: ''
    }
  },
  methods: {
    async addressHex() {

      this.address = format.hexAddress(this.address)
      console.log(format.hexAddress('cfxtest:acbbuu2y4k736279c40cabjfwcdfp4y4x66eep7ee1'));
      //0x82184314d27b9e63bf16ac2005059086566a9a9f
    },
    async sign() {
      let params = {
        address: this.address,
        spender: this.spender,
        name: "",
        nonces: 0
      }

      // address-spender
      let ERC20PermitToken =  this.conflux.Contract({
        abi: ERC20PermitAbi,
        address: this.address
      });
      let res = await ERC20PermitToken.nonces(this.signer)
      params.nonces = parseInt(res.toJSON())
      res= await ERC20PermitToken.name()
      params.name = res
      params.value = (this.number * 1000000000000000000) + ''
      // console.log(params)
      confluxPortal._sign(params).then((res) => {
        console.log('signature', res);
        console.log({
          tokanContract: params.address,
          who: params.spender,
          amount: '100000000000000000000',
          expiration: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          v: res.v,
          r: res.r,
          s: res.s
        });
        let sign = {
          tokanContract: params.address,
          who: params.spender,
          amount: '100000000000000000000',
          expiration: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          v: res.v,
          r: res.r,
          s: res.s
        }
        this.textarea = JSON.stringify(sign,undefined, 2);
      })

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
    },
    async loadAccount() {
      let _interval = setInterval(() => {
        if(confluxPortal.accounts){
          this.signer = confluxPortal.accounts[0]
          clearInterval(_interval)
        }
      }, 100);
    },
    deriveTranche(_position, _expiration) {
      let _expirationHex = parseInt(_expiration).toString(16);
      while(_expirationHex.length<64){
        _expirationHex = "0" + _expirationHex;
      }
      _position = format.hexAddress(_position)+_expirationHex
      // console.log(_position,keccakFromHexString(_position).toString('hex'))
      let salt =  keccakFromHexString(_position).toString('hex')
      // console.log("0xff"+format.hexAddress(this.trancheFactoryAddr)+salt+this.trancheBytecodeHash)
      
      let address = keccakFromHexString(
        "0xff"+format.hexAddress(this.trancheFactoryAddr).substring(2)+salt+this.trancheBytecodeHash
      ).toString('hex')

      // console.log("0x8"+address.substring(24).substring(1))
      this.textarea = "0x8"+address.substring(24).substring(1)
      return "0x8"+address.substring(24).substring(1)
      // console.log(keccakFromString("aaaab").toString('hex'))
    },
    async genSignature(address,spender,abi = ERC20PermitAbi,contract = undefined,nonces = undefined,name = undefined){
      let sign = ""
      let params = {
        address: "",
        spender: "",
        name: "",
        nonces: 0
      }

      // uToekn-userProxy 
      let res
      let thisContract 
      if(contract){
        thisContract = contract
      }else{
        thisContract =  this.conflux.Contract({
          abi: abi,
          address: address
        });
      }
      if(nonces){
        params.nonces = nonces
      }else{
        res = await thisContract.nonces(this.signer)
        params.nonces = parseInt(res.toJSON())
      }
      
      if(name){
        params.name = name
        console.log(params.name)
      }else{
        res= await thisContract.name()
        params.name = res
      }
      params.address = address
      params.spender = spender
      // console.log(params)
      await confluxPortal._sign(params).then((res) => {
        // console.log('signature', res);
        sign = {
          tokanContract: params.address,
          who: params.spender,
          amount: '100000000000000000000',
          expiration: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          v: res.v,
          r: res.r,
          s: res.s
        }
      })
      return sign
    },
    async genSignature_calldata() {
      let signs = []

      // uToekn-userProxy 
      let underlyingToken = this.conflux.Contract({
        abi: ERC20PermitAbi,
        address: this.underlyingTokenAddr
      });
      let res = await underlyingToken.nonces(this.signer)
      let nonces = parseInt(res.toJSON())
      this.genSignature(this.underlyingTokenAddr,this.userProxyAddr,ERC20PermitAbi,underlyingToken,nonces).then((res) => {
        signs.push(res)
      })

      // uToekn-YVaultAssetProxy 
      nonces++
      this.genSignature(this.underlyingTokenAddr,this.wrappedPositionAddr,ERC20PermitAbi,underlyingToken,nonces).then((res) => {
        signs.push(res)
      })

      // pToekn-userProxy
      let TrancheAddr = this.deriveTranche(this.wrappedPositionAddr,this.expiration)
      let Tranche =  this.conflux.Contract({
        abi: TrancheAbi,
        address: TrancheAddr
      });
      this.genSignature(TrancheAddr,this.wrappedPositionAddr,TrancheAbi,Tranche).then((res) => {
        signs.push(res)
      })

      // yToekn-userProxy 
      let yTokenAddr = await Tranche.interestToken()
      this.genSignature(yTokenAddr,this.wrappedPositionAddr,ERC20PermitAbi).then((res) => {
        signs.push(res)
      })

      while(signs.length<4) {
        await this.wait(50)
      }
      // console.log(signs)
      this.textarea = JSON.stringify(signs,undefined, 2)
      return signs
    },
    wait (time) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, time)
      })
    }
  },
  
  created: function() {
      this.loadAccount()
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