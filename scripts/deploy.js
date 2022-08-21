const main = async () => {

  const GullakFactory = await hre.ethers.getContractFactory("GullakFactory");
  const gullakFactory = await GullakFactory.deploy();

  await gullakFactory.deployed();

  console.log("Greeter deployed to:", gullakFactory.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
