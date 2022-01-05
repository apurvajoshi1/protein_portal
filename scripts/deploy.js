const main = async () => {
    const acidContractFactory = await hre.ethers.getContractFactory('acidPortal');
    const acidContract = await acidContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.001'),
    });
  
    await acidContract.deployed();
  
    console.log('acidPortal address: ', acidContract.address);
};
  
const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
};

runMain();
