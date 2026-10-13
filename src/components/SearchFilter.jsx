export default function SearchFilter({
  query,
  setQuery,
  filteredType,
  setFilteredType,
  sortOrder,
  setSortOrder,
  dateSortOrder,
  setDateSortOrder,
}) {
  return (
    <div className="bg-base-100 p-4 rounded-box shadow-md flex flex-col gap-4">
      <h1 className="text-xl font-bold">Search & Filter</h1>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search transactions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />

        <select
          value={filteredType}
          onChange={(e) => setFilteredType(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">All Types</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">Sort by Amount</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>

        <select
          value={dateSortOrder}
          onChange={(e) => setDateSortOrder(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">Sort by Date</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}
