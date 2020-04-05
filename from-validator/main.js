const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('confirm-password');

function showError(input, message) {
  const controlForm = input.parentElement;
  controlForm.classList.remove('success');
  controlForm.classList.add('error');
  const small = controlForm.querySelector('small');
  small.innerHTML = message;
}

function showSuccess(input) {
  const controlForm = input.parentElement;
  controlForm.classList.remove('error');
  controlForm.classList.add('success');
}

function checkRequired(arrInput) {
  arrInput.forEach((input) => {
    // Get the label element text
    const labelText = input.previousElementSibling.innerHTML;

    if (input.value === '') {
      showError(input, `${labelText} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //re.test return true or false value
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `Email is not valid`);
  }
}

// Check Length is valid
function checkLength(input, min, max) {
  const labelText = input.previousElementSibling.innerHTML;

  if (input.value.length < min) {
    showError(input, `${labelText} must be at least ${min} characters `);
  } else if (input.value.length > max) {
    showError(input, `${labelText} must be at less than ${max} characters `);
  } else {
    showSuccess(input);
  }
}

// Check password match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Password do not match');
  }
}

function handleSubmit(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 16);
  checkLength(password, 8, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
}

// Handlers event
form.addEventListener('submit', handleSubmit);
