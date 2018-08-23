const expectThrow = require('./helpers/expectThrow');
const EVMRevert = require('./helpers/EVMRevert');

var SudanGoldCoinToken = artifacts.require("SudanGoldCoinToken");

contract('SudanGoldCoinToken', async (accounts) => {

  it("should set initial owner balance", async () => {
    let instance = await SudanGoldCoinToken.new();
    let expectedOwnerBalance = await instance.TOKENS_NOT_FOR_SALE.call();
    let realOwnerBalance = await instance.balanceOf.call(accounts[0]);

    assert.equal(expectedOwnerBalance.valueOf(), realOwnerBalance.valueOf());
  });

  it("should burn tokens", async () => {
    let instance = await SudanGoldCoinToken.new();
    let initialOwnerBalance = await instance.TOKENS_NOT_FOR_SALE.call();

    await instance.burn(initialOwnerBalance);
    let ownerBalance = await instance.balanceOf.call(accounts[0]);

    assert.equal(0, ownerBalance);
  });

  it("should fail if max supply exceeded", async () => {
    let instance = await SudanGoldCoinToken.new();

    let totalSupply = await instance.totalSupply();
    let usedTokens = await instance.usedTokens();

    await instance.sendTokens(accounts[1], totalSupply.valueOf() - usedTokens.valueOf());

    await expectThrow(instance.sendTokens(accounts[1], 1), EVMRevert);
  });

});
