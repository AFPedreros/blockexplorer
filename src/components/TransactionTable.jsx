import { ethers } from "ethers";

// TransactionTable is a functional component that displays a table of transactions
// It receives an object with all the transactions as a prop

function TransactionTable({ transactions }) {
    // renderTx is an array that will hold the transactions in reverse order
    const renderTx = [];
    for (let i = transactions.length - 1; i >= 0; i--) {
        renderTx.push(transactions[i]);
    }

    return (
        <div className="flex flex-col w-fit my-10 rounded-md shadow-lg mx-auto">
            <table className=" text-left">
                <thead>
                    <tr className="bg-slate-100 border-b border-slate-300">
                        <th className="px-4 py-2 rounded-tl-md"> Txn Hash</th>
                        <th className="px-4 py-2">From</th>
                        <th className="px-4 py-2">To</th>
                        <th className="px-4 py-2 rounded-tr-md">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {/* map over the renderTx array to create a row for each transaction */}
                    {renderTx.map((tx, index) => {
                        const border =
                            index === transactions.length - 1
                                ? ""
                                : "border-b border-slate-300";
                        return (
                            <tr key={index} className={border}>
                                <td className="px-4 py-4">{`${tx.hash.substring(
                                    0,
                                    20
                                )}...`}</td>
                                <td onClick={null} className="px-4 py-4">
                                    {`${tx.from.substring(0, 20)}...`}
                                </td>
                                <td className="px-4 py-4">
                                    {tx.to
                                        ? `${tx.to.substring(0, 20)}...`
                                        : ""}
                                </td>
                                <td className="px-4 py-4">{`${ethers.utils.formatEther(
                                    tx.value
                                )} Ether`}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionTable;
