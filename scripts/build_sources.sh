#!/usr/bin/env bash

truffle-flattener contracts/SudanGoldCoinCrowdsale.sol > build/crowdsale
truffle-flattener contracts/SudanGoldCoinToken.sol > build/token
