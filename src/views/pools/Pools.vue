<template>
  <div>
    <el-row>
      <el-col :span="4" :offset="8">
        <div @click="changeTab('P')" :class="selectPools? 'trade-title select' : 'trade-title'"><h2>Principal Pools</h2>
        </div>
      </el-col>
      <el-col :span="4">
        <div @click="changeTab('T')" :class="selectPools? 'trade-title' : 'trade-title select'"><h2>Yield Pools</h2>
        </div>
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
        <trade-card class="card" @mint="mint" :token="token" :tokenName="tokenName"/>
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
    ...mapState(["account", "USDA", "InterestToken", "Tranche", "CCPool", "WeightPool", "BalancerVault"]),
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
      limit: 0,
      selectPools: true,
    }
  },
  methods: {
    getRouterData() {
      this.token = this.$route.params.token
      this.type = this.$route.params.type
      if (this.type === "Y") {
        this.tokenName = this.token.token3
        this.tokenAddress = this.token.interestToken
        this.poolId = this.token.poolId2
        this.poolContract = this.WeightPool
        this.tokenContract = this.InterestToken
      } else {
        this.tokenName = this.token.token2
        this.tokenAddress = this.token.tranche
        this.poolId = this.token.poolId1
        this.poolContract = this.CCPool
        this.tokenContract = this.Tranche
      }
      console.log(this.$route.params)
      console.log(this.token)

      this.BalancerVault.getPoolTokens(this.poolId).then(res => {
        console.log(res)
        this.token.xReserves = res[1][0].toString()
        this.token.yReserves = res[1][1].toString()
      })
      this.poolContract.totalSupply().then(res => {
        console.log(res)
        this.token.totalSupply = res.toString()
        console.log(this.token.totalSupply)
      })
      this.CCPool.unitSeconds().then(res => {
        console.log(res)
        this.token.unitSeconds = res.toString()
        console.log(this.token.unitSeconds)
      })
    },
    //类型 主币数量 收益币数量
    mint(type, tokenNumber, YPNumber, limit) {
      this.transactionType = type
      this.tokenNumber = tokenNumber * 1
      this.YPNumber = YPNumber * 1
      this.limit = limit * 1

      this.dialogShow = true
    },
    getUserData() {
      const initialBalances = [ethers.BigNumber.from(this.tokenNumber).pow(18).mul(100),
        ethers.BigNumber.from(this.YPNumber).pow(18).mul(100)];
      const JOIN_KIND_INIT = 0;
      const initUserData =
          ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256[]'],
              [JOIN_KIND_INIT, initialBalances]);
      const userdata = ethers.utils.defaultAbiCoder.encode(["uint256[]"], [initialBalances]);
      console.log("userdata:" + userdata);
      console.log("initUserData:" + initUserData);
      console.log("amountA:" + initialBalances[0].toString());
      console.log("amountB:" + initialBalances[1].toString());
      return [userdata, initUserData]

    },
    tradeSure() {
      // if (this.type === "Y") {
      //   this.userdata = this.getUserData()[1]
      // } else {
      //   this.userdata = this.getUserData()[0]
      // }

      switch (this.transactionType) {
        case "buy":
          //授权
          let buyCalled = this.USDA["approve"].call(
              this.BalancerVault.address,
              this.tokenNumber * 1000000000000000000,
          )
          console.log(buyCalled)
          this.transaction(buyCalled).then(res => {
            console.log(res)
            const balancerCalled = this.BalancerVault["swap"].call(
                [this.poolId,
                  0,
                  this.USDA.address,
                  this.tokenAddress,
                  this.tokenNumber * 1000000000000000000,
                  '0x00'],
                [this.account,
                  false,
                  this.account,
                  false,],
                this.YPNumber * 1000000000000000000,
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
                  this.USDA.address,
                  this.YPNumber * 1000000000000000000,
                  '0x00'],
                [this.account,
                  false,
                  this.account,
                  false,],
                this.limit * 1000000000000000000,
                '1733023038'
            )
            console.log(balancerCalled)
            this.transaction(balancerCalled).then(res => {
              console.log(res)
            })
          })
          break;
        case "add":

          break;
        case "remove":

          break;
      }

      this.dialogShow = false
    },
    transaction(called) {
      return new Promise((resolve, reject) => {
        portal.sendTransaction({
          from: this.account,
          to: called.to,
          data: called.data,
        }).then(res => {
          console.log(res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },


    changeTab(type) {
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
  background-color: var(--purple) !important;
  border-color: var(--purple-dark-shade) !important;
  color: white !important;
}

.el-button--warning.is-plain:hover {
  background-color: var(--purple-dark) !important;
  border-color: var(--purple-dark-shade) !important;
  color: white !important;
}
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

.msg-dialog .el-dialog {
  width: 30% !important;
  border-radius: 7px;
  background: linear-gradient(30deg, rgb(201, 183, 225), #ffffff);
  /*background-color: white;*/
}
</style>
