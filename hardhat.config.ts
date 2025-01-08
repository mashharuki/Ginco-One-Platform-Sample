import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-verify";
import fs from "node:fs";
import path from "node:path";
import * as dotenv from "dotenv";

dotenv.config();

const { PRIVATE_KEY, GINCO_API_KEY } = process.env;

// タスクファイルを読み込むための設定
const SKIP_LOAD = process.env.SKIP_LOAD === "true";
if (!SKIP_LOAD) {
  const taskPaths = ["", "utils", "lock"];
  taskPaths.forEach((folder) => {
    const tasksPath = path.join(__dirname, "tasks", folder);
    fs.readdirSync(tasksPath)
      .filter((_path) => _path.includes(".ts"))
      .forEach((task) => {
        require(`${tasksPath}/${task}`);
      });
  });
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.27",
        settings: {
          viaIR: true,
        },
      },
    ],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    holesky: {
      url: `https://testnet.node.gincoapis.com/ethereum/holesky/v1/${GINCO_API_KEY}`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    oasysTestnet: {
      url: `https://testnet.node.gincoapis.com/oasys/testnet/v1/${GINCO_API_KEY}`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    bnbTestnet: {
      url: `https://testnet.node.gincoapis.com/bnb/testnet/v1/${GINCO_API_KEY}`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    amoy: {
      url: `https://testnet.node.gincoapis.com/polygon/amoy-erigon/v1/${GINCO_API_KEY}`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    arbitrumSepolia: {
      url: `https://testnet.node.gincoapis.com/arbitrum/testnet/v1/${GINCO_API_KEY}`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    shibuya: {
      url: `https://testnet.node.gincoapis.com/astar/testnet/v1/${GINCO_API_KEY}`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    fuji: {
      url: `https://testnet.node.gincoapis.com/avax/testnet/v1/${GINCO_API_KEY}`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    curtis: {
      url: "https://curtis.rpc.caldera.xyz/http",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    liskTestnet: {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    storyTestnet: {
      url: "https://odyssey.storyrpc.io",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    unichainTestnet: {
      url: "https://sepolia.unichain.org",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    worldChainTestnet: {
      url: "https://worldchain-sepolia.g.alchemy.com/public",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    zoraTestnet: {
      url: "https://sepolia.rpc.zora.energy",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    scrollTestnet: {
      url: "https://sepolia-rpc.scroll.io",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    lineaTestnet: {
      url: "https://rpc.sepolia.linea.build",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    mantleTestnet: {
      url: "https://rpc.sepolia.mantle.xyz",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    chiado: {
      url: "https://rpc.chiadochain.net",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    flowTestnet: {
      url: "https://testnet.evm.nodes.onflow.org",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    minato: {
      url: "https://rpc.minato.soneium.org/",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      chiado: "empty",
      minato: "empty",
      flowTestnet: "empty",
    },
    customChains: [
      {
        network: "chiado",
        chainId: 10200,
        urls: {
          apiURL: "https://gnosis-chiado.blockscout.com/api",
          browserURL: "https://gnosis-chiado.blockscout.com",
        },
      },
      {
        network: "minato",
        chainId: 1946,
        urls: {
          apiURL: "https://soneium-minato.blockscout.com/api",
          browserURL: "https://soneium-minato.blockscout.com/",
        },
      },
      {
        network: "flowTestnet",
        chainId: 545,
        urls: {
          apiURL: "https://evm-testnet.flowscan.io/api",
          browserURL: "https://evm-testnet.flowscan.io/",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
