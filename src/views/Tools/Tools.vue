<template>
  <div>

    <h2>hex</h2>
    <el-row>
      <el-col :span="10" :offset="7">
        <el-card shadow="always">
          <el-input placeholder="请输入内容" v-model="arr">
            <template slot="prepend">pool id</template>
          </el-input>
          <el-button type="warning" plain @click="Bytes2Str">bytes转16进制</el-button>
          <div >
            <el-input
                    style="margin-top:20px"
                    type="textarea"
                    :autosize="{ minRows: 10, maxRows: 20}"
                    resize="none"
                    placeholder=""
                    v-model="textarea1">
            </el-input>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <h2 style="margin-top:50px">userData</h2>
    <el-row>
      <el-col :span="10" :offset="7">
        <el-card shadow="always">
          <el-input placeholder="请输入内容" v-model="amountA">
            <template slot="prepend">amountA</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="amountB">
            <template slot="prepend">amountB</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="join">
            <template slot="prepend">JOIN_KIND_INIT</template>
          </el-input>
          <el-button type="warning" plain @click="userDataA">userdata</el-button>
          <el-button type="warning" plain @click="userDataB">initUserData</el-button>
          <el-button type="warning" plain @click="userDataC">amountA</el-button>
          <el-button type="warning" plain @click="userDataD">amountB</el-button>
          <div >
            <el-input
                    style="margin-top:20px"
                    type="textarea"
                    :autosize="{ minRows: 10, maxRows: 20}"
                    resize="none"
                    placeholder=""
                    v-model="textarea2">
            </el-input>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { BigNumber, ethers } from "ethers"
  export default {
    name: "Tools",
    data() {
      return {
        arr: '',
        arrArray: [],
        textarea1: '',
        amountA: '',
        amountB: '',
        join: '0',
        initialBalances: '',
        initUserData: '',
        textarea2: '',
      }
    },
    methods: {
      // string转bytes
      stringToByte(str) {
        var bytes = new Array();
        var len, c;
        len = str.length;
        for(var i = 0; i < len; i++) {
          c = str.charCodeAt(i);
          if(c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
          } else if(c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
          } else if(c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
          } else {
            bytes.push(c & 0xFF);
          }
        }
        return bytes;
      },

      // bytes转16进制 调用的方法
      Bytes2Str() {
        //去掉开头和结尾的[]
        this.arrArray = this.arr.substring(1,this.arr.length-1);

        //把arr转成bytes 臭李诚误导我！！！！
        // this.arr = this.$options.methods.stringToByte(this.arr);
        // console.log(this.arr);
        // console.log(this.arr.length);

        //把arr以逗号分隔为数组
        this.arrArray = this.arrArray.split(",");

        //原Bytes2Str内容
        let str = "";
        for (let i = 0; i < this.arrArray.length; i++) {
          let tmp = parseInt(this.arrArray[i]).toString(16);
          if (tmp.length === 1) {
            tmp = "0" + tmp;
          }
          str += tmp;
        }

        // 最后输出
        this.textarea1 = "0x" + str;
        console.log(this.textarea1);
      },

      // userDataA userdata
      userDataA() {
        console.log(this.join)
        const initialBalances = [ethers.BigNumber.from("10").pow(18).mul(this.amountA), ethers.BigNumber.from("10").pow(18).mul(this.amountB)];
        const userdata = ethers.utils.defaultAbiCoder.encode(["uint256[]"], [initialBalances]);
        this.textarea2 = userdata
        // this.textarea2 = "userdata:" + userdata
      },

      // userDataB initUserData
      userDataB() {
        const initialBalances = [ethers.BigNumber.from("10").pow(18).mul(this.amountA), ethers.BigNumber.from("10").pow(18).mul(this.amountB)];
        const initUserData =
            ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256[]'],
                [this.join, initialBalances]);
        this.textarea2 = initUserData;
        // this.textarea2 = "initUserData:" + initUserData;
      },

      // userDataC amountA
      userDataC() {
        const initialBalances = [ethers.BigNumber.from("10").pow(18).mul(this.amountA), ethers.BigNumber.from("10").pow(18).mul(this.amountB)];
        this.textarea2 = initialBalances[0].toString()
        // this.textarea2 = "amountA:" + initialBalances[0].toString()
      },

      // userDataD amountB
      userDataD() {
        const initialBalances = [ethers.BigNumber.from("10").pow(18).mul(this.amountA), ethers.BigNumber.from("10").pow(18).mul(this.amountB)];
        this.textarea2 = initialBalances[1].toString()
        this.textarea2 = "amountB:" + initialBalances[1].toString()
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
</style>
