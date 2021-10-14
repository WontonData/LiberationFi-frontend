<template>
  <div>
    <el-row>
      <el-col :span="4" :offset="8">
        <!-- <div @click="changeTab('P')" :class="selectPools? 'trade-title select' : 'trade-title'"><h2>Principal Pools</h2>
        </div> -->
      </el-col>
      <el-col :span="4">
        <!-- <div @click="changeTab('T')" :class="selectPools? 'trade-title' : 'trade-title select'"><h2>Yield Pools</h2>
        </div> -->
      </el-col>
    </el-row>
    <el-row style="margin-top: 35px;">
      <el-col>Buy and sell principal tokens or provide liquidity in principal pools.</el-col>
    </el-row>

    <el-row style="margin-top: 35px">
      <el-col :span="6" :offset="9">
        <img alt="美元" class="left" :src="'img/token/' + token.icon + '.svg'" height="45" width="45">
        <div>
          <h2>{{ token.token1 + ' - ' + tokenName }}</h2>
          <span>{{ token.term }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="10" :offset="7">
        <trade-card class="card"
                    @mint="mint"
                    :type="type"
                    :token="token"
                    :tokenName="tokenName"/>
      </el-col>
    </el-row>

    <el-dialog class="msg-dialog" title="信息核对" :visible.sync="dialogShow">
      <msg-dialog
          class="msg-dialog-inner"
          :token="token"
          :token-name="tokenName"
          :token-address="tokenAddress"
          :type="transactionType"
          :tokenNumber="tokenNumber"
          :YPNumber="YPNumber"
      />
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" plain @click="dialogShow = false">取 消</el-button>
        <el-button type="warning" @click="tradeSure">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import ItemText from "../../components/txt/ItemText";
import TradeCard from "../../components/card/TradeCard";
import MsgDialog from "./child/MsgDialog";
import {mapState} from "vuex";
// import ethers from 'ethers'
// import {BigNumber, utils} from 'ethers'
import {ethers} from 'ethers';
import portal from "../../network/conflux-portal";

export default {
  name: "Pools",
  components: {MsgDialog, TradeCard, ItemText},
  created() {
    this.getRouterData()

  },
  computed: {
    ...mapState(["account", "BalancerVault"]),
  },
  data() {
    return {
      token: null,
      tokenName: '',
      tokenAddress: '',
      tokenContract: '',
      poolContract: '',
      poolId: '',
      type: '',
      userdata: '',
      dialogShow: false,
      tokenNumber: 0,
      YPNumber: 0,
      transactionType: '',
      selectPools: true,
    }
  },
  methods: {
    getRouterData() {
      this.token = this.$route.params.token
      this.type = this.$route.params.type
      console.log(this.type)
      if (this.type === "Y") {
        this.tokenName = this.token.token3
        this.tokenAddress = this.token.yToken.address
        this.poolId = this.token.poolId2
        this.poolContract = this.token.WeightPool
        this.tokenContract = this.token.yToken
      } else {
        this.tokenName = this.token.token2
        this.tokenAddress = this.token.pToken.address
        this.poolId = this.token.poolId1
        this.poolContract = this.token.CCPool
        this.tokenContract = this.token.pToken
      }
      console.log(this.$route.params)
      console.log(this.token)

      this.BalancerVault.getPoolTokens(this.poolId).then(res => {
        console.log(res)
        this.token.xReserves = res[1][0].toString()
        this.token.yReserves = res[1][1].toString()
        console.log(this.token.xReserves, this.token.yReserves)
      })
      this.poolContract.totalSupply().then(res => {
        console.log(res)
        this.token.totalSupply = res.toString()
        console.log(this.token.totalSupply)
      })
      this.token.CCPool.unitSeconds().then(res => {
        console.log(res)
        this.token.unitSeconds = res.toString()
        console.log(this.token.unitSeconds)
      })
    },
    //类型 主币数量 收益币数量
    mint(type, tokenNumber, YPNumber) {
      this.transactionType = type
      this.tokenNumber = tokenNumber * 1
      this.YPNumber = YPNumber * 1

      this.dialogShow = true
    },
    getUserData(amountIn) {
      const JOIN_KIND_INIT = 1;
      const yUserData = ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256[]'],
          [JOIN_KIND_INIT, amountIn]);
      const pUserdata = ethers.utils.defaultAbiCoder.encode(["uint256[]"], [amountIn]);
      console.log("pUserdata:" + pUserdata);
      console.log("yUserData:" + yUserData);
      console.log("amountA:" + amountIn[0].toString());
      console.log("amountB:" + amountIn[1].toString());
      return [pUserdata, yUserData]

    },
    tradeSure() {

      switch (this.transactionType) {
        case "buy":
          //授权
          let buyCalled = this.token.uToken["approve"].call(
              this.BalancerVault.address,
              this.tokenNumber * 1000000000000000000,
          )
          console.log(buyCalled)
          this.transaction(buyCalled).then(res => {
            console.log(res)
            const balancerCalled = this.BalancerVault["swap"].call(
                [this.poolId,
                  0,
                  this.token.uToken.address,
                  this.tokenAddress,
                  this.tokenNumber * 1000000000000000000,
                  '0x00'],
                [this.account,
                  false,
                  this.account,
                  false,],
                this.YPNumber * 1000000000000000000 * 0.8,
                '9700327120539288000'
            )
            console.log(balancerCalled)
            this.transaction(balancerCalled).then(res => {
              console.log(res)
            })
          })
          break;
        case "sell":
          //授权
          let sellCalled = this.tokenContract["approve"].call(
              this.BalancerVault.address,
              this.YPNumber * 1000000000000000000,
          )
          console.log(sellCalled)
          this.transaction(sellCalled).then(res => {
            console.log(res)

            const balancerCalled = this.BalancerVault["swap"].call(
                [this.poolId,
                  0,
                  this.tokenAddress,
                  this.token.uToken.address,
                  this.YPNumber * 1000000000000000000,
                  '0x00'],
                [this.account,
                  false,
                  this.account,
                  false,],
                this.tokenNumber * 1000000000000000000 * 0.7,
                '1733023038'
            )
            console.log(balancerCalled)
            this.transaction(balancerCalled).then(res => {
              console.log(res)
            })
          })
          break;
        case "add":
          let address, amountIn;
          //比较pyToken和uToken大小
          if (this.token.uToken.address < this.tokenAddress) {
            address = [this.token.uToken.address, this.tokenAddress];
            amountIn = [this.tokenNumber * 1000000000000000000 + '', this.YPNumber * 1000000000000000000 + ''];
          } else {
            address = [this.tokenAddress, this.token.uToken.address];
            amountIn = [this.YPNumber * 1000000000000000000 + '', this.tokenNumber * 1000000000000000000 + ''];
          }
          console.log(address)
          if (this.type === "Y") {
            this.userdata = this.getUserData(amountIn)[1]
          } else {
            this.userdata = this.getUserData(amountIn)[0]
          }
          //授权
          let addCalled = this.tokenContract["approve"].call(
              this.BalancerVault.address,
              this.YPNumber * 1000000000000000000,
          )
          console.log(addCalled)
          this.transaction(addCalled).then(res => {
            console.log(res)

            //token.uToken授权
            let addCalled = this.token.uToken["approve"].call(
                this.BalancerVault.address,
                this.tokenNumber * 1000000000000000000,
            )
            console.log(addCalled)
            this.transaction(addCalled).then(res => {
              console.log(res)

              //发起交易
              const balancerCalled = this.BalancerVault["joinPool"].call(
                  this.poolId,
                  this.account,
                  this.account,
                  [
                    address,
                    amountIn,
                    this.userdata,
                    false
                  ]
              )
              console.log(balancerCalled)
              this.transaction(balancerCalled).then(res => {
                console.log(res)
              })

            })

          })
          break;
        case "remove":

          break;
      }

      this.dialogShow = false
    },
    async transaction(called) {

      // return await portal.sendTransaction({
      //     from: this.account,
      //     to: called.to,
      //     data: called.data,
      //   }).excuted()
      return new Promise((resolve, reject) => {
        portal.sendTransaction({
          from: this.account,
          to: called.to,
          data: called.data,
        }).then(res => {
          console.log(res)
          setTimeout(() => {
            resolve(res)
          }, 8000)
          // await this.wait(3000)
          
        }).catch(error => {
          reject(error)
        })
      })
    },
    wait(time) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, time)
      })
    },

    changeTab(type) {
      console.log("type",type)
      this.selectPools = type === "P";
      // this.$router.push('/pools');
      this.$router.push({
        name: 'trade',
        params: {
          selectPools: this.selectPools
        }
      })
    }
  }
}
</script>

