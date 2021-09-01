import {util} from "js-conflux-sdk";
// const util = require('js-conflux-sdk/src/util');
import {conflux} from "@/network/conflux";

class ConfluxPortal {
  constructor(conflux) {
    if (typeof conflux === "undefined") {
      throw new Error("No Conflux detected");
    }
    if (!conflux.isConfluxPortal) {
      console.debug("Unknown Conflux.");
    }
    this.conflux = conflux;
  }

  async enable() {
    this.accounts = await this.conflux.enable()
    console.log(this.accounts);
  }

  //获取账户
  getAccount() {
    if (!this.accounts) {
      // return null;
      throw new Error("Please enable Conflux Portal first");
    }
    return this.accounts[0];
  }

  //发送交易
  async sendTransaction(params) {
    return new Promise((resolve, reject) => {
      this.conflux.sendAsync({
        method: 'cfx_sendTransaction',
        params: [params],
        from: params.from,
        gasPrice: '0x09184e72a000', // customizable by user during ConfluxPortal confirmation.
        gas: '0x2710',  // customizable by user during ConfluxPortal confirmation.
        value: '0x00',
      }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }


  async sign() {

    const msgParams = createSigMessage(
        'cfxtest:acgfgvhxwfeduu07a6pf6u538aj7at2veasb6fxhu0',
        'cfxtest:aam90kc4anf1941w2sysbpcnm31vt6eepjvvg8k231',
        '100000000000000000000');
    const acc = 'cfxtest:aam90kc4anf1941w2sysbpcnm31vt6eepjvvg8k231'
    //r:0x9c1144dbac0ee058112b115d74c98d6788e1cd8221e2352062cafc5b809c279a
    // s:0x5b524b59688dcc32f8d400d8898182b5dd723d8818a919162b39f642617d5bf0
    //  v:0x1c

    // r:0x451aa907d31abb3d8014741de048aac4f9b7fb6d3e50010d2ee5cb582b562a29
    // s:0x0a05a643cb40c3f9792f9ad81380e21dae49ea861de1b71c90c5d976076a1f00
    // v:0x1b
    let params = [acc, msgParams]

    return new Promise((resolve, reject) => {
      this.conflux.sendAsync({
        chainId: 1,
        method: 'cfx_signTypedData_v4',
        params,
        from: acc
      }, (err, sign) => {
        const sig = sign.result;
        console.log('signature', sig);
        const r = '0x' + sig.substring(2).substring(0, 64);
        const s = '0x' + sig.substring(2).substring(64, 128);
        const v = '0x' + sig.substring(2).substring(128, 130);
        console.log("r:" + r)
        console.log("s:" + s)
        console.log("v:" + v)
      })
    })
  }
}

function createSigMessage(compAddress, account, amount = 10e9, chainId = 1, nonce = 0) {
  const types = {
    approve: [
      {name: "account", type: "address"},
      {name: "amount", type: "uint256"}
    ]
  };
  const primaryType = 'approve';
  const domain = {name: 'approve', chainId, verifyingContract: compAddress};
  const message = {account, amount};//签名内容
  return JSON.stringify({types, primaryType, domain, message});
}

export default new ConfluxPortal(window.conflux);
