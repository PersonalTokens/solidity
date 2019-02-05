var PersonalToken  = artifacts.require('PersonalToken');

module.exports = function(deployer, network, accounts) {
  return deployer.deploy(PersonalToken, 'TestToken', 'TST', accounts[0], accounts[1]);
}
