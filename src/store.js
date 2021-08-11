import Vue from 'vue'
import Vuex from 'vuex'
import init from "./network/init";

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
      state.web3 = init.web3;
      state.ConvergentPoolFactory = init.getContract()[0];
      state.TrancheFactory = init.getContract()[1];
    }
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
      // init.getWeb3().then(() => {
        init.getAcc().then(() => {
          commit("initAccount");
        }).catch(err => {
          console.error(err);
        });
        // commit("initAccount");
      // }).catch(err => {
      //   console.error(err);
      // });
    }
  }
})
