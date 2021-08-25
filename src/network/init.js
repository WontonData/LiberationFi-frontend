
import Web3 from "web3";
import ConvergentPoolFactoryAbi from './abi/ConvergentPoolFactory.json'
import ConvergentCurvePoolAbi from './abi/ConvergentCurvePool.json'
import TrancheFactoryAbi from './abi/TrancheFactory.json'
import ERC20Abi from './abi/IERC20.json'

// 检查是否是新的MetaMask 或 DApp浏览器
var web3Provider;
let web3;

//合约
let ConvergentPoolFactory;
let ConvergentCurvePool;
let TrancheFactory;
let ERC20;

const getWeb3 = async () => {
  if (window.ethereum) {
    web3Provider = window.ethereum;
  } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
    web3Provider = window.web3.currentProvider;
  } else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
  }
  web3 = new Web3(web3Provider);

  ConvergentPoolFactory =
      new web3.eth.Contract(ConvergentPoolFactoryAbi, '0x0766B218517d9dC198155f0dC3485270cF788aF7');
  ConvergentCurvePool =
      new web3.eth.Contract(ConvergentCurvePoolAbi, '0x4294005520c453EB8Fa66F53042cfC79707855c4');
  TrancheFactory =
      new web3.eth.Contract(TrancheFactoryAbi, '0x5690332C2f0c12F00c147cE350d95B19a0C24f14');
  ERC20 =
      new web3.eth.Contract(ERC20Abi, '0xdcf80c068b7ffdf7273d8adae4b076bf384f711a');
  console.log(ConvergentCurvePool)

  //USDC:0x78dEca24CBa286C0f8d56370f5406B48cFCE2f86
  // ConvergentCurvePool.methods.bond().call().then(res => {
  // LP Principal Token eyUSDC:10-AUG-22-GMT 0x4294005520c453EB8Fa66F53042cfC79707855c4
  // LP Element Yield Token eyUSDC:10-AUG-22-GMT 0xCE3dE100bA6B1fd0d078a938F2d698Ed08a6a54D
  // Principal Token eyUSDC:10-AUG-22-GMT 0xDCf80C068B7fFDF7273d8ADAE4B076BF384F711A
  ERC20.methods.balanceOf("0x5938609206Bd2962c4Ee6af293bB963Ae6006727").call().then(res => {
    console.log(res)
    // resolve(res)
  }).catch(err => {
    console.log(err)
    // reject(error)
  })
  // getContract()

}

const getWeb322 = () =>
    new Promise((resolve, reject) => {
      // Wait for loading completion to avoid race conditions with web3 injection timing.
      window.addEventListener("load", async () => {
        // Modern dapp browsers...
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          console.log(web3)
          try {
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
            resolve(web3);
          } catch (error) {
            reject(error);
          }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
          // Use Mist/MetaMask's provider.
          const web3 = window.web3;
          console.log("Injected web3 detected.");
          resolve(web3);
        }
        // Fallback to localhost; use dev console port by default...
        else {
          const provider = new Web3.providers.HttpProvider(
              "http://127.0.0.1:9545"
          );
          const web3 = new Web3(provider);
          console.log("No web3 instance injected, using Local web3.");
          resolve(web3);
        }
      });
    });

let accounts;
const getAcc = async () => {
  try {
    // 请求用户授权
    accounts = await window.ethereum.enable();
  } catch (error) {
    // 用户不授权时
    console.error("User denied account access")
  }

  // 设置当前区块链帐户
  // accounts = await window.ethereum.enable()
  // const balance = await window.ethereum.getBalance()
  console.log(accounts[0])

  // 设置默认地址
  web3.eth.defaultAccount = accounts[0];
  var defaultAccount = web3.eth.defaultAccount;
  console.log(defaultAccount);

  var balance = web3.eth.getBalance(accounts[0]).then(res => {
    console.log(res); // instanceof BigNumber
    console.log(res.toString(10)); // '1000000000000'
    // console.log(res.toNumber()); // 1000000000000
  });

  // ConvergentPoolFactory.methods.create(
  //
  // ).send().then(res => {
  //   console.log(res)
  //   // resolve(res)
  // }).catch(err => {
  //   console.log(err)
  //   // reject(error)
  // })
  // return accounts[0]
  // // 获取账户ETH余额
  // Web3.eth.getBalance(accounts[0]).then(res => {
  //   var ethBalance = Web3.utils.fromWei(res, 'ether');
  //   console.log(ethBalance)
  // });
// 获取账户代币余额
//   token.methods.balanceOf(address).call().then(res => {
//     var vccBalance = Web3.utils.fromWei(res, 'ether');
//     console.log(vccBalance)
//
//   });

}

const getAccounts = () => {
  return accounts[0]
}

const getContract = () => {
  return [ConvergentPoolFactory, TrancheFactory]
}


const transfer = () => {
// transfer(){
  let value= Web3.utils.toWei('1', 'ether')
  var message = {from: this.fromAddress, to:this.toAddress, value:value};

  web3.eth.sendTransaction(message, (err, res) => {
    var output = "";
    if (!err) {
      output += res;
      this.txHash=res
    } else {
      output = "Error"+err;
    }

    console.log('转账:',output)
  })
}

const con = () => {
  // contract abi
  var abi = [{
    name: 'myConstantMethod',
    type: 'function',
    constant: true,
    inputs: [{ name: 'a', type: 'string' }],
    outputs: [{name: 'd', type: 'string' }]
  }, {
    name: 'myStateChangingMethod',
    type: 'function',
    constant: false,
    inputs: [{ name: 'a', type: 'string' }, { name: 'b', type: 'int' }],
    outputs: []
  }, {
    name: 'myEvent',
    type: 'event',
    inputs: [{name: 'a', type: 'int', indexed: true},{name: 'b', type: 'bool', indexed: false}]
  }];

// creation of contract object
  var MyContract = new web3.eth.Contract(abi, '0xc4abd0339eb8d57087278718986382264244252f');
  // MyContract = MyContract.methods

// initiate contract for an address
//   var myContractInstance = MyContract.at('0xc4abd0339eb8d57087278718986382264244252f');
  console.log(MyContract)

// call constant function
  var result = MyContract.methods.myConstantMethod('myParam');
  console.log(result) // '0x25434534534'

// send a transaction to a function
  console.log(MyContract.methods.myStateChangingMethod('someParam1', 23));;

// short hand style
// web3.eth.contract(abi).at(address).myAwesomeMethod(...);

// create filter
  var filter = MyContract.events.myEvent({a: 5}, function (error, result) {
    if (!error)
      console.log(result);
    /*
    {
        address: '0x8718986382264244252fc4abd0339eb8d5708727',
        topics: "0x12345678901234567890123456789012", "0x0000000000000000000000000000000000000000000000000000000000000005",
        data: "0x0000000000000000000000000000000000000000000000000000000000000001",
        ...
    }
    */
  });

  // data.methods.getData().call(null,function(error, result){
  //   console.log("the data:"+result);
  // });
  //
  // data.methods.setData("hello blockchain").send({from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'}).on('transactionHash', function(hash){
  //   console.log("hash:", hash);
  //   data.methods.getData().call(null,function(error, result){
  //     console.log("the data:"+result);
  //   });
  // });

}



export default {
  getWeb3,
  transfer,
  getAcc,
  con,
  web3,
  getAccounts,
  getContract
};