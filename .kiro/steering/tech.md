# Technical Context

## Required stack

- HTML
- CSS
- Vanilla JavaScript
- Browser Local Storage API

## Constraints

- No React, Vue, or other frontend frameworks.
- No backend server.
- No external database.
- Exactly one CSS file under `css/`.
- Exactly one JavaScript file under `js/`.

## Code organization

- Keep DOM queries and event handlers easy to locate.
- Keep state in plain JavaScript arrays/values.
- Update the DOM after state changes.
- Use small functions with clear names.
- Avoid unnecessary dependencies.

## Browser target

Modern Chrome, Firefox, Edge, and Safari.

## Data

Persist transactions, custom categories, and theme settings in Local Storage. Handle missing or malformed stored values without crashing the page.

## Validation

All form input must be validated before a transaction is saved.
