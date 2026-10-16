import { formatCurrency } from "../utils/formatCurrency";

export default function SummaryCard({
  totalBalance,
  incomeBalance,
  expenseBalance,
  storedTransactions,
  filteredMonthly,
  setFilteredMonthly,
}) {
  const uniqueYearMonths = [
    ...new Set(storedTransactions.map((t) => t.date.slice(0, 7))),
  ];

  const monthOptions = uniqueYearMonths.map((yearMonthStr) => {
    const label = new Date(yearMonthStr).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });

    return {
      value: yearMonthStr,
      label: label,
    };
  });

  return (
    <div className="card bg-base-100 shadow-xl p-6 border border-base-200 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-base-300">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-base-content/70">
            Total Balance
          </span>
          <span className="text-2xl font-bold mt-1">
            {formatCurrency(totalBalance)}
          </span>
        </div>

        <div className="flex flex-col pt-4 sm:pt-0 sm:pl-4">
          <span className="text-sm font-medium text-base-content/70">
            Income
          </span>
          <span className="text-2xl font-bold mt-1 text-success">
            {formatCurrency(incomeBalance)}
          </span>
        </div>

        <div className="flex flex-col pt-4 sm:pt-0 sm:pl-4">
          <span className="text-sm font-medium text-base-content/70">
            Expense
          </span>
          <span className="text-2xl font-bold mt-1 text-error">
            {formatCurrency(expenseBalance)}
          </span>
        </div>

        <div className="flex flex-col pt-4 sm:pt-0 sm:pl-4">
          <select
            value={filteredMonthly}
            onChange={(e) => setFilteredMonthly(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="">All Months</option>
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
