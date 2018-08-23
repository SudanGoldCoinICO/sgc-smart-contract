pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract SudanGoldCoinToken is StandardBurnableToken, DetailedERC20, Ownable {
  uint8 public constant decimals = 18;

  uint256 public TOKENS_NOT_FOR_SALE = 10000000 * (10 ** uint256(decimals));
  uint256 public MAX_SUPPLY = 25000000 * (10 ** uint256(decimals));
  uint256 public usedTokens = 0;

  constructor() public DetailedERC20('Sudan Gold Coin', 'SGC', decimals) {
    totalSupply_ = MAX_SUPPLY;
    sendTokens(msg.sender, TOKENS_NOT_FOR_SALE);
  }

  function sendTokens(address addr, uint256 tokens) public onlyOwner returns (bool) {
    require(tokens > 0);
    require(addr != address(0));

    usedTokens = usedTokens.add(tokens);
    require(usedTokens <= MAX_SUPPLY);

    balances[addr] = balances[addr].add(tokens);
    emit Transfer(address(0), addr, tokens);

    return true;
  }
}
