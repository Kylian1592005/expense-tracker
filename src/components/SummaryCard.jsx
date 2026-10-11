import { formatCurrency } from "../utils/formatCurrency";

export default function SummaryCard({ totalBalance, incomeBalance, expenseBalance }) {
  return (
    <div className="card bg-base-100 shadow-xl p-6 border border-base-200 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-base-300">
        
        <div className="flex flex-col">
          <span className="text-sm font-medium text-base-content/70">Total Balance</span>
          <span className="text-2xl font-bold mt-1">{formatCurrency(totalBalance)}</span>
        </div>

        <div className="flex flex-col pt-4 sm:pt-0 sm:pl-4">
          <span className="text-sm font-medium text-base-content/70">Income</span>
          <span className="text-2xl font-bold mt-1 text-success">{formatCurrency(incomeBalance)}</span>
        </div>

        <div className="flex flex-col pt-4 sm:pt-0 sm:pl-4">
          <span className="text-sm font-medium text-base-content/70">Expense</span>
          <span className="text-2xl font-bold mt-1 text-error">{formatCurrency(expenseBalance)}</span>
        </div>

      </div>
    </div>
  );
}