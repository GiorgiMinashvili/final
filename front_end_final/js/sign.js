document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll('.toggle-password');

  toggles.forEach(toggle => {
    const inputId = toggle.dataset.target;
    const input = document.getElementById(inputId);

    if (input) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();

        if (input.type === 'password') {
          input.type = 'text';
          toggle.classList.remove('bx-eye');
          toggle.classList.add('bx-eye-slash');
        } else {
          input.type = 'password';
          toggle.classList.remove('bx-eye-slash');
          toggle.classList.add('bx-eye');
        }

        input.focus();
      });
    }
  });
});


function showError(input, message) {
  let error = input.parentNode.querySelector('.error-msg');
  if (!error) {
    error = document.createElement('p');
    error.className = 'error-msg';
    input.parentNode.appendChild(error);
  }
  error.textContent = message;
}

function clearError(input) {
  let error = input.parentNode.querySelector('.error-msg');
  if (error) {
    error.textContent = '';
  }
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+995)?\d{9}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

function validateForm() {
  const form = document.getElementById('signupForm');
  const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');

  let valid = true;

  inputs.forEach(input => {
    clearError(input);
    if (!input.value.trim()) {
      showError(input, `${input.placeholder} is required`);
      valid = false;
    }
  });

  const email = form.querySelector('input[type="email"]');
  if (email.value && !emailRegex.test(email.value)) {
    showError(email, 'Invalid email format');
    valid = false;
  }

  const phone = form.querySelector('input[type="text"][placeholder*="phone"]');
  if (phone.value && !phoneRegex.test(phone.value)) {
    showError(phone, 'Invalid phone number');
    valid = false;
  }

  const password = document.getElementById('password');
  if (password.value && !passwordRegex.test(password.value)) {
    showError(password, 'Password must have uppercase, lowercase, number and min 6 chars');
    valid = false;
  }

  const confirmPassword = document.getElementById('confirmPassword');
  if (confirmPassword.value && confirmPassword.value !== password.value) {
    showError(confirmPassword, 'Passwords do not match');
    valid = false;
  }

  return valid;
}

document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  if (validateForm()) {
    this.submit();
  }
});
