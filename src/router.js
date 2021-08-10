import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Earn from "./views/earn/Earn";
import Pools from "./views/pools/Pools";
import Trade from "./views/Trade/Trade";
import Portfolio from "./views/portfolio/Portfolio";
import About from "./views/About";

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
          component: Pools,
          meta: {
            title: "Pools"
          },
        },
        {
          path: '/pools',
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
