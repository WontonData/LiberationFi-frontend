<template>
  <div id="app">
    <router-view/>
  </div>
</template>



<style>
* {
  padding: 0px;
  margin: 0;
}


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #232e38;
  height: 100vh;
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
