<template>
  <div class="about">
    <Nav :menuData=menuData >
      <template #logo>
        <span class="logo">WontonData</span>
      </template>
      <template #account>
        <div v-if="account">
          <span class="address">{{accountCut}}</span>
        </div>
        <el-button v-else class="wallet" type="warning" plain @click="conn">连接钱包</el-button>
<!--        <el-button type="warning" plain @click="test">test</el-button>-->
      </template>
      <template #more>
        <i class="icon el-icon-more"></i>
      </template>
    </Nav>
<!--    <button @click="tra">转账</button>-->
    <router-view/>
  </div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import init from "../network/init";
// import test from "../network/test";
import {mapActions, mapState} from "vuex";

import Nav from "../components/nav/Nav";
export default {
  name: 'about',
  components: {
    Nav
    // HelloWorld
  },
  computed: {
    ...mapState(["account", "ConvergentPoolFactory", "TrancheFactory"]),
    accountCut(){
      return this.account.substring(0,10) + "..." + this.account.substring(35,42)
    },
  },
  data() {
    return {
      menuData: [
        {
          name: "Earn", routerPath: "/earn"
        },
        {
          name: "Trade", routerPath: "/pools"
        },
        {
          name: "Portfolio", routerPath: "/portfolio"
        },
        {
          name: "Tools", routerPath: "/tools"
        },
      ]
    }
  },

  created() {

    // init.getWeb3()
  },
  methods: {
    ...mapActions(["getAccount"]),
    conn() {
      this.getAccount()
      // init.con()
    },
    test() {
      console.log(this.ConvergentPoolFactory.methods.governance().call().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      }))
      console.log(this.TrancheFactory.methods.getData().call().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      }))    }
  }
}
</script>

<style >
.logo , .address, .icon{
  font-size: 19px;
  display: flex;
  height:60px;
  letter-spacing: 1px;
  justify-content: center;
  align-items: center;
}
.address {
  font-size: 17px;

}
.icon {
  margin-top: 20px;
}
.about {
  padding-bottom: 50px;
}
</style>

<style>
.wallet {
  margin-top: 10px!important;
}
.el-button--warning.is-plain {
  background-color: transparent!important;
  border-color: var(--purple-dark-shade)!important;
  color: var(--purple-dark-shade)!important;
}
.el-button--warning.is-plain:hover {
  color: var(--purple-dark-shade)!important;
  background-color: rgba(180, 134, 209, 0.1) !important;
}
.left {
  float: left;
}
.right {
  float: right;
}
</style>