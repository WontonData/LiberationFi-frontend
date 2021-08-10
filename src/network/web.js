var Web3 = require('web3');
var web3 = new Web3("https://ropsten.infura.io/v3");
// var web3 = new Web3("https://rpc.slock.it/goerli");

// var web3 = new Web3(Web3.givenProvider);
var privateKey = "0a83fb83e86946bef4334d80b4400ee3a896c2137b5d41f2d2de8d4a8b613114";
var contractAbi = [
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "getName",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "payETH",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }, {
    "inputs": [{"internalType": "string", "name": "_name", "type": "string"}],
    "name": "setName",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {"stateMutability": "payable", "type": "receive"}];
var contractAddress = "0xb19c13d0A37cDDE5c1F969a0d9BD6a50B3A11B4E"
var hello = new web3.eth.Contract(contractAbi, contractAddress);

//新建web3实例，获取区块1的信息
web3.eth.getBlock(1, function (error, result) {
  if (!error)
    console.log(result)
  else
    console.error(error);
})

console.log(web3.providers)

main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });


async function main() {
  await getName();
  await getBalance();
  // await setName()
  await reviceETH();

}

async function getName() {
  var name = await hello.methods.getName().call();
  console.log(name);
}

async function getBalance() {
  var balance = await hello.methods.getBalance().call();
  console.log("balance = " + balance);
}

async function setName() {
  var name = "Jack";
  // var functionEncode = await hello.methods.setName(name).encodeABI();
  // var sign = await web3.eth.accounts.signTransaction({
  //   gas: 300000,
  //   to: contractAddress,
  //   data: functionEncode,
  // }, privateKey);
  // var result = await web3.eth.sendSignedTransaction(sign.rawTransaction);
  // console.log("setName txHash = " + result.transactionHash);

  await hello.methods.setName(name)
      .send({from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'})
      .on('transactionHash', function (hash) {
        console.log("hash:", hash);
        data.methods.getName().call(null, function (error, result) {
          console.log("the data:" + result);
        });
      });
}

async function reviceETH() {
  var ethValue = 100;
  var functionEncode = await hello.methods.reviceETH().encodeABI();
  var sign = await web3.eth.accounts.signTransaction({
    gas: 300000,
    to: contractAddress,
    data: functionEncode,
    value: ethValue
  }, privateKey);
  var result = await web3.eth.sendSignedTransaction(sign.rawTransaction);
  console.log("reviceETH resultTxHash = " + result.transactionHash);
}
