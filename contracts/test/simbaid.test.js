const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimbaID", function () {
  it("registers and retrieves identity", async function () {
    const [owner, other] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("SimbaID");
    const c = await Factory.deploy();
    await c.waitForDeployment();

    const did = "did:polygon:abc123";
    const voiceHash = ethers.keccak256(ethers.toUtf8Bytes("voice-embedding"));

    await expect(c.connect(owner).register(did, voiceHash))
      .to.emit(c, "Registered")
      .withArgs(owner.address, did, voiceHash);

    const [storedDid, storedVoiceHash] = await c.get(owner.address);
    expect(storedDid).to.equal(did);
    expect(storedVoiceHash).to.equal(voiceHash);

    const [emptyDid, emptyHash] = await c.get(other.address);
    expect(emptyDid).to.equal("");
    expect(emptyHash).to.equal("0x" + "0".repeat(64));
  });
});
