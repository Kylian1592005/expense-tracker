import { useState } from "react";

export default function TransactionForm({ setStoredTransactions }) {
  const [inputForm, setInputForm] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
  });

  const DEFAULT_CATEGORIES = [
    "Food & Dining",
    "Housing & Utilities",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Salary",
    "Other",
  ];

  const DEFAULT_TYPE = ["expense", "income"];

  const handleInputChange = (id, value) => {
    setInputForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleAddTransaction = () =>
    setStoredTransactions((prev) => [...prev, inputForm]);

  return (
    <div>
      <h1>Form</h1>
      <div>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={inputForm.title}
          onChange={(e) => handleInputChange(e.target.id, e.target.value)}
        />

        <label htmlFor="amount">Amount($): </label>
        <input
          type="text"
          id="amount"
          value={inputForm.amount}
          onChange={(e) => handleInputChange(e.target.id, e.target.value)}
        />

        <label htmlFor="type">Type: </label>
        <select
          id="type"
          value={inputForm.type}
          onChange={(e) => handleInputChange(e.target.id, e.target.value)}
        >
          <option value="" disabled>
            Select type
          </option>
          {DEFAULT_TYPE.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label htmlFor="category">Category: </label>
        <select
          id="category"
          value={inputForm.category}
          onChange={(e) => handleInputChange(e.target.id, e.target.value)}
        >
          <option value="" disabled>
            Select category
          </option>
          {DEFAULT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button onClick={handleAddTransaction}>Add transaction</button>
      </div>
    </div>
  );
}
