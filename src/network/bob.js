abi = [
    {
  "constant": true,
  "inputs": [],
  "name": "num",
  "outputs": [{"name": "", "type": "uint256"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "addr",
  "outputs": [{"name": "", "type": "address"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "_num", "type": "uint256"}],
  "name": "SetNum",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "name": "", "type": "address"}],
  "name": "sendAddr",
  "type": "event"
}]

var Web3 = require("web3");
var Tx = require('ethereumjs-tx');

var fs = require('fs');
const infuraKey = fs.readFileSync("./test/bob.infuraKey").toString().trim();
var web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/` + infuraKey))

//读取num属性
async function getNum(contractObj,fromAddr) {
  let myValue = await contractObj.methods.num().call({from:fromAddr});
  console.log("the num is: ",myValue);
}

function getPriKey(prikeyPath) {
  const privKeyFile = fs.readFileSync(prikeyPath).toString().trim();
  const privKey = new Buffer.from(privKeyFile, 'hex');
  return privKey
}


function sendSigned(txData, cb) {
  const privateKey = new Buffer.from(privKey, 'hex')
  const transaction = new Tx(txData)
  transaction.sign(privateKey)
  const serializedTx = transaction.serialize().toString('hex')
  web3.eth.sendSignedTransaction('0x' + serializedTx, cb)
}

function getEthRawTx(fromAddress,toAddress,contractObj,numParam,nonceNum,privKey) {
  //raw Tx
  var rawTransaction = {
    "from": fromAddress,
    "nonce": web3.utils.toHex(nonceNum),
    "gasLimit": web3.utils.toHex(6000000),
    "gasPrice": web3.utils.toHex(10e9),
    "to": toAddress,
    "value": web3.utils.toHex(0),
    "data": contractObj.methods.SetNum(numParam).encodeABI(),  //设置num属性
    "chainId": 0x04 //4:Rinkeby, 3:Ropsten, 1:mainnet
  };

  var tx = new Tx(rawTransaction);
  tx.sign(privKey);
  var serializedTx = tx.serialize();
  return serializedTx;
}

async function signTransaction(fromAddress,toAddress,contractObj,numParam,nonceNum, privKey) {
  var serializedTx = getEthRawTx(fromAddress,toAddress,contractObj,numParam,nonceNum, privKey)

  // Comment out these three lines if you don't really want to send the TX right now
  console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}`);
  var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
  console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);
}

function sleep(delay) {
  return new Promise(reslove => {
    setTimeout(reslove, delay)
  })
}

const changeNum = async (numParam) => {
  //rinkeby主账户地址
  var fromAddress = "0x6026dfb9816d22f65f1011639b207b1c3a2c2e84";

  //bob合约的abi
  var bobAbi = fs.readFileSync("./abi/ethBob.json")
  // bob合约地址
  var bobAddress = "0xe981880Ac36360A1bF4F8F2a369877dbE29Aa8d4";

  // get the nonce
  var nonceCnt = await web3.eth.getTransactionCount(fromAddress);
  console.log(`num transactions so far: ${nonceCnt}`);

  //通过ABI和地址获取已部署的合约对象
  let contract = new web3.eth.Contract(JSON.parse(bobAbi), bobAddress,{from:fromAddress});

  await getNum(contract,fromAddress);

  const privkey = getPriKey("./test/bob.prikey")
  await signTransaction(fromAddress,bobAddress,contract,numParam,nonceCnt, privkey)

  sleep(100) //100ms

  console.log("after setNum");
  await getNum(contract,fromAddress);
}

changeNum(70);

