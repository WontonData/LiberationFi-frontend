import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Earn from "./views/earn/Earn";
import Pools from "./views/pools/Pools";
import Trade from "./views/Trade/Trade";
import Portfolio from "./views/portfolio/Portfolio";
import About from "./views/About";
import Save from "./views/Save/Save";
import Build from "./views/Build/Build";
import home from "./views/home/home";

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          redirect: '/home',
        },
        {
          path: '/home',
          component: home,
          meta: {
            title: "home"
          },
        },
        {
          path: '/save',
          component: Save,
          meta: {
            title: "Save"
          },
        },
        {
          path: '/build',
          component: Build,
          meta: {
            title: "Build"
          },
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      children: [
        {
          path: '/',
          redirect: '/earn',
        },
        {
          path: '/earn',
          component: Earn,
          meta: {
            title: "Earn"
          },
        },
        {
          path: '/pools',
          component: Pools,
          meta: {
            title: "Pools"
          },
        },
        {
          path: '/pools/:address',
          component: Trade,
          props: true,
          meta: {
            title: "Trade"
          },
        },
        {
          path: '/portfolio',
          component: Portfolio,
          meta: {
            title: "Portfolio"
          },
        },
      ]
    }
  ]
})
