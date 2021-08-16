<template>
  <el-row>
    <el-col class="card-col" :span="20" :offset="2">
      <div style="width: 17%">
        <div class="left">
          <img alt="美元" :src="'img/token/' + token.icon + '.svg'" height="38" width="38">
        </div>
        <item-text class="left" :data=token.name title="向往金库"/>
      </div>
      <div style="width: 12%">
        <item-text :data="token.elementTVL + ' 美元'"/>
      </div>
      <div style="width: 10%">
        <item-text :data="token.vaultAPY + '%'"/>
      </div>
      <div style="width: 7%">
        <item-text :data="token.lpAPY1 + '%'" title="主要的"/>
        <item-text :data="token.lpAPY2 + '%'" title="屈服"/>
      </div>
      <div style="width: 12%">
        <item-text :data="token.liquidity1 + ' 美元'" title="本金池"/>
        <item-text :data="token.liquidity2 + ' 美元'" title="收益池"/>
      </div>
      <div style="width: 9%">
        <item-text :data="token.price1" title="主体代币"/>
        <item-text :data="token.price2" title="收益代币"/>
      </div>
      <div style="width: 8%">
        <item-text :data="token.fixedAPR + '%'"/>
      </div>
      <div style="width: 18%">
        <item-time :time="token.term" day="88天" rest="2 个月，还有 20 天"/>

      </div>
      <div style="width: 7%">
        <el-button type="warning" class="show" plain @click="showCard">Mint</el-button>
<!--        <button @click="showCard" class="show" type="button">显示</button>-->
      </div>
    </el-col>
    <transition name="el-zoom-in-top">
      <eran-table-inner-item v-show="show"/>
    </transition>
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
  margin-top: 40px!important;
}

.el-col div {
  padding: 10px;

}

.el-col {
  box-shadow: 0 5px 7px -5px rgba(0, 0, 0, .6);
  background-color: var(--purple-card);
  display: flex;
  border-radius: 7px;
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