//CALING-LOGIN-4
const tabBtns = document.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('.form');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    forms.forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    const tabName = btn.getAttribute('data-tab');
    document.getElementById(tabName + 'Form').classList.add('active');
    document.querySelectorAll('.form-message').forEach(msg => {
      msg.className = 'form-message';
    });
  });
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const messageEl = document.getElementById('loginMessage');

  if (!email || !password) {
    showMessage(messageEl, 'Please fill in all fields', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showMessage(messageEl, 'Please enter a valid email', 'error');
    return;
  }

  showMessage(messageEl, 'Welcome to Commitly!', 'success');
  this.reset();
  setTimeout(() => {
    hideMessage(messageEl);
  }, 3000);
});

//DUNGAO-REGISTER-5
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirm').value;
  const agreeTerms = document.getElementById('agreeTerms').checked;
  const messageEl = document.getElementById('registerMessage');

  if (!name || !email || !password || !confirmPassword) {
    showMessage(messageEl, 'Please fill in all fields', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showMessage(messageEl, 'Please enter a valid email', 'error');
    return;
  }

  if (password.length < 6) {
    showMessage(messageEl, 'Password must be at least 6 characters', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showMessage(messageEl, 'Passwords do not match', 'error');
    return;
  }

  if (!agreeTerms) {
    showMessage(messageEl, 'You must agree to our terms', 'error');
    return;
  }

  showMessage(messageEl, 'Account created! Welcome, ' + name + '!', 'success');
  this.reset();
  setTimeout(() => {
    hideMessage(messageEl);
  }, 3000);
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showMessage(element, message, type) {
  element.textContent = message;
  element.className = 'form-message ' + type;
}

function hideMessage(element) {
  element.className = 'form-message';
}
