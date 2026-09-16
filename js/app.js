const defaultCategories = ['Food', 'Transport', 'Fun'];
let transactions = getData('transactions', []);
let categories = getData('categories', defaultCategories);
let darkMode = localStorage.getItem('darkMode') === 'true';

if (!Array.isArray(transactions)) transactions = [];
if (!Array.isArray(categories)) categories = [...defaultCategories];

const form = document.getElementById('expenseForm');
const nameInput = document.getElementById('itemName');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const nameError = document.getElementById('nameError');
const amountError = document.getElementById('amountError');
const categoryError = document.getElementById('categoryError');
const formMessage = document.getElementById('formMessage');
const totalBalance = document.getElementById('totalBalance');
const totalInfo = document.getElementById('totalInfo');
const monthlyTotal = document.getElementById('monthlyTotal');
const monthInfo = document.getElementById('monthInfo');
const transactionList = document.getElementById('transactionList');
const monthFilter = document.getElementById('monthFilter');
const summaryMonth = document.getElementById('summaryMonth');
const summaryTotal = document.getElementById('summaryTotal');
const summaryCount = document.getElementById('summaryCount');
const summaryAverage = document.getElementById('summaryAverage');
const pieChart = document.getElementById('pieChart');
const chartLegend = document.getElementById('chartLegend');
const themeButton = document.getElementById('themeButton');
const categoryDialog = document.getElementById('categoryDialog');
const categoryButton = document.getElementById('categoryButton');
const closeCategory = document.getElementById('closeCategory');
const categoryForm = document.getElementById('categoryForm');
const newCategory = document.getElementById('newCategory');
const categoryList = document.getElementById('categoryList');

function getData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveData() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
  localStorage.setItem('categories', JSON.stringify(categories));
}

function formatMoney(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
}

function makeId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function getMonthKey(date) {
  const value = new Date(date);
  return value.getFullYear() + '-' + String(value.getMonth() + 1).padStart(2, '0');
}

function getMonthName(key) {
  const parts = key.split('-');
  const date = new Date(Number(parts[0]), Number(parts[1]) - 1, 1);
  return date.toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric'
  });
}

function currentMonth() {
  return getMonthKey(new Date());
}

function showCategories() {
  categoryInput.innerHTML = '';

  categories.forEach(function(category) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryInput.appendChild(option);
  });
}

function clearErrors() {
  nameError.textContent = '';
  amountError.textContent = '';
  categoryError.textContent = '';
  formMessage.textContent = '';
}

function validateForm() {
  clearErrors();
  let valid = true;

  if (nameInput.value.trim() === '') {
    nameError.textContent = 'Item name is required.';
    valid = false;
  }

  const amount = Number(amountInput.value);
  if (!amount || amount <= 0) {
    amountError.textContent = 'Amount must be more than 0.';
    valid = false;
  }

  if (!categories.includes(categoryInput.value)) {
    categoryError.textContent = 'Please choose a category.';
    valid = false;
  }

  return valid;
}

function addTransaction(event) {
  event.preventDefault();

  if (!validateForm()) return;

  transactions.push({
    id: makeId(),
    name: nameInput.value.trim(),
    amount: Number(amountInput.value),
    category: categoryInput.value,
    date: new Date().toISOString()
  });

  saveData();
  form.reset();
  formMessage.textContent = 'Transaction added.';
  updatePage();
}

function deleteTransaction(id) {
  transactions = transactions.filter(function(item) {
    return String(item.id) !== String(id);
  });

  saveData();
  updatePage();
}

function getAvailableMonths() {
  const months = [currentMonth()];

  transactions.forEach(function(item) {
    const month = getMonthKey(item.date);
    if (!months.includes(month)) months.push(month);
  });

  months.sort().reverse();
  return months;
}

function showMonthOptions() {
  const oldFilter = monthFilter.value;
  const oldSummary = summaryMonth.value;
  const months = getAvailableMonths();

  monthFilter.innerHTML = '<option value="all">All Months</option>';
  summaryMonth.innerHTML = '';

  months.forEach(function(month) {
    const option1 = document.createElement('option');
    option1.value = month;
    option1.textContent = getMonthName(month);
    monthFilter.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = month;
    option2.textContent = getMonthName(month);
    summaryMonth.appendChild(option2);
  });

  if (oldFilter === 'all' || months.includes(oldFilter)) {
    monthFilter.value = oldFilter || 'all';
  } else {
    monthFilter.value = 'all';
  }

  if (months.includes(oldSummary)) {
    summaryMonth.value = oldSummary;
  } else {
    summaryMonth.value = currentMonth();
  }
}

function showTransactions() {
  let list = transactions.slice();

  if (monthFilter.value !== 'all') {
    list = list.filter(function(item) {
      return getMonthKey(item.date) === monthFilter.value;
    });
  }

  list.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  if (list.length === 0) {
    transactionList.innerHTML = '<div class="empty">No transactions yet.</div>';
    return;
  }

  transactionList.innerHTML = '';

  list.forEach(function(item) {
    const row = document.createElement('div');
    row.className = 'transaction';

    const left = document.createElement('div');
    const name = document.createElement('p');
    name.className = 'transaction-name';
    name.textContent = item.name;

    const info = document.createElement('p');
    info.className = 'transaction-info';
    info.textContent = item.category + ' • ' + new Date(item.date).toLocaleDateString('id-ID');

    left.appendChild(name);
    left.appendChild(info);

    const right = document.createElement('div');
    right.className = 'transaction-right';

    const amount = document.createElement('span');
    amount.className = 'transaction-amount';
    amount.textContent = formatMoney(item.amount);

    const button = document.createElement('button');
    button.className = 'delete-button';
    button.type = 'button';
    button.textContent = 'Delete';
    button.addEventListener('click', function() {
      deleteTransaction(item.id);
    });

    right.appendChild(amount);
    right.appendChild(button);

    row.appendChild(left);
    row.appendChild(right);
    transactionList.appendChild(row);
  });
}

