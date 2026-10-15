import { formatCurrency } from "../utils/formatCurrency";

export default function CategoryBreakdown({ storedTransactions }) {
  const filteredExpense = storedTransactions.filter(
    (transaction) => transaction.type === "expense",
  );

  const categoryTotal = filteredExpense.reduce((totals, transaction) => {
    const category = transaction.category;
    totals[category] = (totals[category] || 0) + transaction.amount;
    return totals;
  }, {});

  const totalExpenses = Object.values(categoryTotal).reduce(
    (total, amount) => total + amount,
    0,
  );

  return (
    <div className="card bg-base-100 shadow-xl p-6 border border-base-200 w-full">
      <h2 className="text-xl font-bold mb-4 text-base-content">
        Category Breakdown
      </h2>

      {Object.keys(categoryTotal).length === 0 ? (
        <p className="text-sm text-base-content/60 py-4 text-center">
          No expense data available for breakdown.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {Object.entries(categoryTotal).map(([category, amount]) => {
            const percentage =
              totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;

            return (
              <div key={category} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-sm font-medium text-base-content">
                  <span>{category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-base-content/60 text-xs">
                      {formatCurrency(amount)}
                    </span>
                    <span className="font-bold">{percentage.toFixed(0)}%</span>
                  </div>
                </div>
                <progress
                  className="progress progress-primary w-full h-2.5"
                  value={amount}
                  max={totalExpenses}
                ></progress>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
