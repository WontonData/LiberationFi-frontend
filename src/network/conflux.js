const {Conflux, Drip} = require('js-conflux-sdk');
// const util = require('js-conflux-sdk/src/util');

import TrancheFactoryAbi from './abi/TrancheFactory.json'

const TrancheFactoryAddress = '0x82184314D27B9e63Bf16AC2005059086566a9A9f'
// import {abi, bytecode} from './abi/test.json'

export const conflux = new Conflux({
  url: 'http://test.confluxrpc.org/v2',
  networkId: 1,
  logger: console, // for debug
});

export const InterestTokenFactory = conflux.Contract({
  abi: require("./abi/InterestTokenFactory.json"),
  address: 'cfxtest:accf9dtkkvgh33be9jspt95kvdn2r80veuazn6k0uy'
});

export const DateString = conflux.Contract({
  abi: require("./abi/DateString.json"),
  address: 'cfxtest:aceexxjxcrf9m4fgfpk5rrr23nv2mr5pky72jxzsga'
});

export const TrancheFactory = conflux.Contract({
  abi: require("./abi/TrancheFactory.json"),
  address: 'cfxtest:acfab1dxxam2xxtf9ku1gh5vjkhah8uvjp8khytsgw'
  //ByteCode:7a4b34572d88f842f2ddfa78630d39b85cdfb0b711176aa599bf3192b8bd5395
});

export const WCFX = conflux.Contract({
  abi: require("./abi/WCFX.json"),
  address: 'cfxtest:acbbuu2y4k736279c40cabjfwcdfp4y4x66eep7ee1'
});

export const UserProxy = conflux.Contract({
  abi: require("./abi/UserProxy.json"),
  address: 'cfxtest:acfr36z84u1t9km1j3c3ppb0tcas88r5se30k3e8bx'
});

export const USDA = conflux.Contract({
  abi: require("./abi/USDA.json"),
  address: 'cfxtest:acgfgvhxwfeduu07a6pf6u538aj7at2veasb6fxhu0'
});

export const Yault_xUSDA = conflux.Contract({
  abi: require("./abi/Yault_xUSDA.json"),
  address: 'cfxtest:acav86b6evga8h1vs0v4nhrev326912xspn6trz4gg'
});

export const YVaultAssetProxy = conflux.Contract({
  abi: require("./abi/YVaultAssetProxy.json"),
  address: 'cfxtest:acaerfrd3m80tasx02ghkgwywkerbzdrup0dzt0x9s'
});

async function main() {
  // use conflux to get balance (in Drip) of a conflux address
  const address = 'cfxtest:aatjmdpyhmgf1wbe3h4b3m6x7yy7esd0525m76vk3m';
  const balance = await conflux.getBalance(address);
  console.log(balance);
  // const account = conflux.wallet.addPrivateKey('0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef');

  const TrancheFactory = conflux.Contract({
    abi: require("./abi/TrancheFactory.json"),
    address: 'cfxtest:acc8skess5tg8eg9zuvmuj8vxysgca0w9uvtgjmkzn'
  });

  console.log();

  const data = await TrancheFactory.getData()
  // DonateFactory.charities(2).call()
      TrancheFactory.getData().call()
      .then(res => {
        console.log(res)
      })
  console.log(data.toString());

}

main();


export default {
  conflux,
  InterestTokenFactory,
  DateString,
  TrancheFactory,
  WCFX,
  UserProxy,
  USDA,
  Yault_xUSDA,
  YVaultAssetProxy
}