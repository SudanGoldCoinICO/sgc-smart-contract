pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./SudanGoldCoinToken.sol";

contract SudanGoldCoinCrowdsale is TimedCrowdsale, Ownable {
  SudanGoldCoinToken public sgcToken;

  constructor(uint256 _rate, address _wallet, SudanGoldCoinToken _token, uint256 _openingTime, uint256 _closingTime)
    public Crowdsale(_rate, _wallet, _token) TimedCrowdsale(_openingTime, _closingTime) {
      sgcToken = _token;
  }

  function sendTokens(address addr, uint256 tokens) public onlyWhileOpen onlyOwner {
    _deliverTokens(addr, tokens);
  }

  function setRate(uint256 _rate) public onlyWhileOpen onlyOwner {
    require(_rate > 0);
    rate = _rate;
  }

  function _deliverTokens(address _beneficiary, uint256 _tokenAmount) internal {
    sgcToken.sendTokens(_beneficiary, _tokenAmount);
  }
}
