import hre from "hardhat";

async function main() {
  const myToken = await hre.viem.deployContract("MyToken", [1_000_000n]);
  console.log(myToken);

  const initialSupply = await myToken.read.getCurrentSupply();
  console.log(`Initial supply of MyToken: ${initialSupply}`);

  const hash = await myToken.write.increaseSupply([500_000n]);
  // increaseSupply sends a tx, so we need to wait for it to be mined
  const publicClient = await hre.viem.getPublicClient();
  await publicClient.waitForTransactionReceipt({ hash });

  const newSupply = await myToken.read.getCurrentSupply();
  console.log(`New supply of MyToken: ${newSupply}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// // The amount is required as a parameter
// // TS Error: Expected 1-2 arguments, but got 0.
// await myToken.write.increaseSupply();
//
// // There is no setSupply function in the MyToken contract
// // TS Error: Property 'setSupply' does not exist on type...
// const tokenPrice = await myToken.write.setSupply([5000000n]);
//
// // The first argument of the constructor arguments is expected to be a bigint
// // TS Error: No overload matches this call.
// const myToken2 = await hre.viem.deployContract("MyToken", ["1000000"]);
