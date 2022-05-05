
const main = async () => {
    const getContractFactory = await hre.ethers.getContractFactory("Lottery");
    const lotteryContract = await getContractFactory.deploy();
    await lotteryContract.deployed();

    console.log("Smart Contract Address is: ", lotteryContract.address);

    let contractBalance = await lotteryContract.getBalance();
    console.log("Lottery balance is: ", hre.ethers.utils.formatEther(contractBalance));

    const [_, Participant1, Participant2, Participant3, Participant4] = await hre.ethers.getSigners();

    let enter = await lotteryContract.connect(Participant1).enter({ value: hre.ethers.utils.parseEther("0.1") });
    await enter.wait();
    console.log("Participant added");

    enter = await lotteryContract.connect(Participant2).enter({ value: hre.ethers.utils.parseEther("0.1") });
    await enter.wait();
    console.log("Participant added");

    enter = await lotteryContract.connect(Participant3).enter({ value: hre.ethers.utils.parseEther("0.1") });
    await enter.wait();
    console.log("Participant added");

    enter = await lotteryContract.connect(Participant4).enter({ value: hre.ethers.utils.parseEther("0.1") });
    await enter.wait();
    console.log("Participant added");

    contractBalance = await lotteryContract.getBalance();
    console.log("Lottery balance is: ", contractBalance);

    let players = await lotteryContract.getPlayers();
    console.log("Players of this lottery are: ", players);

    let pickWinner = await lotteryContract.pickWinner();
    await pickWinner.wait();

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