# Expense & Budget Visualizer — Design

## 1. Overview

The application is a small single-page client-side web app. It has no backend and stores all user-created data in Local Storage.

The implementation stays deliberately simple to match the assignment constraints:

- HTML: page structure and form controls.
- CSS: layout, responsive behavior, light/dark themes, and transaction styling.
- Vanilla JavaScript: state management, validation, Local Storage, rendering, filtering, totals, and chart drawing.

## 2. Project Structure

```text
expense-budget-visualizer/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── .kiro/
│   ├── steering/
│   │   ├── product.md
│   │   └── tech.md
│   └── specs/
│       └── expense-budget-visualizer/
│           ├── requirements.md
│           ├── design.md
│           └── tasks.md
├── README.md
└── .gitignore
```

## 3. Main UI Areas

### Header

Contains the application title and the light/dark theme control.

### Summary Area

Shows the total spending and the current number of transactions. A month filter can be used for the monthly summary.

### Add Expense Form

Fields:

- Item Name
- Amount
- Category

Includes validation feedback and a small control for creating a custom category.

### Transaction History

Displays saved transactions in a vertically scrollable area. Each item contains the name, amount, category, date, and a delete action.

### Spending Chart

Uses a CSS `conic-gradient` to represent category spending without requiring an external chart package. The legend shows category names and calculated amounts.

## 4. Client-Side State

The JavaScript maintains three main pieces of persistent data:

- `transactions`: array of transaction objects.
- `categories`: array containing default and custom categories.
- `theme`: current theme name.

A transaction has this basic shape:

```js
{
  id: "...",
  name: "Lunch",
  amount: 25000,
  category: "Food",
  date: "2026-09-16"
}
```

## 5. Local Storage

Data is serialized with `JSON.stringify()` before saving and parsed with `JSON.parse()` when loading.

Suggested keys used by the implementation:

```text
expense_transactions
expense_categories
expense_theme
```

The application does not send these values to a server.

## 6. Main JavaScript Flow

### Page load

1. Load transactions, categories, and theme from Local Storage.
2. Populate category controls.
3. Set the month filter to the current month.
4. Render the history.
5. Recalculate totals.
6. Recalculate category spending.
7. Render the chart.

### Add transaction

1. Read form values.
2. Trim the item name.
3. Convert the amount to a number.
4. Validate required fields and amount.
5. Create a transaction object.
6. Add it to the in-memory transaction array.
7. Save the array to Local Storage.
8. Clear the form.
9. Re-render the affected sections.

### Delete transaction

1. Identify the selected transaction by ID.
2. Remove it from the array.
3. Save the new array to Local Storage.
4. Re-render the affected sections.

## 7. Filtering and Monthly Summary

The stored transaction array remains unchanged when a month is selected. The UI creates a filtered view from the stored array. This keeps the user's full history available.

The monthly summary uses the same filtered collection to calculate:

- number of transactions
- total spending for the selected month

## 8. Chart Calculation

The chart is calculated from the currently displayed transaction collection.

For each category:

```text
category total = sum(amount for transactions in category)
```

Then:

```text
percentage = category total / all category totals * 100
```

The percentages are converted into conic-gradient stops to create the pie-style chart.

## 9. Validation and Error Handling

The form prevents invalid transactions from being added.

Validation covers:

- missing item name
- missing amount
- amount that is not numeric
- amount less than or equal to zero
- missing category

Local Storage reads are guarded so an invalid stored value does not crash the application.

## 10. Responsive Behavior

The layout uses CSS Grid/Flexbox and a mobile breakpoint. On small screens, sections stack vertically and form controls expand to the available width.

## 11. Requirement Traceability

| Requirement | Implementation area |
|---|---|
| R1 Add Transaction | Form + `addTransaction()` |
| R2 Transaction List | History renderer + delete handler |
| R3 Total Spending | `updateTotals()` |
| R4 Category Chart | `updateChart()` |
| R5 Custom Categories | Category management UI |
| R6 Monthly Summary | Month filter + summary calculation |
| R7 Dark/Light Mode | Theme toggle + Local Storage |
| R8 Simplicity | Single-page UI and small dependency footprint |
| R9 Technical Constraints | `index.html`, one CSS, one JS, Local Storage |
| R10 Responsive Support | Responsive CSS and modern browser APIs |

## 12. Testing Approach

No test framework is required by the assignment. Manual browser checks cover:

- adding valid and invalid transactions
- deleting transactions
- persistence after refresh
- chart updates
- custom category creation
- month filtering
- light/dark theme persistence
- mobile-width layout
