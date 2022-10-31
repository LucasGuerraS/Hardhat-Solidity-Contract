const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const hre = require("hardhat");

describe("Spacebear", () => {
  const deployAndMintTokenFixture = async () => {
    const Spacebear = await hre.ethers.getContractFactory("Spacebear");
    const sbI = await Spacebear.deploy();
    const [owner, otherAccount] = await ethers.getSigners();
    await sbI.safeMint(otherAccount.address);
    return { sbI };
  };
  it("is possible to mint a token", async () => {
    const { sbI } = await loadFixture(deployAndMintTokenFixture);
    const [owner, otherAccount] = await ethers.getSigners();
    expect(await sbI.ownerOf(0)).to.equal(otherAccount.address);
  });
  it("fails to transfer tokens from the wrong address", async () => {
    const { sbI } = await loadFixture(deployAndMintTokenFixture);
    const [owner, otherAccount, notNFTOwner] = await ethers.getSigners();
    expect(await sbI.ownerOf(0)).to.equal(otherAccount.address);
    await expect(
      sbI
        .connect(notNFTOwner)
        .transferFrom(otherAccount.address, notNFTOwner.address, 0)
    ).to.be.revertedWith("ERC721: caller is not token owner nor approved");
  });
});
