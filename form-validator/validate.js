const form = document.querySelector('.register-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('password-confirm');

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
}

function emailValidation(value) {
    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return emailFormat.test(String(value).toLowerCase());
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkInput(inputArray) {
    inputArray.forEach(function(input) {
        if(input.value.trim() === '') {
                showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });

    if(email.value!=='' && !emailValidation(email.value)) {
        showError(email, 'Email is not valid')
    }
}

function checkLength(input, min, max) {
    if(input.value==='') return;

    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }
}

function checkPassword(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

function validation() {
    checkInput([username, email, password, confirmPassword]);
    checkLength(username, 6, 15);
    checkLength(password, 8, 100);
    checkPassword(password, confirmPassword);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    validation();
});