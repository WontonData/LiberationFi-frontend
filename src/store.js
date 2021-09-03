import Vue from 'vue'
import Vuex from 'vuex'
// import init from "./network/init";
import da from "element-ui/src/locale/lang/da";
import * as contract from "./network/conflux";
import portal from "./network/conflux-portal";

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
      state.USDA = contract.USDA;
    },
    // toMint(state) {
    //   return state.ConvergentPoolFactory.methods.governance().call()
    // }
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
          [{
            tokenContract: data.tokenContract,
            who: data.who,
            amount: data.amount,
            expiration: data.expiration,
            // r: data.r,
            // s: data.s,
            // v: data.v,
          }]
    )
      console.log(called)

      console.log(state)
      console.log(data)

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

    }
  }
})
