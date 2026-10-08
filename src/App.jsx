import { useState } from "react";
import "./App.css";
import TransactionForm from "./components/TransactionForm";

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
    amount: 45.5,
    type: "expense",
    category: "Food",
    date: "2026-10-07",
  },
];

function App() {
  const [storedTransactions, setStoredTransactions] = useState(data);

  return (
    <div>
      <h1>Expense Tracker</h1>
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
