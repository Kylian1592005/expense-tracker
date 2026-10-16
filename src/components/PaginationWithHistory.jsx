import { useState } from "react";
import TransactionList from "./TransactionList";

export default function PaginationWithHistory({
  filteredTransactions,
  onEditTransaction,
  onDeleteTransaction,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerpage = 5;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerpage);

  const safeCurrentPage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

  const firstIndex = (safeCurrentPage - 1) * itemsPerpage;
  const lastIndex = safeCurrentPage * itemsPerpage;
  const currentItems = filteredTransactions.slice(firstIndex, lastIndex);

  return (
    <div className="flex flex-col gap-4 w-full">
      <TransactionList
        storedTransactions={currentItems}
        onEditTransaction={onEditTransaction}
        onDeleteTransaction={onDeleteTransaction}
      />

      {totalPages > 0 && (
        <div className="flex items-center justify-between px-2 py-3 bg-base-100 shadow-md border border-base-200 rounded-xl">
          <button
            type="button"
            disabled={safeCurrentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="btn btn-sm btn-outline btn-primary disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm font-medium text-base-content/80">
            Page {safeCurrentPage} of {totalPages}
          </span>

          <button
            type="button"
            disabled={safeCurrentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="btn btn-sm btn-outline btn-primary disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}