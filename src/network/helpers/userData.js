var ethers = require('ethers');

const initialBalances = [ethers.BigNumber.from("10").pow(18).mul(100), ethers.BigNumber.from("10").pow(18).mul(100)];
// const join = [ethers.BigNumber.from("200000000000000000000"),ethers.BigNumber.from("0")];
const JOIN_KIND_INIT = 0;

const initUserData =
    ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256[]'],
        [JOIN_KIND_INIT, initialBalances]);

const userdata = ethers.utils.defaultAbiCoder.encode(["uint256[]"], [initialBalances]);
//const joincode = ethers.utils.defaultAbiCoder.encode(["uint256[]"], [join]);

// console.log(initialBalances)
// console.log("initialBalances:" + initialBalances);
// console.log(initUserData)
// console.log("initUserData:" + initUserData);
console.log("userdata:" + userdata);
console.log("initUserData:" + initUserData);
console.log("amountA:" + initialBalances[0].toString());
console.log("amountB:" + initialBalances[1].toString());
// console.log(ethers.utils.defaultAbiCoder.decode( ["uint256[]" ], userdata)); //这个打出来是十六进制json就不要了

//console.log(ethers.utils.defaultAbiCoder.decode( ["uint256[]" ], "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000019b822399e596b3f0000000000000000000000000000000000000000000000001bc16d674ec80000"));
//console.log(join[0].toString());
// console.log(initialBalances[1].toString());


//console.log(ethers.utils.defaultAbiCoder.decode( [ "uint256", "uint256[]" ],initUserData));
//console.log(initUserData);

