import TransactionItem from "./TransactionItem";

export default function TransactionList({
  storedTransactions,
  onEditTransaction,
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
          {storedTransactions.map((transaction, index) => (
            <TransactionItem
              key={
                transaction.id != null
                  ? `transaction-${transaction.id}`
                  : `transaction-index-${index}`
              }
              transaction={transaction}
              onEditTransaction={onEditTransaction}
              onDeleteTransaction={onDeleteTransaction}
            />
          ))}
        </div>
      )}
    </div>
  );
}