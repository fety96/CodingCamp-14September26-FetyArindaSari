# Expense & Budget Visualizer — Implementation Tasks

## 1. Project Setup

- [x] 1.1 Create the HTML entry page.
- [x] 1.2 Create the single stylesheet at `css/style.css`.
- [x] 1.3 Create the single JavaScript file at `js/app.js`.
- [x] 1.4 Create `.kiro/specs/expense-budget-visualizer/` with requirements, design, and tasks artifacts.
- [x] 1.5 Create `.kiro/steering/` project context files.

## 2. Transaction Form

- [x] 2.1 Add Item Name, Amount, and Category controls.
- [x] 2.2 Add client-side validation for required fields.
- [x] 2.3 Add amount validation for positive numeric values.
- [x] 2.4 Add the submit handler to create a transaction object.

## 3. Local Storage

- [x] 3.1 Load saved transactions when the application starts.
- [x] 3.2 Save transactions after add and delete operations.
- [x] 3.3 Save and restore categories.
- [x] 3.4 Save and restore the selected theme.

## 4. Transaction History

- [x] 4.1 Render transaction name, amount, category, and date.
- [x] 4.2 Keep history inside a scrollable container.
- [x] 4.3 Add delete controls for each transaction.
- [x] 4.4 Show an empty state when there are no transactions.

## 5. Totals and Summary

- [x] 5.1 Calculate total spending from the transaction collection.
- [x] 5.2 Update total after adding or deleting a transaction.
- [x] 5.3 Add a month filter for the optional monthly summary.
- [x] 5.4 Update monthly count and total when the selected month changes.

## 6. Spending Chart

- [x] 6.1 Calculate total spending for each category.
- [x] 6.2 Convert category totals into percentages.
- [x] 6.3 Render the category distribution as a pie-style CSS chart.
- [x] 6.4 Update the chart after add/delete/filter operations.

## 7. Optional Challenges

- [x] 7.1 Add custom category creation.
- [x] 7.2 Add monthly summary filtering.
- [x] 7.3 Add light/dark mode toggle.

## 8. Responsive UI and Quality

- [x] 8.1 Make the application usable on mobile screens.
- [x] 8.2 Add clear visual hierarchy and readable typography.
- [x] 8.3 Keep CSS and JavaScript readable and dependency-free.
- [x] 8.4 Verify there is only one CSS file in `css/` and one JavaScript file in `js/`.

## 9. Manual Verification

- [x] 9.1 Add a Food transaction and verify the total changes.
- [x] 9.2 Add Transport and Fun transactions and verify chart distribution.
- [x] 9.3 Delete a transaction and verify total/list/chart update.
- [x] 9.4 Refresh the page and verify Local Storage persistence.
- [x] 9.5 Create a custom category and verify it remains after refresh.
- [x] 9.6 Change month filter and verify the summary/history view.
- [x] 9.7 Toggle theme and verify it remains after refresh.
- [x] 9.8 Check the layout at a mobile viewport width.
