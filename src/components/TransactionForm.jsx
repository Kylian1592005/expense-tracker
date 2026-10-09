import { useState } from "react";

export default function TransactionForm({
  storedTransactions,
  setStoredTransactions,
}) {
  const initialForm = {
    title: "",
    amount: "",
    type: "",
    category: "",
  };

  const [inputForm, setInputForm] = useState(initialForm);
  const [checkInput, setCheckInput] = useState(false);
  const [checkAmountValid, setCheckAmountValid] = useState(false);

  const DEFAULT_VALUES = {
    types: ["expense", "income"],
    categories: [
      "Food & Dining",
      "Housing & Utilities",
      "Transportation",
      "Entertainment",
      "Shopping",
      "Salary",
      "Other",
    ],
  };

  const handleInputChange = (id, value) => {
    setInputForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
    if (id === "amount") {
      if (value > 0) {
        setCheckAmountValid(false);
      }
    }
  };

  const newId = storedTransactions.reduce((max, currentValue) => {
    return Number(currentValue.id) > Number(max)
      ? Number(currentValue.id)
      : Number(max);
  }, 0);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const { title, amount, type, category } = inputForm;
    const numericAmount = parseFloat(amount);

    if (!title.trim() || !amount || !type || !category) {
      setCheckInput(true);
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setCheckAmountValid(true);
      return;
    }

    const newTransaction = {
      title: title.trim(),
      amount: numericAmount,
      type,
      category,
      date: new Date(),
      id: newId ? newId + 1 : 1,
    };
    setStoredTransactions((prev) => [...prev, newTransaction]);
    setInputForm(initialForm);
    setCheckInput(false);
    setCheckAmountValid(false);
  };

  return (
    <form onSubmit={handleAddTransaction}>
      <div>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={inputForm.title}
          onChange={(e) => handleInputChange(e.target.id, e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="amount">Amount($): </label>
        <input
          type="number"
          id="amount"
          step="0.01"
          value={inputForm.amount}
          onChange={(e) => handleInputChange(e.target.id, e.target.value)}
        />
        {checkAmountValid && (
          <p style={{ color: "red" }}>Amount must be greater than 0</p>
        )}
      </div>

      <div>
        <label htmlFor="type">Type: </label>
        <select
          id="type"
          value={inputForm.type}
          onChange={(e) => handleInputChange(e.target.id, e.target.value)}
        >
          <option value="" disabled>
            Select type
          </option>
          {DEFAULT_VALUES.types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="category">Category: </label>
        <select
          id="category"
          value={inputForm.category}
          onChange={(e) => handleInputChange(e.target.id, e.target.value)}
        >
          <option value="" disabled>
            Select category
          </option>
          {DEFAULT_VALUES.categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {checkInput && <p style={{ color: "red" }}>All fields are required!</p>}

      <button type="submit">Add transaction</button>
    </form>
  );
}
