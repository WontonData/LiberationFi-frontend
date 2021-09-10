import Vue from 'vue'
import Vuex from 'vuex'
// import init from "./network/init";
import da from "element-ui/src/locale/lang/da";
import * as contract from "./network/conflux";
import portal from "./network/conflux-portal";
import {BalancerVault, CCPool, WeightPool} from "./network/conflux";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: null,
    account: null,
    conflux: null,
    ConvergentPoolFactory: null,
    ConvergentCurvePool: null,
    TrancheFactory: null,
    Tranche: null,
    InterestToken: null,
    UserProxy: null,
    BalancerVault: null,
    CCPool: null,
    WeightPool: null,
    USDA: null
  },
  mutations: {
    initAccount(state) {
      state.walletDialog = false;
      state.account = portal.getAccount();
    },
    initContract(state) {
      state.conflux = contract.conflux;
      state.ConvergentCurvePool = contract.ConvergentCurvePool;
      state.TrancheFactory = contract.TrancheFactory;
      state.Tranche = contract.eP;
      state.InterestToken = contract.eY;
      state.UserProxy = contract.UserProxy;
      state.BalancerVault = contract.BalancerVault;
      state.CCPool = contract.CCPool;
      state.WeightPool = contract.WeightPool;
      state.USDA = contract.USDA;
    },
  },
  actions: {
    getAccount({commit}) {
      portal.enable().then(() => {
        commit("initAccount");
      }).catch(err => {
        console.error(err);
      });
    },
    UserProxy_mint({state}, data) {

      const called = state.UserProxy['mint'].call(
          data._amount,
          data._underlying,
          data._expiration,
          data._position,
          data._permitCallData
      )
      console.log(called)

      return new Promise((resolve, reject) => {
        portal.sendTransaction({
          from: state.account,
          to: called.to,
          data: called.data,
        }).then(res => {
          console.log(res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })

      })

    },

  }
})
