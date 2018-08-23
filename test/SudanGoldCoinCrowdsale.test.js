const expectThrow = require('./helpers/expectThrow');
const EVMRevert = require('./helpers/EVMRevert');
const {newCrowdsale, getTokenInstance, expiredCrowdsale} = require('./helpers/crowdsale');

contract('SudanGoldCoinCrowdsale', async (accounts) => {

  const contractOwner = accounts[0];
  const bounter = accounts[1];
  const investor = accounts[2];
  const hacker = accounts[3];

  describe('When crwodsale open', function() {
    it("should release new tokens", async () => {
      let crowdsaleInstance = await newCrowdsale();
      let expectedBalance = 1e9;
      await crowdsaleInstance.sendTokens(bounter, expectedBalance, {from: contractOwner});
      let tokenInstance = await getTokenInstance(crowdsaleInstance);
      let balance = await tokenInstance.balanceOf(bounter);

      assert.equal(expectedBalance, balance.valueOf());
    });

    it("should not send tokens from non owner", async () => {
      let crowdsaleInstance = await newCrowdsale();
      await expectThrow(crowdsaleInstance.sendTokens(hacker, 1e9, {from: hacker}), EVMRevert);
    });

    it("should set new rate", async () => {
      let crowdsaleInstance = await newCrowdsale();

      let newRate = 43;
      await crowdsaleInstance.setRate(newRate);

      let sentWeiAmount = web3.toWei(1, 'ether');
      await crowdsaleInstance.sendTransaction({from: investor, value: sentWeiAmount});

      let tokenInstance = await getTokenInstance(crowdsaleInstance);
      let investorTokenBalance = await tokenInstance.balanceOf(investor);

      assert.equal(newRate * sentWeiAmount, investorTokenBalance.valueOf());
    });
  });

  describe('Investor', function() {
    it("should recieved tokens", async () => {
      let crowdsaleInstance = await newCrowdsale();
      let sentWeiAmount = web3.toWei(10, 'ether');
      await crowdsaleInstance.sendTransaction({from: investor, value: sentWeiAmount});

      let tokenInstance = await getTokenInstance(crowdsaleInstance);
      let balance = await tokenInstance.balanceOf(investor);

      let rate = await crowdsaleInstance.rate();
      let expectedBalance = rate.valueOf() * sentWeiAmount;

      assert.equal(expectedBalance, balance.valueOf());
    });
  });

  describe('Beneficiary', function() {
    it("should recieved payment", async () => {
      let crowdsaleInstance = await newCrowdsale();

      let ownerAddress = await crowdsaleInstance.wallet();
      let balanceBefore = web3.eth.getBalance(ownerAddress.valueOf()).valueOf();

      let sentWeiAmount = web3.toWei(10, 'ether');
      await crowdsaleInstance.sendTransaction({from: investor, value: sentWeiAmount});

      let finalBalance = web3.eth.getBalance(ownerAddress.valueOf()).valueOf();
      let expectedProfit = finalBalance - balanceBefore;

      assert.equal(expectedProfit, sentWeiAmount);
    });
  });

  describe('When crowdsale end', function() {
    it("should fail new payment", async () => {
      let crowdsaleInstance = await expiredCrowdsale();
      let sentWeiAmount = web3.toWei(1, 'ether');

      await expectThrow(crowdsaleInstance.sendTransaction({from: investor, value: sentWeiAmount}), EVMRevert);
    });

    it("should fail new tokens emission", async () => {
      let crowdsaleInstance = await expiredCrowdsale();
      await expectThrow(crowdsaleInstance.sendTokens(investor, 1e8), EVMRevert);
    });
  });
});
