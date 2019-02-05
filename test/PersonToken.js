const PersonToken = artifacts.require('PersonToken');

contract('PersonToken', function(accounts) {
  it('check name of PersonToken', async() => {
    const instance = await PersonToken.new();

    assert.equal((await instance.name.call()).toString(), 'Personal Tokens pool', 'Name is different than Personal Tokens pool');
  });
  it('check symbol of PersonToken', async() => {
    const instance = await PersonToken.new();

    assert.equal((await instance.symbol.call()).toString(), 'PERSON', 'Symbol is different than PERSON');
  });
  it('check total supply of PersonToken', async() => {
    const instance = await PersonToken.new();

    assert.equal((await instance.totalSupply.call()).toString(), '10000000000000000000000000000', 'Total supply is different than 10000000000000000000000000000');
  });
  it('check decimals of PersonToken', async() => {
    const instance = await PersonToken.new();

    assert.equal((await instance.decimals.call()).toNumber(), 18, 'Decimals is different than 18');
  });
  it('check total supply of PersonToken after burning tokens', async() => {
    const instance = await PersonToken.new();

    await instance.burn('10000000000000000000000000000');

    assert.equal((await instance.totalSupply.call()).toNumber(), 0, 'Total supply is different than 10000000000000000000000000000');
  });
});
