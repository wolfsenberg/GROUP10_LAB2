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