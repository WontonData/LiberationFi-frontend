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

  const DonateFactory = conflux.Contract({
    abi: require("./abi/abiDonateFactory.json"),
    address: "cfxtest:type.contract:acd5g4xhzzkgeey5bha8kpswxns0ac3kk63bauugkg",
  });

  console.log(DonateFactory)

  console.log();

  const data = await TrancheFactory.getData()
  // DonateFactory.charities(2).call()
      TrancheFactory.getData().call()
      .then(res => {
        console.log(res)
      //   const Donate = conflux.Contract({
      //     abi: require("./abi/abiCharity.json"),
      //     address: res,
      //   });
      //   Donate.Info().call().then(res => {
      //     console.log(res)
      //   })
      })
  console.log(data.toString());

  //     .then(res => {
  //   console.log(res)
  // })
}

main();


export default conflux