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
      date: new Date().toISOString(),
      id: newId ? newId + 1 : 1,
    };
    setStoredTransactions((prev) => [...prev, newTransaction]);
    setInputForm(initialForm);
    setCheckInput(false);
    setCheckAmountValid(false);
  };

  return (
  <form
      onSubmit={handleAddTransaction}
      className="card bg-base-100 shadow-xl p-6 w-full border border-base-200"
    >
      <h2 className="text-xl font-bold mb-4 text-base-content">
        Add New Transaction
      </h2>

      <div className="flex flex-col gap-4">
        <div className="form-control w-full">
          <label className="label" htmlFor="title">
            <span className="label-text font-medium">Title</span>
          </label>
          <input
            type="text"
            id="title"
            placeholder="e.g., Groceries, Salary"
            value={inputForm.title}
            onChange={(e) => handleInputChange(e.target.id, e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full">
          <label className="label" htmlFor="amount">
            <span className="label-text font-medium">Amount ($)</span>
          </label>
          <input
            type="number"
            id="amount"
            step="0.01"
            placeholder="0.00"
            value={inputForm.amount}
            onChange={(e) => handleInputChange(e.target.id, e.target.value)}
            className="input input-bordered w-full"
          />
          {checkAmountValid && (
            <label className="label">
              <span className="label-text-alt text-error">
                Amount must be greater than 0
              </span>
            </label>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label" htmlFor="type">
            <span className="label-text font-medium">Type</span>
          </label>
          <select
            id="type"
            value={inputForm.type}
            onChange={(e) => handleInputChange(e.target.id, e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Select type
            </option>
            {DEFAULT_VALUES.types.map((type) => (
              <option key={type} value={type} className="capitalize">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control w-full">
          <label className="label" htmlFor="category">
            <span className="label-text font-medium">Category</span>
          </label>
          <select
            id="category"
            value={inputForm.category}
            onChange={(e) => handleInputChange(e.target.id, e.target.value)}
            className="select select-bordered w-full"
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

        {checkInput && (
          <div className="alert alert-error py-2 text-sm text-white">
            <span>All fields are required!</span>
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-2 w-full">
          Add Transaction
        </button>
      </div>
    </form>
  );
}
