<template>
  <div class="header">
    <NavHome :menuData=menuData >
      <template #logo>
        <span class="logo"><a href="/">WontonData</a></span>
      </template>
      <template #more>
        <div class="dropdown">
          <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            Community<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="clearfix">Discord</el-dropdown-item>
              <el-dropdown-item class="clearfix">Twitter</el-dropdown-item>
              <el-dropdown-item class="clearfix"><el-link href="https://github.com/WontonData/LiberationFi-frontend" type="info" :underline="false">Github</el-link></el-dropdown-item>
              <el-dropdown-item class="clearfix">Blog</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </template>
    </NavHome>
  </div>
</template>

<script>
  import NavHome from "../../../components/nav/NavHome";

  export default {
    name: "Header",
    components: {
      NavHome
    },
    data() {
      return {
        menuData: [
          // {
          //   name: "Save", routerPath: "/save"
          // },
          {
            name: "Earn", routerPath: "/earn"
          },
          {
            name: "Trade", routerPath: "/pools"
          },
          {
            name: "tools", routerPath: "/tools"
          },
        ]
      }
    }
  }
</script>

<style scoped>
  .dropdown {
    padding-top: 19px;
  }

   .el-dropdown {
     display: inline-block;
     position: relative;
     color: #6fedcf;
     font-size: 16px;
     font-weight: 700;
   }

  .el-dropdown-menu__item {
    list-style: none;
    line-height: 36px;
    padding: 0 20px;
    margin: 0;
    font-size: 14px;
    color: var(--purple-card);
    cursor: pointer;
    outline: 0;
    background-color: rgba(236, 245, 255, 0) !important;
  }

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

  .el-dropdown-menu__item[data-v-58b75759] {
    list-style: none;
    line-height: 36px;
    padding: 0 20px;
    margin: 0;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
    outline: 0;
    background-color: rgba(236, 245, 255, 0) !important;
  }

  .el-popper[x-placement^=bottom] .popper__arrow::after {
    top: 1px;
    margin-left: -6px;
    border-top-width: 0;
    border-bottom-color: #ffffff!important;
  }

  .el-popper[x-placement^=bottom] .popper__arrow {
    top: -6px;
    left: 50%;
    margin-right: 3px;
    border-top-width: 0;
    border-bottom-color: #ffffff!important;
  }

  .el-dropdown-menu__item[data-v-58b75759][data-v-58b75759]:hover {
    color: #6fedcf;
  }
</style>
