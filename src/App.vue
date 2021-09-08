<template>
  <div id="app">
    <router-view/>
  </div>
</template>



<style>
@import "assets/css/base.css";

* {
  padding: 0px;
  margin: 0;
}


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*background-image: linear-gradient(45deg, #180c40, #484c79);*/
  background-image: linear-gradient(135deg, #150b29, rgba(27, 35, 64, 0.9));
  min-height: 100vh;
}

.el-menu.el-menu--horizontal {
   border-bottom: none!important;
}


#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
