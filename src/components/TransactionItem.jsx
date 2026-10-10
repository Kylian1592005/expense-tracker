import dayjs from "dayjs";
import { formatCurrency } from "../utils/formatCurrency";

export default function TransactionItem({ transaction, onDeleteTransaction }) {
  return (
    <article key={transaction.id} className="transaction-card">
      <header>
        <h3>{transaction.title}</h3>
        <span className="transaction-category">{transaction.category}</span>
      </header>
      
      <div>
        <p className="transaction-date">
          {dayjs(transaction.date).format("MM/DD/YYYY")}
        </p>
        
        <data
          value={transaction.amount}
          className={`transaction-amount ${transaction.type}`}
        >
          {formatCurrency(transaction.amount)}
        </data>
        <span>{transaction.type}</span>
        
        <button onClick={() => onDeleteTransaction(transaction.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