<style scoped>
span {
  line-height: 22px;
  font-size: 14px;
}

.card {
  margin-top: 3rem;
}

.msg-dialog-inner {
  width: 90%;
  margin: 0 auto;
}

.el-tag {
  line-height: 30px;
  /*color: var(te);*/
  /*font-size: 16px;*/
}

.el-button--warning.is-plain {
  background-color: var(--purple-dark) !important;
  border-color: var(--purple-dark-shade) !important;
  color: white !important;
}

.el-button--warning.is-plain:hover {
  background-color: var(--purple) !important;
  border-color: var(--purple-dark-shade) !important;
  color: white !important;
}

.el-button--warning {
  background-color: #46307b !important;
  border-color: var(--purple-dark-shade) !important;
  font-weight: bold !important;
}

.el-button--warning:hover {
  background-color: var(--purple) !important;
  border-color: var(--purple-dark-shade) !important;
  font-weight: bold !important;
}

/*>>> .el-dialog__headerbtn .el-dialog__close {*/
/*  color: #ffffff!important;*/
/*}*/
</style>
<style>
.el-button--warning {
  background-color: var(--purple-dark) !important;
  border-color: var(--purple-dark-shade) !important;
  font-weight: bold !important;
}

.el-button--warning:hover {
  background-color: var(--purple) !important;
  border-color: var(--purple-dark-shade) !important;
  font-weight: bold !important;
}
/*.el-button--warning {*/
/*  background-color: #6d7894 !important;*/
/*  border-color: #6d7894 !important;*/
/*  font-weight: bold !important;*/
/*}*/

/*.el-button--warning:hover {*/
/*  background-color: #a7b6c2 !important;*/
/*  border-color: #a7b6c2 !important;*/
/*  font-weight: bold !important;*/
/*}*/
/*.el-dialog__title {*/
/*  color: white!important;*/
/*}*/
.msg-dialog .el-dialog {
  width: 30% !important;
  border-radius: 7px;
  /*background: linear-gradient(30deg, rgb(201, 183, 225), #ffffff);*/
  /*background: linear-gradient(30deg, #7a3e99, #361d7a);*/
  background-color: white;
  /*background-color: #474d5d;*/
}
</style>
