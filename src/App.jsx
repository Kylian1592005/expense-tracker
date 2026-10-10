import { useEffect, useState } from "react";
import "./App.css";
import TransactionForm from "./components/TransactionForm";
import SummaryCard from "./components/SummaryCard";
import TransactionList from "./components/TransactionList";

const data = [
  {
    id: 1,
    title: "Grocery Shopping",
    amount: 45.5,
    type: "expense",
    category: "Food",
    date: "2026-10-07",
  },
  {
    id: 7,
    title: "Shopping",
    amount: 100,
    type: "income",
    category: "Food",
    date: "2026-10-07",
  },
];

function App() {
  const [storedTransactions, setStoredTransactions] = useState(() => {
    const storedData = localStorage.getItem("transactions");
    return storedData ? JSON.parse(storedData) : data
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(storedTransactions));
  }, [storedTransactions]);

  const typeExpense = storedTransactions.filter(
    (transaction) => transaction.type === "expense",
  );
  const typeIncome = storedTransactions.filter(
    (transaction) => transaction.type === "income",
  );

  const expenseBalance = typeExpense.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  const incomeBalance = typeIncome.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  const totalBalance = incomeBalance - expenseBalance;

  const handleDeleteTransaction = (id) => {
    const filteredTransactions = storedTransactions.filter(
      (transaction) => transaction.id !== id,
    );
    setStoredTransactions(filteredTransactions);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>

      <SummaryCard
        totalBalance={totalBalance}
        incomeBalance={incomeBalance}
        expenseBalance={expenseBalance}
      />

      <TransactionForm
        storedTransactions={storedTransactions}
        setStoredTransactions={setStoredTransactions}
      />

      <TransactionList
        storedTransactions={storedTransactions}
        onDeleteTransaction={handleDeleteTransaction}
      />
    </div>
  );
}

export default App;
