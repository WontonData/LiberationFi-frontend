<template>
  <el-row >
    <el-col :span="20" :offset="2">
      <div style="width: 25%">
        <div class="left">
          <img alt="美元" :src="'img/token/' + token.icon + '.svg'" height="38" width="38">
        </div>
        <item-text class="left" :data="token.token1 + ' - ' + token.token3" />
      </div>
      <div style="width: 11%">
        <item-text :data="'$' + token.liquidity2"/>
      </div>
<!--      <div style="width: 10%">-->
<!--        <item-text :data="token.fixedAPR + '%'"/>-->
<!--      </div>-->
      <div style="width: 6%">
        <item-text :data="token.lpAPY2 + '%'" />
      </div>
      <div style="width: 11%">
        <item-text :data="token.vaultAPY + '%'" />
      </div>
      <div style="width: 11%">
        <item-text :data="token.price2" :title=token.token1 />
      </div>
      <div style="width: 25%">
        <item-time :time="token.term" day="88 Day" rest="2 months, 18 days remaining"/>
      </div>
      <div style="width: 11%">
        <button @click="showCard" class="show" type="button">Trade</button>
        <!--        <button @click="showCard" class="show" type="button">LP</button>-->
      </div>
    </el-col>

  </el-row>
</template>

<script>

import ItemText from "@/components/txt/ItemText";
import ItemTime from "@/components/txt/ItemTime";


export default {
  name: "YTradeTableItem",
  components: {ItemText, ItemTime},
  props: {
    token: {
      type: Object
    }
  },
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
  color: #588bc6;
  font-size: 16px;
  margin: 35px;
}

.el-col div {
  padding: 7px;
}

.el-col {
  border: #1c1c1f .01rem solid;
  background-color: #304050;
  display: flex;
  margin-top: 20px;

}
</style>