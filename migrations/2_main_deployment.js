const SudanCrowdsale = artifacts.require('./SudanGoldCoinCrowdsale.sol');
const SudanToken = artifacts.require('./SudanGoldCoinToken.sol');

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
    let tokenInstance = await deployer.deploy(SudanToken);

    let startTime = 1535068800; // new Date().getTime() / 1000; // 1535068800 - Fri, 24 Aug 2018 00:00:00 GMT
    let endTime = 1543536000; // startTime + 30 * 24 * 60 * 60; // 1543536000 - Fri, 30 Nov 2018 00:00:00 GMT
    let crowdsaleInstance = await deployer.deploy(
      SudanCrowdsale,
      250, // Initial rate
      process.env.BENEFICIARY_ADDRESS, // Beneficiary address
      tokenInstance.address, // SGCToken address
      startTime,
      endTime
    );

    await tokenInstance.transferOwnership(crowdsaleInstance.address);
  });

};
