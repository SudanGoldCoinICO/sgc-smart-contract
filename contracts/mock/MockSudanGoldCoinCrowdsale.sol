import "../SudanGoldCoinCrowdsale.sol";
import "../SudanGoldCoinToken.sol";

contract MockSudanGoldCoinCrowdsale is SudanGoldCoinCrowdsale {
  constructor(uint256 _rate, address _wallet, SudanGoldCoinToken _token, uint256 _openingTime, uint256 _closingTime)
    public SudanGoldCoinCrowdsale(_rate, _wallet, _token, _openingTime, _closingTime) {
  }

  function changeTimeLimits(uint256 _openingTime, uint256 _closingTime) {
    openingTime = _openingTime;
    closingTime = _closingTime;
  }
}
