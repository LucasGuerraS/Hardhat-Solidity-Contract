(async () => {
  try {
    const Spacebear = await hre.ethers.getContractFactory("Spacebear");

    const sbI = await Spacebear.deploy();

    await sbI.deployed();

    console.log(`Deployed at ${sbI.address}`);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
})();
