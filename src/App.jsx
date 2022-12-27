import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
    const [lastBlock, setLastBlock] = useState();
    const [blockNumber, setBlockNumber] = useState();
    const [transactions, setTransactions] = useState();
    const [transactionsRows, setTransactionsRows] = useState();
    const [toggle, setToggle] = useState(false);

    let formatted = 0;

    useEffect(() => {
        async function getBlockNumber() {
            setLastBlock(await alchemy.core.getBlockNumber());
            setBlockNumber(await alchemy.core.getBlockNumber());
        }

        getBlockNumber();
    }, []);

    useEffect(() => {
        async function getBlockTransactions() {
            setTransactions(
                await alchemy.core.getBlockWithTransactions(blockNumber)
            );
        }

        getBlockTransactions();
    }, [blockNumber]);

    function getPrevBlock() {
        setBlockNumber((block) => block - 1);
        setToggle(false);
    }

    function getNextBlock() {
        setBlockNumber((block) => block + 1);
        setToggle(false);
    }

    function seeBlockTransactions() {
        setToggle((prev) => !prev);

        const blockTransactions = transactions.transactions;

        const tenRows = blockTransactions.map((tx, index) => {
            // console.log(Utils.formatEther(tx.value.toString()));
            const ethValue = parseInt(tx.value._hex, 16);
            const rounded = Math.round(ethValue * 100) / 100000000000;
            formatted = rounded.toFixed(2);

            return (
                <tr key={index} className=" border-b border-slate-300">
                    <td className="px-4 py-2">
                        {`${tx.hash.substring(0, 20)}...`}
                    </td>
                    <td onClick={seeBlockTransactions} className="px-4 py-2">
                        {`${tx.from.substring(0, 20)}...`}
                    </td>

                    <td className="px-4 py-2 ">
                        {`${tx.to.substring(0, 20)}...`}
                    </td>
                    <td className="px-4 py-2 ">{`${formatted} Ether`}</td>
                </tr>
            );
        });

        setTransactionsRows(() => {
            return (
                <div className="flex flex-col w-fit px-10">
                    <table className=" text-left">
                        <thead>
                            <tr className=" bg-slate-100 border-b border-slate-300">
                                <th className="px-4 py-2 "> Txn Hash</th>
                                <th className="px-4 py-2 ">From</th>
                                <th className="px-4 py-2 ">To</th>
                                <th className="px-4 py-2 ">Value</th>
                            </tr>
                        </thead>
                        <tbody>{tenRows}</tbody>
                    </table>
                    <div className="flex px-2 mx-auto w-full bg-slate-50 justify-between">
                        <button onClick={getPrevBlock}>{"<"}</button>
                        {lastBlock === blockNumber ? (
                            <button
                                className="text-slate-300"
                                disabled={true}
                                onClick={null}
                            >
                                {">"}
                            </button>
                        ) : (
                            <button onClick={null}>{">"}</button>
                        )}
                    </div>
                </div>
            );
        });
    }

    if (transactions) {
        const baseFee = parseInt(transactions.baseFeePerGas._hex, 16);
        const rounded = Math.round(baseFee * 100) / 100000000000;
        formatted = rounded.toFixed(2);
    }

    return (
        <>
            <div className="flex flex-col w-fit p-10">
                <table className=" text-left w-full">
                    <thead>
                        <tr className=" bg-slate-100 border-b border-slate-300">
                            <th className="px-4 py-2 ">Block</th>
                            <th className="px-4 py-2 ">Txn</th>
                            <th className="px-4 py-2 ">Gas Used</th>
                            <th className="px-4 py-2 ">Gas Limit</th>
                            <th className="px-4 py-2 ">Base Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className=" border-b border-slate-300">
                            <td className="px-4 py-2">
                                {transactions ? blockNumber : "Loading"}
                            </td>
                            <td
                                onClick={seeBlockTransactions}
                                className="px-4 py-2 cursor-pointer text-blue-400"
                            >
                                {transactions
                                    ? transactions.transactions.length
                                    : "Loading"}
                            </td>

                            <td className="px-4 py-2 ">
                                {transactions
                                    ? parseInt(
                                          transactions.gasUsed._hex,
                                          16
                                      ).toLocaleString()
                                    : "Loading"}
                            </td>
                            <td className="px-4 py-2 ">
                                {transactions
                                    ? parseInt(
                                          transactions.gasLimit._hex,
                                          16
                                      ).toLocaleString()
                                    : "Loading"}
                            </td>
                            <td className="px-4 py-2 ">
                                {transactions ? `${formatted} Gwei` : "Loading"}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex px-2 mx-auto w-full bg-slate-50 justify-between">
                    <button onClick={getPrevBlock}>{"<"}</button>
                    {lastBlock === blockNumber ? (
                        <button
                            className="text-slate-300"
                            disabled={true}
                            onClick={getNextBlock}
                        >
                            {">"}
                        </button>
                    ) : (
                        <button onClick={getNextBlock}>{">"}</button>
                    )}
                </div>
            </div>

            {toggle && transactionsRows}
        </>
    );
}

export default App;
