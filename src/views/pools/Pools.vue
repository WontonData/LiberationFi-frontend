<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="9">
        <img alt="美元" class="left"  :src="'img/token/' + token.icon + '.svg'" height="45" width="45">
        <div>
          <h2>{{ token.token1 + ' - ' + tokenName }}</h2>
          <span>{{token.term}}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="10" :offset="7">
        <trade-card class="card" @mint="mint" :token="token" :tokenName="tokenName"/>
      </el-col>
    </el-row>

    <el-dialog title="信息核对" :visible.sync="dialogShow">
      信息核对
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" plain @click="dialogShow = false">取 消</el-button>
        <el-button type="warning" @click="dialogShow = false">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import ItemText from "../../components/txt/ItemText";
import TradeCard from "../../components/card/TradeCard";
export default {
  name: "Pools",
  components: {TradeCard, ItemText},
  created() {
    this.getRouterData()
  },
  data() {
    return {
      token: null,
      tokenName: '',
      type: '',
      dialogShow: false,
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
    }
  },
  methods: {
    getRouterData() {
      this.token = this.$route.params.token
      this.type = this.$route.params.type
      if (this.type === "Y") {
        this.tokenName = this.token.token3
      } else {
        this.tokenName = this.token.token2
      }
      console.log(this.$route.params)
    },
    mint() {
      this.dialogShow = true
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
</style>
<style>
.el-button--warning {
  background-color: var(--purple-dark)!important;
  border-color: var(--purple-dark-shade)!important;
}
.el-button--warning:hover {
  background-color: var(--purple) !important;
  border-color: var(--purple-dark-shade)!important;
}
</style>