<template>
  <el-row>
    <el-col :span="22" :offset="1">
      <div style="width: 12%">
        <el-timeline>
          <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              size="large"
              :timestamp="activity.timestamp">
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
      <div style="width: 40%">
        <mint-card :token="token" @mint="mint"/>
      </div>
      <div style="width: 2%">
      </div>
      <div style="width: 40%">
        <div v-if="isConfirm" class="skeleton">
          <el-skeleton :rows="6"/>
          <el-skeleton-item variant="button" style="width: 100%; margin-top: 25px"/>
        </div>
        <div v-else-if="isAllApprovedEnough">
            <confirm-card class="confirm"
              :number="number"
              :token="token"
              :show="show"
              @confirm="confirm"/>
        </div>
        <div v-else>
          <approve-card class="confirm" 
            :toApprove=toApprove
            @approve=approveAndSign
            />
        </div>

      </div>
    </el-col>
  </el-row>
</template>

<script>
import MintCard from "../../../components/card/MintCard";
import ConfirmCard from "../../../components/card/ConfirmCard";
import ApproveCard from "../../../components/card/ApproveCard.vue";

import JSBI from 'jsbi';
import * as ethers from "ethers";
import {mapState, mapActions} from "vuex";
import confluxPortal from '@/network/conflux-portal'
import ERC20PermitAbi from "@/network/abi/ERC20Permit.json"
import TrancheAbi from "@/network/abi/Tranche.json"
import {format} from "js-conflux-sdk";
import {keccakFromHexString} from "ethereumjs-util";

