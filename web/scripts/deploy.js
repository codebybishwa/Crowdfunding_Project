import pkg from 'hardhat';
const { ethers } = pkg;

const main = async () => {
    console.log("Contract Factory fetched for CrowdFunding.");
    const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    console.log("Deploying CrowdFunding contract...");
    
    // Deploy the contract
    const CrowdFundingToken = await CrowdFunding.deploy();
    
    // Wait for the deployment to be mined
    await CrowdFundingToken.waitForDeployment();
    
    // Access and log the deployment target (address)
    const contractAddress = CrowdFundingToken.target || CrowdFundingToken.address; // Use target in Ethers v6+
    console.log("Contract deployed at:", contractAddress);
}

main().catch((e) => {
    console.error("Error:", e);
    process.exitCode = 1;
});
