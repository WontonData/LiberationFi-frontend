import Vue from 'vue'
import Vuex from 'vuex'
import init from "./network/init";
import da from "element-ui/src/locale/lang/da";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: null,
    account: null,
    ConvergentPoolFactory: null,
    TrancheFactory: null
  },
  mutations: {
    initAccount(state) {
      state.walletDialog = false;
      state.account = init.getAccounts();
    },
    initContract(state) {
      state.web3 = init.getweb3();
      state.ConvergentPoolFactory = init.getContract()[0];
      state.TrancheFactory = init.getContract()[1];
    },
    // toMint(state) {
    //   return state.ConvergentPoolFactory.methods.governance().call()
    // }
  },
  actions: {
    getContract({commit}) {
      init.getWeb3().then(() => {
        console.log("getContract")
        commit("initContract");
      }).catch(err => {
        console.error(err);
      });
    },
    getAccount({commit}) {
      init.getAcc().then(() => {
        commit("initAccount");
      }).catch(err => {
        console.error(err);
      });
    },
    mint({state}, data) {
      // console.log(state)
      console.log(data)
      state.ConvergentPoolFactory.methods.governance().call().then(res => {
        console.log(res)
        // resolve(res)
      }).catch(error => {
        // reject(error)
      })
      return new Promise((resolve, reject) => {
        state.ConvergentPoolFactory.methods.governance().call().then(res => {
          console.log(res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })

  }
}
})
