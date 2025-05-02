// Simple login validation (for demo purposes only)
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Replace with secure authentication in production
    if (username === 'admin' && password === 'password') {
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid credentials. Please try again.');
    }
  });
  
  // Simple sign-up handler (for demo purposes only)
  document.getElementById('signupForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    // Normally, you would send these details to a server and save them securely
    alert('Account created! Please log in.');
    window.location.href = 'index.html';
  });
  
  // Additional JavaScript functions can be added here to handle stock management,
  // generating daily sales reports, calculating total sales/stock value, and populating tables.
  