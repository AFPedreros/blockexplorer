// BlockTable is a functional component that displays information about a block of ethereum
// It receives the block number an the transactions object as props

function BlockTable({ blockNumber, transactions }) {
    return (
        <div className="flex flex-col w-fit my-10 rounded-md shadow-lg mx-auto">
            <table className="text-left w-full">
                <thead>
                    <tr className="bg-slate-100 border-b border-slate-300">
                        <th className="px-4 py-2 rounded-tl-md">
                            Block Number:
                        </th>
                        <th className="px-4 py-2">{blockNumber}</th>
                    </tr>
                    <tr className="bg-slate-100 border-b border-slate-300">
                        <th className="px-4 py-2 rounded-tl-md">
                            Transactions:
                        </th>
                        <th className="px-4 py-2">
                            {transactions
                                ? transactions.transactions.length
                                : "Loading"}
                        </th>
                    </tr>
                    <tr className="bg-slate-100">
                        <th className="px-4 py-2 rounded-tl-md">Gas Used:</th>
                        <th className="px-4 py-2">
                            {transactions
                                ? parseInt(
                                      transactions.gasUsed._hex,
                                      16
                                  ).toLocaleString()
                                : "Loading"}
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
    );
}

export default BlockTable;
