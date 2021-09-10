const {Conflux, sign} = require('js-conflux-sdk');

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
  address: 'cfxtest:acgk31mt25khe2mhc6ak60c1u0c49wa5xjjnrrddbv'
  //ByteCode:7a4b34572d88f842f2ddfa78630d39b85cdfb0b711176aa599bf3192b8bd5395
});

export const WCFX = conflux.Contract({
  abi: require("./abi/WCFX.json"),
  address: 'cfxtest:acbbuu2y4k736279c40cabjfwcdfp4y4x66eep7ee1'
});

export const UserProxy = conflux.Contract({
  abi: require("./abi/UserProxy.json"),
  address: 'cfxtest:acc8k6yz4s9fxu85j397b1k1je1jzferxpgr65ngzx'
});

export const ConvergentCurvePool = conflux.Contract({
  abi: require("./abi/ConvergentCurvePool.json"),
  address: 'cfxtest:acd65b7yyuaxbng4949ty41sadxakcc48eszd1hr3r'
});

export const USDA = conflux.Contract({
  abi: require("./abi/USDA.json"),
  address: 'cfxtest:acgfgvhxwfeduu07a6pf6u538aj7at2veasb6fxhu0'
});

export const Yault_xUSDA = conflux.Contract({
  abi: require("./abi/Yault_xUSDA.json"),
  address: 'cfxtest:acfj6eu4w68d0732kn77afa9agrj9uzpmpeyvsue5g'
});

export const YVaultAssetProxy = conflux.Contract({
  abi: require("./abi/YVaultAssetProxy.json"),
  address: 'cfxtest:acfkmkfse864y16cn9261y5j2785d75rmeed68hskd'
});

export const eP = conflux.Contract({
  abi: require("./abi/Tranche.json"),
  address: 'cfxtest:acc9k14s6k76wau198gu0yy8wyfe53kdu2cr19tkmv'
});

export const eY = conflux.Contract({
  abi: require("./abi/InterestToken.json"),
  address: 'cfxtest:acegc96nmps0hb7we2zb29d5eth1f5fcv6bu6jwp3j'
});



export default {
  conflux,
  InterestTokenFactory,
  DateString,
  TrancheFactory,
  WCFX,
  UserProxy,
  ConvergentCurvePool,
  USDA,
  Yault_xUSDA,
  YVaultAssetProxy,
}