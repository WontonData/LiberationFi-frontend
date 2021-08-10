<template>
  <el-row >
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
      <div style="width: 11%">
        <item-text :data="token.vaultAPY + '%'"/>
      </div>
      <div style="width: 5%">
        <item-text :data="token.lpAPY1 + '%'" title="主要的"/>
        <item-text :data="token.lpAPY2 + '%'" title="屈服"/>
      </div>
      <div style="width: 11%">
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
      <div style="width: 11%">
        <button @click="showCard" class="show" type="button">显示</button>
      </div>
    </el-col>
    <transition name="el-zoom-in-top">
      <el-col v-show="show" :span="20" :offset="2">
        <div style="width: 17%">
          <div class="left">
            <img alt="美元" :src="'@/assets/token/' + token.icon + '.svg'" height="38"
                 width="38">
          </div>
          <item-text class="left" :data=token.name title="向往金库"/>
        </div>
        <div style="width: 11%">
          <item-text :data="token.elementTVL + ' 美元'"/>
        </div>
        <div style="width: 11%">
          <item-text :data="token.vaultAPY + '%'"/>
        </div>
        <div style="width: 5%">
          <item-text :data="token.lpAPY1 + '%'" title="主要的"/>
          <item-text :data="token.lpAPY2 + '%'" title="屈服"/>
        </div>
        <div style="width: 11%">
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
        <div style="width: 11%">
          <button class="show" type="button">显示</button>
        </div>
      </el-col>
    </transition>
  </el-row>
</template>

<script>
import ItemText from "./ItemText";
import ItemTime from "./ItemTime";

export default {
  name: "EranTableItem",
  components: {ItemTime, ItemText},
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
}
.top-col {
  margin-top: 20px;

}
</style>