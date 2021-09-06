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
        <div v-else>
          <confirm-card class="confirm"
                        :number="number"
                        :token="token"
                        :show="show"
                        @confirm="confirm"/>
        </div>

      </div>
    </el-col>
  </el-row>
</template>

<script>
import MintCard from "../../../components/card/MintCard";
import ConfirmCard from "../../../components/card/ConfirmCard";

import {mapState, mapActions} from "vuex";
import confluxPortal from '@/network/conflux-portal'
import ERC20PermitAbi from "@/network/abi/ERC20Permit.json"
import TrancheAbi from "@/network/abi/Tranche.json"
import {format} from "js-conflux-sdk";
import {keccakFromHexString} from "ethereumjs-util";

export default {
  name: "EranTableInnerItem",
  components: {ConfirmCard, MintCard},
  computed: {
    ...mapState(["account", "USDA", "conflux"]),
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
      number: 0,

      address: '',
      spender: '',
      userProxyAddr: 'cfxtest:acc8k6yz4s9fxu85j397b1k1je1jzferxpgr65ngzx',
      underlyingTokenAddr: 'cfxtest:acgfgvhxwfeduu07a6pf6u538aj7at2veasb6fxhu0',
      wrappedPositionAddr: 'cfxtest:acfkmkfse864y16cn9261y5j2785d75rmeed68hskd',
      trancheFactoryAddr: 'cfxtest:acgk31mt25khe2mhc6ak60c1u0c49wa5xjjnrrddbv',
      trancheBytecodeHash: '33353283da9febabe800962de594ae7c9f274743d76e7af5f88afe3e6ea5a94a',
      expiration: '1633023038',
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
    ...mapActions(["UserProxy_mint",]),
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
    async genSignature(address, spender, abi = ERC20PermitAbi, contract = undefined, nonces = undefined, name = undefined) {
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
      params.value = (this.number * 1000000000000000000) + ''
      console.log(params)
      await confluxPortal._sign(params).then((res) => {
        // console.log('signature', res);
        sign = {
          tokenContract: params.address,
          who: params.spender,
          amount: (this.number * 1000000000000000000) + '',
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

      //判断allowance USDA

      // uToekn-userProxy
      let underlyingToken = this.conflux.Contract({
        abi: ERC20PermitAbi,
        address: this.underlyingTokenAddr
      });

      let res = await underlyingToken.nonces(this.account)
      console.log('signs')

      let nonces = parseInt(res.toJSON())
      await this.genSignature(this.underlyingTokenAddr, this.userProxyAddr, ERC20PermitAbi, underlyingToken, nonces).then((res) => {
        signs.push(res)
      })

      // uToekn-YVaultAssetProxy
      nonces++
      this.genSignature(this.underlyingTokenAddr, this.wrappedPositionAddr, ERC20PermitAbi, underlyingToken, nonces).then((res) => {
        signs.push(res)
      })

      //判断allowance Tranche
      // pToekn-userProxy
      let TrancheAddr = this.deriveTranche(this.wrappedPositionAddr, this.expiration)
      let Tranche = this.conflux.Contract({
        abi: TrancheAbi,
        address: TrancheAddr
      });
      this.genSignature(TrancheAddr, this.wrappedPositionAddr, TrancheAbi, Tranche).then((res) => {
        signs.push(res)
      })

      //判断allowance interestToken
      // yToekn-userProxy
      let yTokenAddr = await Tranche.interestToken()
      this.genSignature(yTokenAddr, this.wrappedPositionAddr, ERC20PermitAbi).then((res) => {
        signs.push(res)
      })

      while (signs.length < 4) {
        await this.wait(50)
      }
      console.log(signs)
      // this.textarea = JSON.stringify(signs,undefined, 2)
      return signs
    },
    wait(time) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, time)
      })
    },

    mint(number) {
      this.number = number * 1
      this.$emit("mint", number)
      this.activities[0].type = 'success';
      this.activities[0].icon = 'el-icon-check';
      this.isConfirm = false
    },

    //确认mint
    confirm() {

      this.genSignature_calldata().then(res => {
        console.log(res)
        this.activities[1].type = 'success';
        this.activities[1].icon = 'el-icon-check';

        const mintParams = {
          _amount: (this.number * 1000000000000000000) + '',
          _underlying: this.token.underlying,
          _expiration: this.token.unlockTimestamp,
          _position: this.token.position,
          _permitCallData: res
        }
        console.log(mintParams)

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
      })

      //签名


      // store.dispatch("mint", {number: 123, type: 'mint'}).then(res => {
      //   console.log(res)
      //   this.activities[2].type = 'success';
      //   this.activities[2].icon = 'el-icon-check';
      // });

    }
  }
}
</script>

<style scoped>
.el-row {
  width: 100%;
  border-top: 2px var(--purple-card-background) solid;
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
  background: var(--purple-card-background) !important;
}
</style>