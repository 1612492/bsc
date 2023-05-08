const { Contract, JsonRpcProvider } = require('ethers');
const abi = require('./abi.json');

const contractAddress = '0x22D9CE4Dc23E8abB25294fc6638d5ce1494A60fB';

const provider = new JsonRpcProvider('https://bsc-dataseed.binance.org');
const contract = new Contract(contractAddress, abi, provider);

const eventFilter = contract.filters.DepositUSD;

async function getLogs(fromBlock, toBlock, step) {
  const logs = [];
  let block = fromBlock;

  while (block <= toBlock) {
    const endBlock = Math.min(block + step, toBlock);
    console.log({ block, endBlock });
    const result = await contract.queryFilter(eventFilter, block, endBlock);
    logs.push(...result);
    block = block + step + 1;
  }
  console.log(logs);
}

(async () => {
  await getLogs(27903428, 28019487, 5000);
})();
