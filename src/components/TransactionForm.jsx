import {
  AlertCircle,
  ChevronDown,
  DollarSign,
  FileText,
  LayoutGrid,
  ListFilter,
} from "lucide-react";
import { useState } from "react";

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

const initialForm = {
  title: "",
  amount: "",
  type: "",
  category: "",
};

export default function TransactionForm({
  storedTransactions,
  setStoredTransactions,
  selectedTransaction,
  setSelectedTransaction,
}) {
  const [inputForm, setInputForm] = useState(
    selectedTransaction
      ? {
          title: selectedTransaction.title,
          amount: selectedTransaction.amount,
          type: selectedTransaction.type,
          category: selectedTransaction.category,
        }
      : initialForm,
  );
  const [checkInput, setCheckInput] = useState(false);
  const [checkAmountValid, setCheckAmountValid] = useState(false);

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

  const handleCancelTransaction = () => {
    setSelectedTransaction(null);
    setInputForm(initialForm);
    setCheckInput(false);
    setCheckAmountValid(false);
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

    if (selectedTransaction) {
      setStoredTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === selectedTransaction.id
            ? {
                ...inputForm,
                amount: numericAmount,
                id: transaction.id,
                date: new Date().toISOString(),
              }
            : transaction,
        ),
      );
      setSelectedTransaction(null);
    } else {
      const newTransaction = {
        title: title.trim(),
        amount: numericAmount,
        type,
        category,
        date: new Date().toISOString(),
        id: newId ? newId + 1 : 1,
      };
      setStoredTransactions((prev) => [...prev, newTransaction]);
    }
    setInputForm(initialForm);
    setCheckInput(false);
    setCheckAmountValid(false);
  };

  return (
    <form
      onSubmit={handleAddTransaction}
      className="card bg-base-100 shadow-xl p-6 w-full border border-base-200 rounded-2xl"
    >
      <h2 className="text-xl font-bold mb-5 text-base-content tracking-tight">
        {selectedTransaction ? "Edit Transaction" : "Add New Transaction"}
      </h2>

      <div className="flex flex-col gap-4">
        <div className="form-control w-full">
          <label className="label pb-1" htmlFor="title">
            <span className="label-text font-medium text-base-content/80 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Title
            </span>
          </label>
          <input
            type="text"
            id="title"
            placeholder="e.g., Groceries, Salary"
            value={inputForm.title}
            onChange={(e) => handleInputChange(e.target.id, e.target.value)}
            className="input input-bordered w-full focus:outline-none focus:border-primary transition-all duration-200"
          />
        </div>

        <div className="form-control w-full">
          <label className="label pb-1" htmlFor="amount">
            <span className="label-text font-medium text-base-content/80 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              Amount
            </span>
          </label>
          <div
            className={`input input-bordered flex items-center gap-2 w-full focus-within:border-primary transition-all duration-200 ${checkAmountValid ? "input-error" : ""}`}
          >
            <span className="text-base-content/50 font-medium">$</span>
            <input
              type="number"
              id="amount"
              step="0.01"
              placeholder="0.00"
              value={inputForm.amount}
              onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
          {checkAmountValid && (
            <label className="label pt-1 pb-0">
              <span className="label-text-alt text-error flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                Amount must be greater than 0
              </span>
            </label>
          )}
        </div>

        <div className="dropdown dropdown-bottom w-full">
          <label className="label pb-1" htmlFor="type">
            <span className="label-text font-medium text-base-content/80 flex items-center gap-2">
              <ListFilter className="w-4 h-4 text-primary" />
              Type
            </span>
          </label>
          <div
            tabIndex={0}
            role="button"
            className="select select-bordered w-full flex items-center justify-between focus:outline-none focus:border-primary transition-all duration-200"
          >
            <span
              className={
                inputForm.type
                  ? "text-base-content font-medium capitalize"
                  : "text-base-content/40"
              }
            >
              {inputForm.type || "Select type"}
            </span>
            <ChevronDown className="w-5 h-5 opacity-50" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-full z-[1] border border-base-200 mt-1"
          >
            {DEFAULT_VALUES.types.map((type) => (
              <li key={type}>
                <button
                  type="button"
                  onClick={() => handleInputChange("type", type)}
                  className="capitalize py-2.5 rounded-lg hover:bg-primary hover:text-primary-content transition-colors"
                >
                  {type}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="dropdown dropdown-bottom w-full form-control">
          <label className="label pb-1" htmlFor="category">
            <span className="label-text font-medium text-base-content/80 flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-primary" />
              Category
            </span>
          </label>
          <div
            tabIndex={0}
            role="button"
            className="select select-bordered w-full flex items-center justify-between focus:outline-none focus:border-primary transition-all duration-200"
          >
            <span
              className={
                inputForm.category
                  ? "text-base-content font-medium"
                  : "text-base-content/40"
              }
            >
              {inputForm.category || "Select category"}
            </span>
            <ChevronDown className="w-5 h-5 opacity-50" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-full z-[1] border border-base-200 mt-1"
          >
            {DEFAULT_VALUES.categories.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange("category", cat);
                  }}
                  className="text-left py-2.5 rounded-lg hover:bg-primary hover:text-primary-content transition-colors"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {checkInput && (
          <div className="alert alert-error py-2.5 px-4 text-sm font-medium text-error-content rounded-lg flex items-center gap-2 mt-1">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>All fields are required!</span>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary mt-3 w-full shadow-md font-semibold hover:shadow-lg transition-all"
        >
          {selectedTransaction ? "Update Transaction" : "Add Transaction"}
        </button>

        {selectedTransaction && (
          <button
            type="button"
            onClick={handleCancelTransaction}
            className="btn btn-outline btn-primary mt-1 w-full shadow-sm font-semibold transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
