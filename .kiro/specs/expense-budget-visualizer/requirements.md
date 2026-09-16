# Expense & Budget Visualizer — Requirements

## Introduction

Expense & Budget Visualizer is a mobile-friendly client-side web application for recording daily spending. The application provides a transaction form, transaction history, total spending, and a category spending chart.

The implementation follows the assignment brief and uses HTML, CSS, and Vanilla JavaScript only. Data is stored in the browser using the Local Storage API.

## Functional Requirements

### Requirement 1 — Add Transaction

**User story:** As a student, I want to add an expense with a name, amount, and category so that I can record my spending.

**Acceptance criteria:**

1. WHEN the user submits the form with Item Name, Amount, and Category filled in, THE SYSTEM SHALL add the transaction to the transaction list.
2. WHEN the transaction is added, THE SYSTEM SHALL save the transaction in Local Storage.
3. WHEN a required field is empty, THE SYSTEM SHALL prevent submission and show a validation message.
4. WHEN the amount is zero, negative, or not a valid number, THE SYSTEM SHALL prevent submission and show a validation message.
5. WHEN the category is selected, THE SYSTEM SHALL use the selected category for the transaction.

### Requirement 2 — Transaction List

**User story:** As a student, I want to see my recorded expenses so that I can review my spending history.

**Acceptance criteria:**

1. WHEN transactions exist, THE SYSTEM SHALL display the item name, amount, category, and date for each transaction.
2. WHEN the transaction list contains many transactions, THE SYSTEM SHALL keep the list inside a scrollable area.
3. WHEN the user selects Delete on a transaction, THE SYSTEM SHALL remove that transaction from the list and Local Storage.
4. WHEN the page is opened again, THE SYSTEM SHALL load saved transactions from Local Storage.

### Requirement 3 — Total Spending

**User story:** As a student, I want to see the total amount spent so that I can understand my current spending.

**Acceptance criteria:**

1. WHEN a transaction is added, THE SYSTEM SHALL recalculate the total spending immediately.
2. WHEN a transaction is deleted, THE SYSTEM SHALL recalculate the total spending immediately.
3. WHEN there are no transactions, THE SYSTEM SHALL show a total of Rp0.

### Requirement 4 — Category Spending Chart

**User story:** As a student, I want to see my spending distribution by category so that I can understand where my money goes.

**Acceptance criteria:**

1. WHEN transactions exist, THE SYSTEM SHALL show a pie-style spending distribution for Food, Transport, and Fun, including any custom category that has transactions.
2. WHEN a transaction is added, THE SYSTEM SHALL update the chart automatically.
3. WHEN a transaction is deleted, THE SYSTEM SHALL update the chart automatically.
4. WHEN there are no transactions, THE SYSTEM SHALL show an empty-state message instead of misleading spending data.

### Requirement 5 — Custom Categories (Optional Challenge)

**User story:** As a student, I want to create another category so that my expense labels match my real spending.

**Acceptance criteria:**

1. WHEN the user enters a new non-empty category name, THE SYSTEM SHALL add it to the category options.
2. WHEN the category already exists, THE SYSTEM SHALL not create a duplicate.
3. WHEN a custom category is added, THE SYSTEM SHALL save the category in Local Storage.

### Requirement 6 — Monthly Summary (Optional Challenge)

**User story:** As a student, I want to filter the history by month so that I can review spending for a particular month.

**Acceptance criteria:**

1. WHEN the user chooses a month, THE SYSTEM SHALL show transactions from that month in the history view.
2. WHEN the selected month changes, THE SYSTEM SHALL update the displayed transaction count and monthly total.
3. THE SYSTEM SHALL keep all transactions stored even when a month filter is active.

### Requirement 7 — Dark/Light Mode (Optional Challenge)

**User story:** As a student, I want to switch the visual theme so that the application is comfortable to use in different environments.

**Acceptance criteria:**

1. WHEN the user selects the theme toggle, THE SYSTEM SHALL switch between light and dark presentation.
2. WHEN the theme changes, THE SYSTEM SHALL save the selected theme in Local Storage.
3. WHEN the page is opened again, THE SYSTEM SHALL restore the saved theme.

## Non-Functional Requirements

### Requirement 8 — Simplicity

1. THE SYSTEM SHALL use a clean, minimal interface.
2. THE SYSTEM SHALL use readable typography and clear visual hierarchy.
3. THE SYSTEM SHALL work without a backend server.

### Requirement 9 — Technical Constraints

1. THE SYSTEM SHALL use HTML for structure.
2. THE SYSTEM SHALL use CSS for styling.
3. THE SYSTEM SHALL use Vanilla JavaScript without React, Vue, or another frontend framework.
4. THE SYSTEM SHALL use the browser Local Storage API for client-side data storage.
5. THE SYSTEM SHALL keep exactly one CSS file inside `css/` and exactly one JavaScript file inside `js/`.

### Requirement 10 — Browser and Responsive Support

1. THE SYSTEM SHALL work in modern Chrome, Firefox, Edge, and Safari browsers.
2. THE SYSTEM SHALL provide a usable layout on mobile phone screens and desktop screens.
3. THE SYSTEM SHALL avoid noticeable lag during normal add, delete, filter, and theme interactions.
