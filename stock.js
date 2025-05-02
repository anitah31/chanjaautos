document.getElementById('stockForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Retrieve input values
    const name = document.getElementById('item-name').value;
    const price = parseFloat(document.getElementById('item-price').value);
    const quantity = parseInt(document.getElementById('item-quantity').value, 10);
    
    // Calculate total value for the item
    const totalValue = price * quantity;
    
    // Create a new table row
    const tableBody = document.getElementById('stockTableBody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${name}</td>
      <td>KSH${price.toFixed(2)}</td>
      <td>${quantity}</td>
      <td>KSH${totalValue.toFixed(2)}</td>
    `;
    
    tableBody.appendChild(row);
    
    // Reset the form fields after submission
    document.getElementById('stockForm').reset();
  });
  