const {Conflux} = require('js-conflux-sdk');



export const conflux = new Conflux({
  url: 'http://test.confluxrpc.org/v2',
  networkId: 1,
  logger: console, // for debug
});

// 不输出log的conflux
export const confluxJs = new Conflux({
  url: 'http://test.confluxrpc.org/v2',
  networkId: 1,
});
// console.log("conflux",window.conflux )
// export const conflux = window.conflux

export let conAddr = require('./deploy/deploy.json')
let newContract = function(abiName,address){
  return conflux.Contract({
    abi: require("./abi/"+abiName+".json"),
    address: address
  })
}

export const InterestTokenFactory = conflux.Contract({
  abi: require("./abi/InterestTokenFactory.json"),
  address: 'cfxtest:accf9dtkkvgh33be9jspt95kvdn2r80veuazn6k0uy'
});

export const TrancheFactory = conflux.Contract({
  abi: require("./abi/TrancheFactory.json"),
  address: 'cfxtest:acgk31mt25khe2mhc6ak60c1u0c49wa5xjjnrrddbv'
  //ByteCode:7a4b34572d88f842f2ddfa78630d39b85cdfb0b711176aa599bf3192b8bd5395
});


export const UserProxy = conflux.Contract({
  abi: require("./abi/UserProxy.json"),
  address: conAddr.UserProxy
});

export const BalancerVault = conflux.Contract({
  abi: require("./abi/BalancerVault.json"),
  address: 'cfxtest:acazsk01urtgfmvjzw2y5yj3fu91cr89dj4ecmyp9f'
});

export const USDA = conflux.Contract({
  abi: require("./abi/USDA.json"),
  address: 'cfxtest:acceyh5y7xjz0fyke7g2e2c3vzz1m2k4nj0m9zwvcv'
});

export const USDAeP = conflux.Contract({
  abi: require("./abi/Tranche.json"),
  address: 'cfxtest:acb1cjg4c3kef68vh6m8umdpw4j5g1tj4yhmat9wua'
});

export const USDAeY = conflux.Contract({
  abi: require("./abi/InterestToken.json"),
  address: 'cfxtest:acg2689cr42ejgu9wpbk30du2rf944cp06jx8ew6zy'
});

export const USDACCPool = conflux.Contract({
  abi: require("./abi/ConvergentCurvePool.json"),
  address: 'cfxtest:acdm6nunrjhgvtmbbdvhd0uu494hjh9ajpaa64cbr8'
});

export const USDAWeightPool = conflux.Contract({
  abi: require("./abi/WeightPool.json"),
  address: 'cfxtest:acg7ajvvs82xn7wu1zecv0utj52sxh4n26cmmp0pmf'
});

export const cDAI = conflux.Contract({
  abi: require("./abi/USDA.json"),
  address: 'cfxtest:achnwtecdj2fxkndf0rz142fuc8am9uf2udvbb5yff'
});

export const cDAIeP = conflux.Contract({
  abi: require("./abi/Tranche.json"),
  address: 'cfxtest:acfr694hjnnf1d9g8pujdpfx2m8v2gd1t606v1up9d'
});

export const cDAIeY = conflux.Contract({
  abi: require("./abi/InterestToken.json"),
  address: 'cfxtest:acbykf45uwa96f9g6xdmhh7jyt806entae2f7c9heh'
});

export const cDAICCPool = conflux.Contract({
  abi: require("./abi/ConvergentCurvePool.json"),
  address: 'cfxtest:acfvwuhctkw3zbu41z5w5dnc86cm9s9rpe7s23sxnn'
});

export const cDAIWeightPool = conflux.Contract({
  abi: require("./abi/WeightPool.json"),
  address: 'cfxtest:aceaaef25r0c0r4srvssj78kasut5mzkb6bu9p777s'
});

export let EarnTokenList = {
  cDAI: {
    name: "cDAI",
    info: conAddr["cDAI"],
    uToken: newContract("cDAI-uToken",conAddr["cDAI"].uToken),
    Vault: newContract("FVault",conAddr["cDAI"].Vault),
    FVaultAssetProxy: newContract("FVaultAssetProxy",conAddr["cDAI"].FVaultAssetProxy),
    token: [
      {
        start: 1631376000,
        expiration: 1631635200,
        pToken: newContract("Tranche",conAddr["cDAI"].token[0].pToken),
        yToken: newContract("InterestToken",conAddr["cDAI"].token[0].yToken)
      }
    ]
  },
  cUSDC: {
    name: "cUSDC",
    info: conAddr["cUSDC"],
    uToken: newContract("cDAI-uToken",conAddr["cUSDC"].uToken),
    Vault: newContract("FVault",conAddr["cUSDC"].Vault),
    FVaultAssetProxy: newContract("FVaultAssetProxy",conAddr["cUSDC"].FVaultAssetProxy),
    token: [
      {
        start: 1631376000,
        expiration: 1662987039,
        pToken: newContract("Tranche",conAddr["cUSDC"].token[0].pToken),
        yToken: newContract("InterestToken",conAddr["cUSDC"].token[0].yToken)

      }
    ]
  },
}

export default {
  conflux,
  confluxJs,
  UserProxy,
  BalancerVault,
  USDA,
  USDAeP,
  USDAeY,
  USDACCPool,
  USDAWeightPool,
  cDAI,
  cDAIeP,
  cDAIeY,
  cDAICCPool,
  cDAIWeightPool
}