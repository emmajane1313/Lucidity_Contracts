const { ethers } = require("ethers");
require("dotenv").config();
const workflowAbi = require("./../../lucidity/abis/LucidityWorkflows.json");

const provider = new ethers.JsonRpcProvider(
  "https://rpc.testnet.lens.dev",
  37111
);
const wallet = new ethers.Wallet("", provider);
const workflowAddress = "0xc2843882596aAFeA78434544C8bf25688a7162eB";

(async () => {
  const workflowContract = new ethers.Contract(
    workflowAddress,
    workflowAbi,
    wallet
  );

  // Configura contratos
  const workflow = await workflowContract.createWorkflow("ipfs://QmV2EchVYwhzTGCPR2ZwfoRASpQpq1vBmyUgMM6ToUYQju");
  await workflow.wait();
})();
