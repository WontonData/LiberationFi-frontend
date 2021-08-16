<template>
  <el-row>
    <el-col class="top-col" :span="20" :offset="2">
      <div style="width: 17%">
        <div class="left">
          <img alt="美元" :src="'img/token/' + token.icon + '.svg'" height="38" width="38">
        </div>
        <item-text class="left" :data=token.name title="向往金库"/>
      </div>
      <div style="width: 11%">
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
      <div style="width: 8%">
        <button @click="showCard" class="show" type="button">显示</button>
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
  display: block;
  background-color: transparent;
  border-style: none;
  color: var(--color-background);
  font-size: 16px;
  margin: 35px;
}

.el-col div {
  padding: 10px;

}

.el-col {
  /*box-shadow: 1px 1px 5px rgba(0, 0, 0, .8);*/
  box-shadow: 0 5px 10px -5px rgba(0,0,0,.6);
  /*box-shadow: 0 5px 5px 0 rgba(0 0 0 , .14), 0 6px 4px -2px rgba(0 0 0 , .2), 0 4px 7px 0 rgba(0 0 0 , .12);*/
  /*!*border: #1c1c1f .01rem solid;*!*/
  background-color: white;
  display: flex;
  border-radius: 7px;
}


.top-col {
  margin-top: 30px;

}
</style>