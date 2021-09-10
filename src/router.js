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
import Sign from "./views/Sign/Sign";
import Tools from "./views/Tools/Tools";

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
        // {
        //   path: '/save',
        //   component: Save,
        //   meta: {
        //     title: "Save"
        //   },
        // },
        // {
        //   path: '/build',
        //   component: Build,
        //   meta: {
        //     title: "Build"
        //   },
        // },
      ]
    },
    {
      path: '/save',
      component: Save,
      name: 'save',
    },
    {
      path: '/build',
      component: Build,
      name: 'build',
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
          path: '/pools/:address',
          name: 'pool',
          component: Pools,
          meta: {
            title: "Pools"
          },
        },
        {
          path: '/pools',
          name: 'trade',
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
        {
          path: '/sign',
          component: Sign,
          name: 'Sign',
        },
        {
          path: '/tools',
          component: Tools,
          name: 'Tools',
        },
      ]
    },

  ]
})