function updateTotals() {
  let total = 0;

  transactions.forEach(function(item) {
    total += Number(item.amount);
  });

  totalBalance.textContent = formatMoney(total);
  totalInfo.textContent = transactions.length + (transactions.length === 1 ? ' transaction' : ' transactions');

  const month = currentMonth();
  const monthItems = transactions.filter(function(item) {
    return getMonthKey(item.date) === month;
  });

  let monthTotal = 0;
  monthItems.forEach(function(item) {
    monthTotal += Number(item.amount);
  });

  monthlyTotal.textContent = formatMoney(monthTotal);
  monthInfo.textContent = getMonthName(month) + ' • ' + monthItems.length + ' transaction' + (monthItems.length === 1 ? '' : 's');
}

function drawChart() {
  const totals = {};
  let total = 0;

  transactions.forEach(function(item) {
    const value = Number(item.amount);
    totals[item.category] = (totals[item.category] || 0) + value;
    total += value;
  });

  if (total === 0) {
    pieChart.style.background = '#e5e7eb';
    chartLegend.innerHTML = '<div class="empty">No spending recorded.</div>';
    return;
  }

  const colors = {
    Food: 'var(--food)',
    Transport: 'var(--transport)',
    Fun: 'var(--fun)'
  };
  const extraColors = ['#8b5cf6', '#ec4899', '#06b6d4', '#64748b'];
  let extraIndex = 0;
  let start = 0;
  const parts = [];
  chartLegend.innerHTML = '';

  Object.keys(totals).forEach(function(category) {
    const percent = (totals[category] / total) * 100;
    let color = colors[category];

    if (!color) {
      color = extraColors[extraIndex % extraColors.length];
      extraIndex++;
    }

    parts.push(color + ' ' + start + '% ' + (start + percent) + '%');
    start += percent;

    const row = document.createElement('div');
    row.className = 'legend-row';

    const dot = document.createElement('span');
    dot.className = 'legend-dot';
    dot.style.background = color;

    const name = document.createElement('span');
    name.className = 'legend-name';
    name.textContent = category;

    const value = document.createElement('span');
    value.textContent = formatMoney(totals[category]);

    row.appendChild(dot);
    row.appendChild(name);
    row.appendChild(value);
    chartLegend.appendChild(row);
  });

  pieChart.style.background = 'conic-gradient(' + parts.join(', ') + ')';
}

function updateMonthlySummary() {
  const month = summaryMonth.value || currentMonth();
  const list = transactions.filter(function(item) {
    return getMonthKey(item.date) === month;
  });

  let total = 0;
  list.forEach(function(item) {
    total += Number(item.amount);
  });

  summaryTotal.textContent = formatMoney(total);
  summaryCount.textContent = list.length;
  summaryAverage.textContent = formatMoney(list.length ? total / list.length : 0);
}

function showCategoryList() {
  categoryList.innerHTML = '';

  categories.forEach(function(category) {
    const row = document.createElement('div');
    row.className = 'category-item';

    const name = document.createElement('span');
    name.textContent = category;
    row.appendChild(name);

    if (!defaultCategories.includes(category)) {
      const removeButton = document.createElement('button');
      removeButton.className = 'delete-button';
      removeButton.type = 'button';
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', function() {
        categories = categories.filter(function(item) {
          return item !== category;
        });
        saveData();
        showCategories();
        showCategoryList();
      });
      row.appendChild(removeButton);
    } else {
      const defaultText = document.createElement('span');
      defaultText.className = 'transaction-info';
      defaultText.textContent = 'Default';
      row.appendChild(defaultText);
    }

    categoryList.appendChild(row);
  });
}

function updatePage() {
  showCategories();
  showMonthOptions();
  updateTotals();
  showTransactions();
  drawChart();
  updateMonthlySummary();
  showCategoryList();
}

function setTheme() {
  document.body.classList.toggle('dark', darkMode);
  themeButton.textContent = darkMode ? 'Light Mode' : 'Dark Mode';
}

form.addEventListener('submit', addTransaction);
monthFilter.addEventListener('change', showTransactions);
summaryMonth.addEventListener('change', updateMonthlySummary);

themeButton.addEventListener('click', function() {
  darkMode = !darkMode;
  localStorage.setItem('darkMode', darkMode);
  setTheme();
});

categoryButton.addEventListener('click', function() {
  showCategoryList();
  categoryDialog.showModal();
});

closeCategory.addEventListener('click', function() {
  categoryDialog.close();
});

categoryForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const value = newCategory.value.trim();
  if (value === '') return;

  const alreadyExists = categories.some(function(category) {
    return category.toLowerCase() === value.toLowerCase();
  });

  if (alreadyExists) {
    newCategory.setCustomValidity('Category already exists.');
    newCategory.reportValidity();
    return;
  }

  newCategory.setCustomValidity('');
  categories.push(value);
  saveData();
  newCategory.value = '';
  showCategories();
  showCategoryList();
});

newCategory.addEventListener('input', function() {
  newCategory.setCustomValidity('');
});

setTheme();
updatePage();
