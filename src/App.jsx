import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import BlockTable from "./components/BlockTable";
import TransactionTable from "./components/TransactionTable";

const settings = {
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
    // State variables for the current block number and its transactions
    const [blockNumber, setBlockNumber] = useState();
    const [lastBlock, setLastBlock] = useState();
    const [transactions, setTransactions] = useState();
    // State variable to toggle the visibility of the transaction table
    const [isTransactionTableVisible, setIsTransactionTableVisible] =
        useState(false);

    // Use effect hook to retrieve the current block number when the component mounts
    // Save the last block to avoid request rendering blocks still not exist
    useEffect(() => {
        async function getBlockNumber() {
            setBlockNumber(await alchemy.core.getBlockNumber());
            setLastBlock(await alchemy.core.getBlockNumber());
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
    }

    function getNextBlock() {
        setBlockNumber((block) => block + 1);
    }

    // toggle the visibility of the transactions table
    function seeBlockTransactions() {
        setIsTransactionTableVisible((prev) => !prev);
    }

    return (
        <>
            <BlockTable blockNumber={blockNumber} transactions={transactions} />
            <div className="flex mx-auto w-1/2 justify-between my-4">
                <button
                    className="px-4 py-2 font-bold text-white bg-[#50a6e0] rounded-md hover:bg-[#eaf4fb]"
                    onClick={getPrevBlock}
                >
                    Previous
                </button>
                <button
                    className="px-4 py-2 font-bold text-white bg-[#50a6e0] rounded-md hover:bg-[#eaf4fb]"
                    onClick={seeBlockTransactions}
                >
                    {isTransactionTableVisible
                        ? "Hide Transactions"
                        : "Show Transactions"}
                </button>
                {lastBlock === blockNumber ? (
                    <button
                        className="px-4 py-2 font-bold text-white bg-[#f1f2f4] rounded-md"
                        onClick={getNextBlock}
                        disabled={true}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 font-bold text-white bg-[#50a6e0] rounded-md hover:bg-[#eaf4fb]"
                        onClick={getNextBlock}
                    >
                        Next
                    </button>
                )}
            </div>
            {isTransactionTableVisible && transactions ? (
                <TransactionTable transactions={transactions.transactions} />
            ) : (
                <></>
            )}
        </>
    );
}

export default App;
