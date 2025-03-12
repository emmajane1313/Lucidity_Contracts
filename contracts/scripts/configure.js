const { ethers } = require("ethers");
require("dotenv").config();
const workflowAbi = require("./../../lucidity/abis/LucidityWorkflows.json");

const provider = new ethers.JsonRpcProvider(
  "https://rpc.testnet.lens.dev",
  37111
);
const wallet = new ethers.Wallet("", provider);
const workflowAddress = "0x39d4cd14DcCf54aa8E343583A224d5864e00E5eB";

(async () => {
  const workflowContract = new ethers.Contract(
    workflowAddress,
    workflowAbi,
    wallet
  );

  // Configura contratos
  // const workflow1 = await workflowContract.createWorkflow("ipfs://QmVJTab5v14ne6nt5z6GGuaNSba5oy7Ph9iZmvr4wP462K");
  // await workflow1.wait();
  // const workflow2 = await workflowContract.createWorkflow("ipfs://QmRp7ESENMyohN4G2yFHc2t2FgpB93GZK9mGaiDrxFxTM1");
  // await workflow2.wait();

  const delete1 = await workflowContract.deleteWorkflow(1);
  await delete1.wait();
})();
