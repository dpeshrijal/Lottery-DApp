
const main = async () => {
    const getContractFactory = await hre.ethers.getContractFactory("Lottery");
    const lotteryContract = await getContractFactory.deploy();
    await lotteryContract.deployed();

    console.log("Lottery Smart Contract address is: ", lotteryContract.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();