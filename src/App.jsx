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
    return storedData ? JSON.parse(storedData) : data;
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
    <div className="min-h-screen bg-base-300 py-10 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <header className="card bg-base-100 shadow-xl p-6 border border-base-200 w-full text-center">
          <h1 className="text-3xl font-extrabold text-base-content">
            Expense Tracker
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            Manage your income and expenses seamlessly
          </p>
        </header>

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
    </div>
  );
}

export default App;