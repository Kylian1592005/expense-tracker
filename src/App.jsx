import { useEffect, useState } from "react";
import "./App.css";
import TransactionForm from "./components/TransactionForm";
import SummaryCard from "./components/SummaryCard";
import SearchFilter from "./components/SearchFilter";
import { data } from "./data/data";
import CategoryBreakdown from "./components/CategoryBreakdown";
import PaginationWithHistory from "./components/PaginationWithHistory";

function App() {
  const [storedTransactions, setStoredTransactions] = useState(() => {
    const storedData = localStorage.getItem("transactions");
    return storedData ? JSON.parse(storedData) : data;
  });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredType, setFilteredType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [dateSortOrder, setDateSortOrder] = useState("");
  const [filteredMonthly, setFilteredMonthly] = useState("");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(storedTransactions));
  }, [storedTransactions]);

  const monthlyTransactions = storedTransactions.filter((transaction) =>
    transaction.date.startsWith(filteredMonthly),
  );

  const typeExpense = monthlyTransactions.filter(
    (transaction) => transaction.type === "expense",
  );
  const typeIncome = monthlyTransactions.filter(
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

  const handleEditTransaction = (id) => {
    const target = storedTransactions.find(
      (transaction) => transaction.id === id,
    );
    if (!target) return;

    setSelectedTransaction(target);
  };

  const filteredTransactions = storedTransactions
    .filter((transaction) => {
      const cleanQuery = query.trim().toLowerCase();
      const matchSearch = transaction.title.toLowerCase().includes(cleanQuery);
      const matchType = transaction.type.includes(filteredType);
      return matchSearch && matchType;
    })

    .sort((a, b) => {
      if (sortOrder === "asc") return a.amount - b.amount;
      if (sortOrder === "desc") return b.amount - a.amount;
      if (dateSortOrder === "newest")
        return new Date(b.date) - new Date(a.date);
      if (dateSortOrder === "oldest")
        return new Date(a.date) - new Date(b.date);
    });

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
          storedTransactions={storedTransactions}
          filteredMonthly={filteredMonthly}
          setFilteredMonthly={setFilteredMonthly}
        />

        <CategoryBreakdown storedTransactions={storedTransactions} />

        <TransactionForm
          key={selectedTransaction ? selectedTransaction.id : "new"}
          storedTransactions={storedTransactions}
          setStoredTransactions={setStoredTransactions}
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
        />

        <SearchFilter
          query={query}
          setQuery={setQuery}
          filteredType={filteredType}
          setFilteredType={setFilteredType}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          dateSortOrder={dateSortOrder}
          setDateSortOrder={setDateSortOrder}
        />

        <PaginationWithHistory
          filteredTransactions={filteredTransactions}
          onEditTransaction={handleEditTransaction}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </div>
    </div>
  );
}

export default App;
