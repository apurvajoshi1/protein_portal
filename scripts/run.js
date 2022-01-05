/* const main = async () => {
    // const [owner, randomPerson] = await hre.ethers.getSigners();
    const acidContractFactory = await hre.ethers.getContractFactory('acidPortal');
    const acidContract = await acidContractFactory.deploy();
    await acidContract.deployed();
    console.log("Contract deployed to:", acidContract.address);
    // console.log("Contract deployed by:", owner.address);

    let acidCount;
    acidCount = await acidContract.getTotalAcids();
    console.log(acidCount.toNumber());

    /** Let's add a few acids!! */

/*     let acidTxn = await acidContract.add('A message!');
    await acidTxn.wait(); // Wait for the transaction to be mined

    const [_, randomPerson] = await hre.ethers.getSigners();
    acidTxn = await acidContract.connect(randomPerson).add('Another message!');
    await acidTxn.wait(); // Wait for the transaction to be mined

    let allAcids = await acidContract.getAllAcids();
    console.log(allAcids); */


  
    /* let acidTxn = await acidContract.add();
    await acidTxn.wait(); */

    // acidCount = await acidContract.getTotalAcids();

/* }; */ 

/* const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain(); */

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