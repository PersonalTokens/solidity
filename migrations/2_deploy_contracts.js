var PersonalToken  = artifacts.require('PersonalToken');
var Treasurer  = artifacts.require('Treasurer');
var TreasurerWallet  = artifacts.require('TreasurerWallet');
const signerAddress = '0x364EfCFda56BfA9005AcFc4c14ea9bE002c59f7D';

module.exports = function(deployer, network, accounts) {
  deployer.deploy(TreasurerWallet).then(function() {
    return deployer.deploy(Treasurer, TreasurerWallet.address, signerAddress).then(function() {
      return deployer.deploy(PersonalToken, 'TestToken', 'TST', accounts[0], TreasurerWallet.address).then(function() {
        return TreasurerWallet.at(TreasurerWallet.address).then(function(instance) {
          return instance.setTreasurer(Treasurer.address);
        });
      });
    });
  });
}
