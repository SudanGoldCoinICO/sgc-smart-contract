const SudanGoldCoinCrowdsale = artifacts.require("MockSudanGoldCoinCrowdsale");
const SudanGoldCoinToken = artifacts.require("SudanGoldCoinToken");

exports.getTokenInstance = async (crowdsaleInstance) => {
  let tokenAddress = await crowdsaleInstance.sgcToken();
  return SudanGoldCoinToken.at(tokenAddress);
}

exports.newCrowdsale = async () => {
  let tokenInstance = await SudanGoldCoinToken.new();

  let startTime = new Date().getTime() / 1000;
  let endTime = startTime + 30 * 24 * 60 * 60;
  let crowdsaleInstance = await SudanGoldCoinCrowdsale.new(250, '0x7b75323cdc555c5daaffd8022283eabc12bb779d', tokenInstance.address, startTime, endTime);

  await tokenInstance.transferOwnership(crowdsaleInstance.address);
  return crowdsaleInstance;
}

exports.expiredCrowdsale = async () => {
  let crowdsaleInstance = await exports.newCrowdsale();
  let openingTime = await crowdsaleInstance.openingTime();
  await crowdsaleInstance.changeTimeLimits(1, openingTime - 60);

  return crowdsaleInstance;
}
