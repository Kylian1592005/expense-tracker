import TransactionItem from "./TransactionItem";

export default function TransactionList({
  storedTransactions,
  onDeleteTransaction,
}) {
  return (
    <div>
      {storedTransactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onDeleteTransaction={onDeleteTransaction}
        />
      ))}
    </div>
  );
}
