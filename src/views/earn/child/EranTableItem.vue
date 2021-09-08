<template>
  <el-row>
    <el-col class="card-col" :span="20" :offset="2">
      <div>
        <div style="width: 100%">
          <div style="width: 17%">
            <div class="left">
              <img alt="美元" :src="'img/token/' + token.icon + '.svg'" height="38" width="38">
            </div>
            <item-text class="left" :data=token.name title="Asset"/>
          </div>
          <div style="width: 12%">
            <item-text :data="token.elementTVL + ' 美元'"/>
          </div>
          <div style="width: 10%">
            <item-text :data="token.vaultAPY + '%'"/>
          </div>
          <div style="width: 7%">
            <item-text :data="token.lpAPY1 + '%'" title="Principal"/>
            <item-text :data="token.lpAPY2 + '%'" title="Yield"/>
          </div>
          <div style="width: 12%">
            <item-text :data="token.liquidity1 + ' 美元'" title="Principal Pool"/>
            <item-text :data="token.liquidity2 + ' 美元'" title="Yield Pool"/>
          </div>
          <div style="width: 9%">
            <item-text :data="token.price1" title="Ptoken"/>
            <item-text :data="token.price2" title="Ytoken"/>
          </div>
          <div style="width: 8%">
            <item-text :data="token.fixedAPR + '%'"/>
          </div>
          <div style="width: 18%">
            <item-time :time="token.term" day="88天" :percentage="token.proportion"/>
          </div>
          <div style="width: 7%">
            <el-button type="warning" class="show" plain @click="showCard">Mint</el-button>
            <!--        <button @click="showCard" class="show" type="button">显示</button>-->
          </div>
        </div>
        <div class="inner">
          <transition name="el-zoom-in-top">
            <eran-table-inner-item v-show="show" :token="token" :show="show"/>
          </transition>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import ItemText from "@/components/txt/ItemText";
import ItemTime from "@/components/txt/ItemTime";
import EranTableInnerItem from "./EranTableInnerItem";

export default {
  name: "EranTableItem",
  components: {EranTableInnerItem, ItemTime, ItemText},
  data() {
    return {
      show: false
    }
  },
  props: {
    token: {
      type: Object
    }
  },
  methods: {
    showCard() {
      this.show = !this.show
    }
  }
}
</script>

<style scoped>

img {
  margin-left: 10px;
  margin-right: 15px;
}

.show {
  margin-top: 40px !important;
}

.el-col div div div div {
  width: 100%;
  text-align: center;
}
.el-col div div div {
  padding: 10px;
  float: left;
  text-align: center;
}

.inner {
  width: 100%;
  float: left;
  clear: left;
}

.el-col {
  padding: 10px;
  box-shadow: 0 5px 7px -5px rgba(0, 0, 0, .6);
  background: linear-gradient(to bottom right, #7a3e99, #361d7a);
  /*background-color: var(--purple-card);*/
  display: flex;
  border-radius: 20px;
  margin-top: 10px;
  margin-bottom: 30px;
  font-weight: normal;
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  -o-transition: all .5s;
  transition: all .5s;
}

.card-col:hover {
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, .7);
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  -o-transition: all .5s;
  transition: all .5s;
}

</style>
