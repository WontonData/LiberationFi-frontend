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


  async sign(param) {

    const msgParams = createSigMessage(
        param.address,
        this.getAccount(),
        param.spender,);
    console.log(msgParams)
    const acc = this.getAccount()
    //r:0x9c1144dbac0ee058112b115d74c98d6788e1cd8221e2352062cafc5b809c279a
    // s:0x5b524b59688dcc32f8d400d8898182b5dd723d8818a919162b39f642617d5bf0
    //  v:0x1c

    // r:0x451aa907d31abb3d8014741de048aac4f9b7fb6d3e50010d2ee5cb582b562a29
    // s:0x0a05a643cb40c3f9792f9ad81380e21dae49ea861de1b71c90c5d976076a1f00
    // v:0x1b

    //r:0x5eba6fc8d98ce5d6a3603249d1e93e6689fedc8051990a3f3fc2eef332042591
    //s:0x67b197cc1f1b7c26889ba1a9ab1a6f27749f2f0a0812183cbb65b5337124b1d5
    //v:0x1c

    //r:0xe8278ebea02f137f5a5ddcaeb1cfdc5cba9b874d0382f4ac810225cafc5d3c7c
    //s:0x63e402bdc5153c4be90ea7a57b9c00765760e7774fa9f6f7dabed2a5c37c39bc
    //v:0x1b

    //r:0x75c4cc109df18bf9ca88d1b9a076cf83d935dd74d5a26234273d87c9bde3fe6f
    //s:0x3eff39b074aeb28618b58f7df5e06e448261f72439816a95df17870df8add116
    //v:0x1c
    let params = [acc, msgParams]

    return new Promise((resolve, reject) => {
      this.conflux.sendAsync({
        chainId: 1,
        method: 'cfx_signTypedData_v4',
        params,
        from: acc
      }, (err, sign) => {
        resolve(sign)

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
  async _sign(param) {

    const msgParams = createSigMessage(
        param.address,
        this.getAccount(),
        param.spender,
        param.name,
        1,
        param.nonces);
    console.log(msgParams)
    const acc = this.getAccount()
    let params = [acc, msgParams]

    return new Promise((resolve, reject) => {
      this.conflux.sendAsync({
        chainId: 1,
        method: 'cfx_signTypedData_v4',
        params,
        from: acc
      }, (err, sign) => {
        let res = {
          sig: "",
          r: "",
          s: "",
          v: ""
        }

        res.sig = sign.result;
        // console.log('signature', sig);
        res.r = '0x' + res.sig.substring(2).substring(0, 64);
        res.s = '0x' + res.sig.substring(2).substring(64, 128);
        res.v = '0x' + res.sig.substring(2).substring(128, 130);
        // console.log("r:" + r)
        // console.log("s:" + s)
        // console.log("v:" + v)

        resolve(res)
      })
    })
  }
}

function createSigMessage(contract, owner, spender,name = "USDA", chainId = 1 , nonce = 0, version = 1) {
  const deadline = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

  const types = {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
    Permit: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' }
    ]
  };
  const primaryType = 'Permit';
  const domain = {name: name, version: version, chainId, verifyingContract: contract};
  // const message = {owner, spender, value: '100000000000000000000', nonce, deadline};//签名内容
  const message = {
    "owner": owner,
    "spender": spender,
    "value": '100000000000000000000',
    "nonce": nonce,
    "deadline": deadline
  }
  return JSON.stringify({types, primaryType, domain, message});
}

export default new ConfluxPortal(window.conflux);
