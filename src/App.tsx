import { createPublicClient, http, Chain } from "viem";
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const localChain: Chain = {
  id: 31337,
  name: "Hardhat",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["http://127.0.0.1:8545"] } },
  blockExplorers: {
    default: { name: "Hardhat", url: "http://127.0.0.1:8545" },
  },
};
const publicClient = createPublicClient({
  chain: localChain,
  transport: http("http://127.0.0.1:8545"),
});

function App() {
  const [count, setCount] = useState(0);

  const [blockNumber, setBlockNumber] = useState<bigint | null>(null);
  useEffect(() => {
    publicClient.getBlockNumber().then(setBlockNumber);
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>Block Number: {blockNumber}</div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
