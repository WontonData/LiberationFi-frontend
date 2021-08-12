<template>
  <div class="header">
    <NavHome :menuData=menuData >
      <template #logo>
        <span class="logo">WontonData</span>
      </template>
      <template #account>

      </template>
      <template #more>
        <div class="dropdown">
          <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            Docs<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="clearfix">Documentation</el-dropdown-item>
              <el-dropdown-item class="clearfix">Paper</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <span class="kongGe"></span>

          <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            Community<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="clearfix">Discord</el-dropdown-item>
              <el-dropdown-item class="clearfix">Twitter</el-dropdown-item>
              <el-dropdown-item class="clearfix">Github</el-dropdown-item>
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
          {
            name: "Save", routerPath: "/save"
          },
          {
            name: "Earn", routerPath: "/earn"
          },
          {
            name: "Trade", routerPath: "/pools"
          },
          {
            name: "Build", routerPath: "/build"
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
  .kongGe{
    margin-right: 30px;
  }

   .el-dropdown {
     display: inline-block;
     position: relative;
     color: #ffffff;
     font-size: 14px;
   }

  .el-dropdown-menu__item {
    list-style: none;
    line-height: 36px;
    padding: 0 20px;
    margin: 0;
    font-size: 14px;
    color: #606266;
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
    background-color: rgba(59, 79, 92, 0.2);
    border: 1px solid #30404d;
    border-radius: 4px;
    box-shadow: #a7b6c2;
  }

  .el-dropdown-menu__item[data-v-58b75759] {
    list-style: none;
    line-height: 36px;
    padding: 0 20px;
    margin: 0;
    font-size: 14px;
    color: white;
    cursor: pointer;
    outline: 0;
    background-color: rgba(236, 245, 255, 0) !important;
  }

  .el-popper[x-placement^=bottom] .popper__arrow::after {
    top: 1px;
    margin-left: -6px;
    border-top-width: 0;
    border-bottom-color: #30404d!important;
  }

  .el-popper[x-placement^=bottom] .popper__arrow {
    top: -6px;
    left: 50%;
    margin-right: 3px;
    border-top-width: 0;
    border-bottom-color: #30404d!important;
  }

  .el-dropdown-menu__item[data-v-58b75759][data-v-58b75759]:hover {
    color: #b3d8ff;
  }
</style>