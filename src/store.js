import Vue from 'vue'
import Vuex from 'vuex'
import init from "./network/init";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: null,
    account: null,
  },
  mutations: {
    initAccount(state) {
      state.walletDialog = false;
      state.web3 = init.web3;
      state.account = init.getAccounts();
    },
  },
  actions: {
    // init({commit}) {
    //   contract.init().then(() => {
    //     commit("initContract");
    //   }).catch(err => {
    //     console.error(err);
    //   });
    // },
    getAccount({commit}) {
      init.getWeb3().then(() => {
        init.getAcc().then(() => {
          commit("initAccount");
        }).catch(err => {
          console.error(err);
        });
        // commit("initAccount");
      }).catch(err => {
        console.error(err);
      });
    }
  }
})
