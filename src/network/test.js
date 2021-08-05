var Web3 = require('web3');
var web3 = new Web3("https://rpc.slock.it/goerli");
// 或
// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// 改变 provider
// web3.setProvider('ws://localhost:8546');
// // 或
// web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:8546'));

// 在 node.js 中使用 IPC provider
var net = require('net');
var web3 = new Web3('/Users/myuser/Library/Ethereum/geth.ipc', net); // mac os 路径
// 或
var web3 = new Web3(new Web3.providers.IpcProvider('/Users/myuser/Library/Ethereum/geth.ipc', net)); // mac os 路径
// 在 windows 中路径为: "\\\\.\\pipe\\geth.ipc"
// 在 linux 中路径为: "/users/myuser/.ethereum/geth.ipc"