class ConfluxContract {
  constructor() {
  }

  async init() {
    // const account = conflux.Account(accounts);
    // console.log(account)
    // this.accounts = await this.conflux.enable()

    //投票
    this.contractVote = window.confluxJS.Contract({
      //address: "cfxtest:type.contract:acbuadnh48p86puwg29cht1w824zdshdf6f9h6n4sn",
      address: "cfx:acfszvkxrw1yf58rwf5vkk8b91v89xdfza5ruke3fb",
      abi: require("network/abiVote.json")
    });
    // //捐赠
    // this.contractDonateFactory = window.confluxJS.Contract({
    //   address: "cfxtest:type.contract:acfwg4sduktcdgrh19x53fh49rfrwerp86u2tr2xh8",
    //   abi: require("network/abiDonateFactory.json")
    // });
    // //需求
    // this.contractDemandFactory = window.confluxJS.Contract({
    //   address: "cfxtest:type.contract:acdarabvxm7berpv3f3ch284jng1pypkujukem1eut",
    //   abi: require("network/abiDemandFactory.json")
    // });
    //慈善
    this.contractCharityFactory = window.confluxJS.Contract({
      address: "cfx:acd4x1rc5skd4ks14un9dvy2kkg42az1y28km8546s",
      abi: require("network/abiCharityFactory.json")
    });
    //合约
    // this.contractCharity = window.confluxJS.Contract({
    //   address: ,
    //   abi: require("network/abiCharity.json")
    // });
    //NFT
    this.contractCharityMedal = window.confluxJS.Contract({
      address: "cfx:accwx25cy50te2zkugkc50219rt2cx9pguxw99urkb",
      abi: require("network/abiCharityMedal1.json")
    });

    console.log("Conflux portal enable success!");
  }
}

export default new ConfluxContract();
