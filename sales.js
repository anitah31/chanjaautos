// Main sales and credit logic for Chanja Autos

document.addEventListener('DOMContentLoaded', function() {
  const salesForm = document.getElementById('salesForm');
  const salesTableBody = document.getElementById('salesTableBody');
  const totalSalesElement = document.getElementById('totalSales');
  const stockBalanceInput = document.getElementById('stock-balance-input');
  const stockBalanceDisplay = document.getElementById('stockBalanceDisplay');
  const updateStockBalanceBtn = document.getElementById('updateStockBalance');

  const creditForm = document.getElementById('creditForm');
  const creditTableBody = document.getElementById('creditTableBody');
  const overdueNotification = document.getElementById('overdueNotification');
  const toggleOverdueViewBtn = document.getElementById('toggleOverdueView');

  let totalSales = 0;
  let showingOnlyOverdue = false;

  // Daily sales form handler
  salesForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const saleDate = document.getElementById('sale-date').value;
    const clientName = document.getElementById('client-name').value;
    const saleAmount = parseFloat(document.getElementById('sale-amount').value);
    const itemsSold = document.getElementById('items-sold').value;

    totalSales += saleAmount;
    totalSalesElement.textContent = totalSales.toFixed(2);

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>KSH${saleDate}</td>
      <td>KSH${clientName}</td>
      <td>KSH${saleAmount.toFixed(2)}</td>
      <td>KSH${itemsSold}</td>
    `;

    salesTableBody.appendChild(newRow);
    salesForm.reset();
  });

  // Stock balance handler
  updateStockBalanceBtn.addEventListener('click', function() {
    const currentBalance = parseInt(stockBalanceInput.value, 10);
    if (!isNaN(currentBalance)) {
      stockBalanceDisplay.textContent = currentBalance;
    } else {
      alert('Please enter a valid number for stock balance.');
    }
  });

  // Credit sales form handler
  creditForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const client = document.getElementById('credit-client').value;
    const amount = parseFloat(document.getElementById('credit-amount').value);
    const dueDate = document.getElementById('due-date').value;
    const initialPayment = parseFloat(document.getElementById('initial-payment').value || 0);
    let balance = amount - initialPayment;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>{client}</td>
      <td>KSH${amount.toFixed(2)}</td>
      <td class="paid">KSH${initialPayment.toFixed(2)}</td>
      <td class="balance">KSH${balance.toFixed(2)}</td>
      <td>${dueDate}</td>
      <td><button class="record-payment-btn">Record Payment</button></td>
    `;

    // Handle payment update
    row.querySelector('.record-payment-btn').addEventListener('click', () => {
      const payment = parseFloat(prompt(`Enter payment amount from ${client}:`));
      if (!isNaN(payment) && payment > 0) {
        const paidCell = row.querySelector('.paid');
        const balanceCell = row.querySelector('.balance');

        let paidAmount = parseFloat(paidCell.textContent.replace('KSH', ''));
        let currentBalance = parseFloat(balanceCell.textContent.replace('KSH', ''));

        paidAmount += payment;
        currentBalance = Math.max(0, currentBalance - payment);

        paidCell.textContent = `KSH${paidAmount.toFixed(2)}`;
        balanceCell.textContent = `KSH${currentBalance.toFixed(2)}`;

        checkOverdueCredits();
      } else {
        alert("Please enter a valid positive number.");
      }
    });

    creditTableBody.appendChild(row);
    creditForm.reset();
    checkOverdueCredits();
  });

  // Overdue credit highlighting
  function checkOverdueCredits() {
    const rows = creditTableBody.querySelectorAll('tr');
    const today = new Date();
    let hasOverdue = false;

    rows.forEach(row => {
      const dueDateText = row.cells[4].textContent;
      const balanceText = row.querySelector('.balance').textContent.replace('KSH', '');
      const balance = parseFloat(balanceText);
      const dueDate = new Date(dueDateText);

      if (balance > 0 && dueDate < today) {
        row.style.backgroundColor = '#ffcccc';
        row.classList.add('overdue');
        hasOverdue = true;
      } else {
        row.style.backgroundColor = '';
        row.classList.remove('overdue');
      }
    });

    overdueNotification.style.display = hasOverdue ? 'block' : 'none';
  }

  // Toggle overdue filter
  toggleOverdueViewBtn.addEventListener('click', function () {
    const rows = creditTableBody.querySelectorAll('tr');
    if (showingOnlyOverdue) {
      rows.forEach(row => row.style.display = '');
      this.textContent = 'Show Only Overdue';
      showingOnlyOverdue = false;
    } else {
      rows.forEach(row => {
        if (row.classList.contains('overdue')) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
      this.textContent = 'Show All Records';
      showingOnlyOverdue = true;
    }
  });
});
