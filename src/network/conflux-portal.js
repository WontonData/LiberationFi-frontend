import {util,format} from "js-conflux-sdk";
// const util = require('js-conflux-sdk/src/util');
import {conflux} from "@/network/conflux";

class ConfluxPortal {
  constructor(conflux) {
    try{
      if (typeof conflux === "undefined") {
        throw new Error("No Conflux detected");
      }
      if (!conflux.isConfluxPortal) {
        console.debug("Unknown Conflux.");
      }
      this.conflux = conflux;
      // window._conflux = conflux
    }catch(e){
        console.error(e)
    }
    
    
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

  geConflux() {
    return this.conflux;
  }

  //发送交易
  async sendTransaction(params) {
    console.log(params)
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

  // async _sendTransaction(params) {
  //   console.log(params)
  //   return new Promise((resolve, reject) => { this.conflux.send('cfx_sendTransaction',{
  //       method: 'cfx_sendTransaction',
  //       params: [params],
  //       from: params.from,
  //       gasPrice: '0x09184e72a000', // customizable by user during ConfluxPortal confirmation.
  //       gas: '0x2710',  // customizable by user during ConfluxPortal confirmation.
  //       value: '0x00',
  //     }).on('confirmation',(confirmationNumber,receipt)=>{
  //       resolve(receipt)
  //     })
  //   })
  // }

  async _sign(param) {

    const msgParams = createSigMessage(
        param.address,
        this.getAccount(),
        param.spender,
        param.value,
        param.name,
        1,
        param.nonces);
    // console.log(JSON.stringify(JSON.parse(msgParams),undefined, 2))
    const acc = this.getAccount()
    let params = [acc, msgParams]

    return new Promise((resolve, reject) => {
      this.conflux.sendAsync({
        chainId: 1,
        method: 'cfx_signTypedData_v4',
        params,
        from: acc
      }, (err, sign) => {
        if(err){
          reject("sign error!")
        }else{
          let res = {
            sig: "",
            r: "",
            s: "",
            v: ""
          }
  
          res.sig = sign.result;
          // console.log('signature', sign);
          res.r = '0x' + res.sig.substring(2).substring(0, 64);
          res.s = '0x' + res.sig.substring(2).substring(64, 128);
          res.v = '0x' + res.sig.substring(2).substring(128, 130);
  
          resolve(res)
        }
        
      })
    })
  }
}

function createSigMessage(contract, owner, spender, value, name = "USDA", chainId = 1 , nonce = 0, version = "1") {
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
    "value": value,
    "nonce": nonce,
    "deadline": deadline
  }
  return JSON.stringify({types, primaryType, domain, message});
}

export default new ConfluxPortal(window.conflux);
