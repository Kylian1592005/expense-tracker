import TransactionItem from "./TransactionItem";

export default function TransactionList({
  storedTransactions,
  onDeleteTransaction,
}) {
  return (
    <div className="card bg-base-100 shadow-xl p-6 border border-base-200 w-full">
      <h2 className="text-xl font-bold mb-4 text-base-content">
        Transaction History
      </h2>

      {storedTransactions.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-6">
          No transactions yet. Add one above!
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {storedTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDeleteTransaction={onDeleteTransaction}
            />
          ))}
        </div>
      )}
    </div>
  );
}