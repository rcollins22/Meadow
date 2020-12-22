const { assert } = require("chai");

const Meadow = artifacts.require("./Meadow.sol");

require("chai").use(require("chai-as-promised")).should();

contract('Meadow',([deployer,author])=>{
  let meadow

  before(async () => {
    meadow = await Meadow.deployed()
  })

  describe('Is the contract named on the blockchain?', async () => {
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

  describe("Photo Posting Correctly?", async () => {
    let r, idCount;
    const hash = "testingtesting"
    before(async () => {
      r = await meadow.post(hash,"Description", {from: author})
      idCount = await meadow.idCount()
    });
    it('creates post', async ()=> {

      assert.equal(idCount,1)
      console.log(r.logs[0].args) 
    })
  });
  
})