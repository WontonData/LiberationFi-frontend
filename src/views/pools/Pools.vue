<template>
  <div>
    <el-row>
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
          :type="type"
          :tokenNumber="tokenNumber"
          :YPNumber="YPNumber"
      />
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" plain @click="dialogShow = false">取 消</el-button>
        <el-button type="warning" @click="mintSure">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import ItemText from "../../components/txt/ItemText";
import TradeCard from "../../components/card/TradeCard";
import MsgDialog from "./child/MsgDialog";

export default {
  name: "Pools",
  components: {MsgDialog, TradeCard, ItemText},
  created() {
    this.getRouterData()
  },
  data() {
    return {
      token: null,
      tokenName: '',
      tokenAddress: '',
      type: '',
      dialogShow: false,
      tokenNumber: 0,
      YPNumber: 0
    }
  },
  methods: {
    getRouterData() {
      this.token = this.$route.params.token
      this.type = this.$route.params.type
      if (this.type === "Y") {
        this.tokenName = this.token.token3
        this.tokenAddress = this.token.interestToken
      } else {
        this.tokenName = this.token.token2
        this.tokenAddress = this.token.tranche
      }
      console.log(this.$route.params)
    },
    //类型 主币数量 收益币数量
    mint(type, tokenNumber, YPNumber) {
      this.type = type
      this.tokenNumber = tokenNumber * 1
      this.YPNumber = YPNumber * 1

      this.dialogShow = true
    },
    mintSure() {


      this.dialogShow = false
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
</style>
<style>
.el-button--warning {
  background-color: var(--purple-dark) !important;
  border-color: var(--purple-dark-shade) !important;
}

.el-button--warning:hover {
  background-color: var(--purple) !important;
  border-color: var(--purple-dark-shade) !important;
}

.msg-dialog .el-dialog {
  width: 30% !important;
  border-radius: 7px;
}
</style>