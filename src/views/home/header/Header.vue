<template>
  <div class="header">
    <Nav :menuData=menuData >
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
    </Nav>
  </div>
</template>

<script>
  import Nav from "../../../components/nav/Nav";

  export default {
    name: "Header",
    components: {
      Nav
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
</style>