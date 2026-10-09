import { useState } from "react";
import "./App.css";
import TransactionForm from "./components/TransactionForm";
import SummaryCard from "./components/SummaryCard";

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
  const [storedTransactions, setStoredTransactions] = useState(data);

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
      <ul>
        {storedTransactions.map((transaction) => (
          <li key={transaction.id}>{transaction.id}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
