import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";
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
    const [transactionsTable, setTransactionsTable] = useState();
    const [toggle, setToggle] = useState(false);

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
        const reversedTransactions = blockTransactions.reverse();

        const tenRows = reversedTransactions.map((tx, index) => {
            console.log(index, reversedTransactions.length);
            const border =
                index === reversedTransactions.length - 1
                    ? ""
                    : "border-b border-slate-300";
            return (
                <tr key={index} className={border}>
                    <td className="px-4 py-4">
                        {`${tx.hash.substring(0, 20)}...`}
                    </td>
                    <td onClick={null} className="px-4 py-4">
                        {`${tx.from.substring(0, 20)}...`}
                    </td>

                    <td className="px-4 py-4">
                        {tx.to ? `${tx.to.substring(0, 20)}...` : ""}
                    </td>
                    <td className="px-4 py-4">{`${ethers.utils.formatEther(
                        tx.value
                    )} Ether`}</td>
                </tr>
            );
        });

        setTransactionsTable(() => {
            return (
                <div className="flex flex-col w-fit my-10 rounded-md shadow-lg mx-auto">
                    <table className=" text-left">
                        <thead>
                            <tr className="bg-slate-100 border-b border-slate-300">
                                <th className="px-4 py-2 rounded-tl-md">
                                    {" "}
                                    Txn Hash
                                </th>
                                <th className="px-4 py-2">From</th>
                                <th className="px-4 py-2">To</th>
                                <th className="px-4 py-2 rounded-tr-md">
                                    Value
                                </th>
                            </tr>
                        </thead>
                        <tbody>{tenRows}</tbody>
                    </table>
                </div>
            );
        });
    }

    return (
        <>
            <div className="flex flex-col w-fit my-10 rounded-md shadow-lg mx-auto">
                <table className="text-left w-full">
                    <thead>
                        <tr className="bg-slate-100 border-b border-slate-300">
                            <th className="px-4 py-2 rounded-tl-md">Block</th>
                            <th className="px-4 py-2 ">Txn</th>
                            <th className="px-4 py-2 ">Gas Used</th>
                            <th className="px-4 py-2 ">Gas Limit</th>
                            <th className="px-4 py-2 rounded-tr-md">
                                Base Fee
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-300">
                            <td className="px-4 py-4">
                                {transactions ? blockNumber : "Loading"}
                            </td>
                            <td
                                onClick={seeBlockTransactions}
                                className="px-4 py-4 cursor-pointer text-blue-400"
                            >
                                {transactions
                                    ? transactions.transactions.length
                                    : "Loading"}
                            </td>

                            <td className="px-4 py-4 ">
                                {transactions
                                    ? parseInt(
                                          transactions.gasUsed._hex,
                                          16
                                      ).toLocaleString()
                                    : "Loading"}
                            </td>
                            <td className="px-4 py-4 ">
                                {transactions
                                    ? parseInt(
                                          transactions.gasLimit._hex,
                                          16
                                      ).toLocaleString()
                                    : "Loading"}
                            </td>
                            <td className="px-4 py-4 ">
                                {transactions
                                    ? `${ethers.utils
                                          .formatUnits(
                                              transactions.baseFeePerGas._hex,
                                              "gwei"
                                          )
                                          .substring(0, 5)} Gwei`
                                    : "Loading"}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex px-4 py-2 font-semibold mx-auto w-full bg-slate-100 justify-between rounded-b-md">
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

            {toggle && transactionsTable}
        </>
    );
}

export default App;
