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
    notes: "Supermarket items",
  },
];

function App() {
  const [storedTransactions, setStoredTransactions] = useState(data);

  return (
    <div>
      <TransactionForm setStoredTransactions={setStoredTransactions} />
      <ul>
        {storedTransactions.map((transaction) => (
          <li key={transaction.id}>{transaction.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
