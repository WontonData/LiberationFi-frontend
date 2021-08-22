
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

  async enable () {
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

  //调用 Conflux SDK 的 getBalance 方法来更新账户余额信息
  async refreshBalance() {
    if (!this.accounts) {
      return
    }
    const balance = await conflux.getBalance(this.getAccount())
    console.log(util.unit.fromDripToCFX(balance))
    return util.unit.fromDripToCFX(balance)
    // this.setState({ balance: util.unit.fromDripToCFX(balance) })
  }
}

export default new ConfluxPortal(window.conflux);
