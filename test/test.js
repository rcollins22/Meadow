const { assert } = require("chai");

const Meadow = artifacts.require("./Meadow.sol");

require("chai").use(require("chai-as-promised")).should();

contract('Meadow',([deployer,author])=>{
  let meadow

  before(async () => {
    meadow = await Meadow.deployed()
  })

  describe('Is the contract on the Blockchain?', async () => {
    it('successfully deployed', async ()=> {
      const address = await meadow.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address,"")
      assert.notEqual(address, undefined)
      assert.notEqual(address, null)
    })
    it("Name is Set", async ()=> {
      const name = await meadow.name()
      assert.equal(name,"Meadow")
    })
  })

  
})