const main = async () => {
    const acidContractFactory = await hre.ethers.getContractFactory('acidPortal');
    const acidContract = await acidContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.01'),
    });
    await acidContract.deployed();
    console.log('Contract addy:', acidContract.address);
  
    let contractBalance = await hre.ethers.provider.getBalance(
        acidContract.address
    );
    console.log(
      'Contract balance:',
      hre.ethers.utils.formatEther(contractBalance)
    );

    await acidContract.message("hello");
  
    let acidTxn = await acidContract.acid('This is amino acid #1');
    await acidTxn.wait();

    let acidTxn2 = await acidContract.acid('This is amino acid #2');
    await acidTxn2.wait();

  
    contractBalance = await hre.ethers.provider.getBalance(acidContract.addresss);
    console.log(
      'Contract balance:',
      hre.ethers.utils.formatEther(contractBalance)
    );
  
    let allAcids = await acidContract.getAllAcids();
    console.log(allAcids);
};
  
const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
};
  
runMain();
