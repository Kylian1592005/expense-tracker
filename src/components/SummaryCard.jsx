import { formatCurrency } from "../utils/formatCurrency";

export default function SummaryCard({totalBalance, incomeBalance, expenseBalance}) {
  return (
    <div>
      <div>
        <h2>Total Balance</h2>
        <p>{formatCurrency(totalBalance)}</p>
      </div>
       <div>
        <h2>Income</h2>
        <p>{formatCurrency(incomeBalance)}</p>
      </div>
       <div>
        <h2>Expense</h2>
        <p>{formatCurrency(expenseBalance)}</p>
      </div>
    </div>
  )
}
