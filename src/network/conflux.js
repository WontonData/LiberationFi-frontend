const {Conflux} = require('js-conflux-sdk');

export const conflux = new Conflux({
  url: 'http://test.confluxrpc.org/v2',
  networkId: 1,
  logger: console, // for debug
});

export const UserProxy = conflux.Contract({
  abi: require("./abi/UserProxy.json"),
  address: 'CFXTEST:TYPE.CONTRACT:ACH1FEKHSD4DTK50D3Y3346PRM0PH7WW8AAT4GZNEV'
});

export const BalancerVault = conflux.Contract({
  abi: require("./abi/BalancerVault.json"),
  address: 'cfxtest:acazsk01urtgfmvjzw2y5yj3fu91cr89dj4ecmyp9f'
});

export const USDA = conflux.Contract({
  abi: require("./abi/USDA.json"),
  address: 'cfxtest:acgfgvhxwfeduu07a6pf6u538aj7at2veasb6fxhu0'
});

export const USDAeP = conflux.Contract({
  abi: require("./abi/Tranche.json"),
  address: 'cfxtest:achy04gdsz9b3w6uv8yg65w3rhf3x9m6325115x9zt'
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

export default {
  conflux,
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