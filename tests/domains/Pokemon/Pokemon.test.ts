import Pokemon from '../../src/domains/Pokemon/Pokemon';

describe("Pokemon", () => {
  it("should have a name", () => {
    let name = 'test'
    let pokemon = new Pokemon(name);
    assert.equal(testTarget.name, name);
  });
});
