import dayjs from "dayjs";
import { formatCurrency } from "../utils/formatCurrency";

export default function TransactionItem({ transaction, onDeleteTransaction }) {
  return (
    <article 
      key={transaction.id} 
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-base-200/60 rounded-box border border-base-300 gap-3"
    >
      <header className="flex flex-col sm:flex-row sm:items-center gap-2">
        <h3 className="font-bold text-base text-base-content">{transaction.title}</h3>
        <span className="badge badge-outline badge-sm transaction-category">{transaction.category}</span>
      </header>
      
      <div className="flex items-center justify-between sm:justify-end gap-3 flex-wrap">
        <p className="transaction-date text-xs text-base-content/70">
          {dayjs(transaction.date).format("MM/DD/YYYY")}
        </p>
        
        <data
          value={transaction.amount}
          className={`font-semibold transaction-amount ${transaction.type === 'income' ? 'text-success' : 'text-error'} ${transaction.type}`}
        >
          {formatCurrency(transaction.amount)}
        </data>
        
        <span className="badge badge-ghost badge-sm capitalize">{transaction.type}</span>
        
        <button 
          onClick={() => onDeleteTransaction(transaction.id)}
          className="btn btn-sm btn-outline btn-error ml-2"
        >
          Delete
        </button>
      </div>
    </article>
  );
}