export default {
  name: "EranTableInnerItem",
  components: {ConfirmCard, MintCard, ApproveCard},
  computed: {
    ...mapState(["account", "USDA", "conflux","conAddr"]),
    
  },
  data() {
    return {
      activities: [{
        content: 'Enter the coinage amount',
        type: '',
        icon: ''
      }, {
        content: 'Confirm the information',
        type: '',
        icon: ''
      }, {
        content: 'trade successfully',
        type: '',
        icon: ''
      }],
      isConfirm: true,
      isAllApprovedEnough: false,
      number: 0,
      genSign:[],
      toApprove:{
        amount:0,
        approve:[
          // {
          //   contract:{},
          //   who:'',
          //   spender:''
          // }
        ],
        sign:[
          // {
          //   contract:{},
          //   who:'',
          //   spender:''
          // }
        ]
      }
    };
  },
  props: {
    token: {
      type: Object
    },
    show: {
      type: Boolean
    }
  },
  methods: {
    ...mapActions(["UserProxy_mint","ContractInteract","conAddr"]),
    deriveTranche(_position, _expiration) {
      let _expirationHex = parseInt(_expiration).toString(16);
      while (_expirationHex.length < 64) {
        _expirationHex = "0" + _expirationHex;
      }
      _position = format.hexAddress(_position) + _expirationHex
      let salt = keccakFromHexString(_position).toString('hex')
      let address = keccakFromHexString(
          "0xff" + format.hexAddress(this.trancheFactoryAddr).substring(2) + salt + this.trancheBytecodeHash
      ).toString('hex')

      this.textarea = "0x8" + address.substring(24).substring(1)
      return "0x8" + address.substring(24).substring(1)
    },
    async genSignature(params) {
      let sign = ""
      let address = params.contractAddr
      let spender = params.spender
      let contract = params.contract
      let abi = params.abi
      let nonces = params.nonces
      let name = params.name

      // uToekn-userProxy
      let res
      let thisContract
      if (contract) {
        thisContract = contract
      } else {
        thisContract = this.conflux.Contract({
          abi: abi,
          address: address
        });
      }
      if (nonces) {
        params.nonces = nonces
      } else {
        res = await thisContract.nonces(this.account)
        params.nonces = parseInt(res.toJSON())
      }

      if (name) {
        params.name = name
        console.log(params.name)
      } else {
        res = await thisContract.name()
        params.name = res
      }
      params.address = address
      params.spender = spender
      params.value = params.amount + ''
      console.log(params)
      await confluxPortal._sign(params).then((res) => {
        // console.log('signature', res);
        sign = {
          tokenContract: params.address,
          who: params.spender,
          amount: params.value,
          expiration: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          v: res.v,
          r: res.r,
          s: res.s
        }
      })
      return sign
    },

    wait(time) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, time)
      })
    },
    async getAllowance(contract,who,spender) {
      let res = await contract.allowance(who,spender)
      return res.toJSON()
    },
    addToApprove(contract,who,spender,amount) {
      // console.log(amount)
      this.toApprove.approve.push({
        contract: contract,
        who: who,
        spender: spender,
      })
      if(amount){
        this.toApprove.amount = amount
      }
    },
    addToSign(contract,contractAddr,who,spender,amount) {
      this.toApprove.sign.push({
        contract: contract,
        contractAddr: contractAddr,
        who: who,
        spender: spender,
      })
      if(amount){
        this.toApprove.amount = amount
      }
    },
    async isAllApproved(amount="0") {
      // console.log(this.token.info,this.token.contract)
      let a = true
      let i=0
      let conAddr = this.conAddr
      let info = this.token.info
      let contracts = this.token.contract
      let uToken = contracts.uToken
      let pToken = contracts.token.pToken
      let yToken = contracts.token.yToken

      let amountB = ethers.BigNumber.from(amount)
      console.log(amountB)
      this.getAllowance(uToken,this.account,conAddr.UserProxy).then((res) => {
        i++
        if(ethers.BigNumber.from(res).lt(amountB)) {
          this.addToApprove(uToken,this.account,conAddr.UserProxy,amountB.add(1).toString())
          a = false
        }
      })
      
      this.getAllowance(uToken,this.account,info.FVaultAssetProxy).then((res) => {
        i++
        if(ethers.BigNumber.from(res).lt(amountB)){ 
          this.addToApprove(uToken,this.account,info.FVaultAssetProxy,amountB.add(1).toString())
          a = false
        }
      })
      
      this.getAllowance(pToken,this.account,info.FVaultAssetProxy).then((res) => {
        i++
        if(ethers.BigNumber.from(res).lt(amountB)){
          this.addToSign(pToken,info.token.pToken,this.account,info.FVaultAssetProxy,amountB.add(1).toString())
          a = false
        }
      })
      
      this.getAllowance(yToken,this.account,info.FVaultAssetProxy).then((res) => {
        i++
        if(ethers.BigNumber.from(res).lt(amountB)){
          this.addToSign(yToken,info.token.yToken,this.account,info.FVaultAssetProxy,amountB.add(1).toString())
          a = false
        }
      })
      
      while (i < 4) {
        await this.wait(100)
      }
      console.log(a)
      return a
      // console.log(this.account,info.FVaultAssetProxy)
      // let res = await uToken.allowance(this.account,info.FVaultAssetProxy)
      // console.log(a1,a2,a3,a4)
    },
    async mint(number) {
      this.number = number
      this.isAllApprovedEnough = await this.isAllApproved(number)
      this.$emit("mint", number)
      this.activities[0].type = 'success';
      this.activities[0].icon = 'el-icon-check';
      this.isConfirm = false
    },
    async approveAndSign(toApprove=this.toApprove) {

      console.log(toApprove)
      console.log(this.toApprove)
      let amount = toApprove.amount * 1
      
      for(let i=0;i<toApprove.approve.length;i++) {
        let c = toApprove.approve[i]
        let data = {
          contract: c.contract,
          method: "approve",
          data: [c.spender,amount]
        }
        try{
          await this.ContractInteract(data)
        }catch(e) {
          console.error("canceled!")
        }
      }
      for(let i=0;i<toApprove.sign.length; i++) {
        let c = toApprove.sign[i]
        let data = {
          contractAddr: c.contractAddr,
          spender: c.spender,
          abi: ERC20PermitAbi,
          contract: c.contract,
          amount: amount
        }
        await this.genSignature(data).then((res) => {
          this.genSign.push(res)
        })
      }
      console.log("---genSign--",this.genSign)
      this.isAllApprovedEnough = true
    },
    approveForMint(){
      console.log(this.token.info)
    },
    //确认mint
    confirm() {

        const mintParams = {
          _amount: (this.number ),
          _userProxy: this.conAddr.UserProxy,
          _underlying: this.token.underlying,
          _expiration: this.token.unlockTimestamp,
          _position: this.token.position,
          _permitCallData: this.genSign
        }
        console.log("mintParams",mintParams)

        this.UserProxy_mint(mintParams).then(res => {

          console.log(res)
          if (res.result) {
            this.activities[2].type = 'success';
            this.activities[2].icon = 'el-icon-check';
            const msg = "交易成功！ <b><a target='_blank' href=https://testnet.confluxscan.io/address/"
                + res.result + " >点击查看</a></b>"
            this.$message({
              type: 'success',
              dangerouslyUseHTMLString: true,
              message: msg
            });
          }
        });
    }
  }
}
</script>

<style scoped>
.el-row {
  width: 100%;
  border-top: 2px #c1d2d8 solid;
  /*background-color: ;*/
}

.el-col {
  display: flex;
  width: 100%;
}

.el-timeline {
  text-align: left;
  margin-top: 10px;
}

 >>> .el-timeline-item__content {
  color: #ffffff!important;
}

.skeleton {
  /*color: var(--color-text);*/
  padding: 10px;
  margin: 10px;
}

/*.confirm {*/
/*  margin-left: 20px;*/
/*}*/
</style>

<style>
.el-timeline-item__node--warning {
  background-color: var(--purple);
}

.el-skeleton__item {
  background: #7787c6 !important;
}
</style>
