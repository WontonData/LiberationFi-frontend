<template>
  <div>
    <NavSave>
      <template #logo>
        <span class="logo">WontonData</span>
      </template>
      <template #advanced>
        <el-button type="primary" plain><i style="margin-right: 9px" class="el-icon-s-promotion"></i>Advanced UI</el-button>
      </template>
      <template #account>
        <div v-if="account">
          <span class="address">{{accountCut}}</span>
        </div>
        <el-button v-else type="warning" plain @click="conn">Connect wallet to begin</el-button>
      </template>
      <template #more>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
              <i style="font-size:30px;margin-top: 13px;color: #a0b3c2" class="el-icon-s-operation"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">About</el-dropdown-item>
            <el-dropdown-item class="clearfix">Dos</el-dropdown-item>
            <el-dropdown-item class="clearfix">Advanced UI</el-dropdown-item>
            <el-divider></el-divider>
            <el-dropdown-item class="clearfix">Get in touch</el-dropdown-item>
            <el-dropdown-item class="clearfix">Discord</el-dropdown-item>
            <el-dropdown-item class="clearfix">Twitter</el-dropdown-item>
            <el-dropdown-item class="clearfix">Telegram</el-dropdown-item>
            <el-dropdown-item class="clearfix">Medium</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
<!--        <i class="el-icon-s-operation"></i>-->
      </template>
    </NavSave>
  </div>
</template>

<script>
  import NavSave from "../../../components/nav/NavSave";
  import {mapActions, mapState} from "vuex";
  export default {
    name: "SaveHeader",
    components: {
      NavSave
    },
    computed: {
      ...mapState(["account"]),
      accountCut(){
        return this.account.substring(0,10) + "..." + this.account.substring(35,42)
      },
    },
    data() {
      return {

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
      }
    }
  }
</script>

<style scoped>

  .el-dropdown-menu {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    margin: 5px 0;
    background-color: rgba(0,0,0,0);
    border: 1px solid #2c3e50;
    border-radius: 4px;
    box-shadow: #a7b6c2;
  }

   .el-dropdown-menu__item[data-v-73b05265] {
    list-style: none;
    line-height: 36px;
    padding: 0 20px;
    margin: 0;
    font-size: 14px;
    color: var(--color-text);
  }

  .el-dropdown-menu__item[data-v-73b05265][data-v-73b05265]:hover {
    color: var(--purple);
    background-color: rgba(59, 79, 92, 0);
  }

  .clearfix {
    font-weight: bold;
  }

  .el-divider--horizontal {
    display: block;
    height: 1.7px;
    color: #a7b6c2;
    width: 90%;
    margin: 6px 7px;
  }

</style>
