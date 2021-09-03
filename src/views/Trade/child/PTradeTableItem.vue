<template>
  <el-row >
    <el-col class="card-col" :span="20" :offset="2">
      <div style="width: 23%">
        <div >
          <img alt="美元" :src="'img/token/' + token.icon + '.svg'" height="38" width="38">
        </div>
        <item-text :data="token.token1 + ' - ' + token.token2" />
      </div>
      <div style="width: 11%">
        <item-text :data="'$' + token.liquidity1"/>
      </div>
      <div style="width: 10%">
        <item-text :data="token.fixedAPR + '%'"/>
      </div>
      <div style="width: 7%">
        <item-text :data="token.lpAPY1 + '%'" />
      </div>
      <div style="width: 11%">
        <item-text :data="token.vaultAPY + '%'" />
      </div>
      <div style="width: 9%">
        <item-text :data="token.price1" :title=token.token1 />
      </div>
      <div style="width: 18%">
        <item-time :time="token.term" day="88 Day" rest="2 个月"/>
      </div>
      <div style="width: 11%">
        <el-button type="warning" class="show" plain @click="toPool">Trade</el-button>
<!--        <button @click="showCard" class="show" type="button">LP</button>-->
      </div>
    </el-col>

  </el-row>
</template>

<script>

import ItemText from "@/components/txt/ItemText";
import ItemTime from "@/components/txt/ItemTime";

export default {
  name: "TradeTableItem",
  components: {ItemText, ItemTime},
  props: {
    token: {
      type: Object
    }
  },
  methods: {
    toPool() {
      this.$router.push({
        name: 'pool',
        params: {
          token: this.token,
          address: this.token.token1,
          type: 'P'
        }
      })
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
  margin-top: 25px!important;
}

.el-col div {
  padding: 10px;
}

.el-col {
  padding: 10px;
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