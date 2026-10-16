# Expense Tracker

A React-based Expense Tracker that helps users manage their income and expenses, monitor their balance, and understand their spending habits.

## Features

- **Transaction Management** — Add, edit, and delete income and expense transactions.
- **Dashboard Summary** — View total balance, income, and expenses.
- **Search** — Find transactions by title.
- **Filtering** — Filter transactions by type and month.
- **Sorting** — Sort transactions by date and amount.
- **Pagination** — Display transactions across multiple pages.
- **Category Breakdown** — View expense totals by category and compare spending proportions.
- **Data Persistence** — Save transactions in LocalStorage so they remain available after refreshing the page.
- **Form Validation** — Validate transaction inputs before saving.

## Built With

- React
- JavaScript
- Vite
- Tailwind CSS
- daisyUI
- HTML5
- LocalStorage API

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <your-project-folder>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

## How to Use

1. Add a transaction by entering its details, including the title, amount, type, category, and date.
2. Edit or delete existing transactions as needed.
3. Search for transactions by title.
4. Filter transactions by income, expenses, or month.
5. Sort transactions by amount or date.
6. Navigate between pages to view more transactions.
7. Review the dashboard summary and category breakdown to understand your spending.

## Data Storage

The application uses the browser's LocalStorage API to persist transaction data between sessions. Transactions are stored locally in the browser rather than in a remote database.

**Note:** Clearing browser storage or using a different browser or device may remove or make the saved data unavailable.

## What I Learned

Through this project, I practised:

- Managing state with React hooks.
- Building reusable components.
- Implementing CRUD operations.
- Using array methods such as `map()`, `filter()`, and `reduce()`.
- Implementing search, filtering, sorting, and pagination.
- Calculating financial summaries and category totals.
- Persisting data with LocalStorage.
- Organising a React application into smaller components.

## Future Improvements

- Add spending charts and visual reports.
- Improve accessibility and responsive design.
- Add data export and import functionality.
- Introduce user accounts and database storage.

## License

This project was created for learning and portfolio purposes.
