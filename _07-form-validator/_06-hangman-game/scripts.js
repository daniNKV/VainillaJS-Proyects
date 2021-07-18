const DOM = {
    form: document.getElementById('form'),
    username: document.getElementById('username'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    password2: document.getElementById('password2'),
}
// ######   Show error message    ######
function showError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    
    formControl.className = 'form-control error';
    small.innerText = message;
}
function showSuccess(input) {
   const formControl = input.parentElement;
   formControl.className = 'form-control success'
}

function checkEmail (input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(input.value.trim())) {
        showSuccess(input);
    }else {
        showError(input, 'Email is not valid')
    }
}
// ######   Check require fields    ######
function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input);
        }
    });
}

// ######   Check length    ######
function checkLength (input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    }else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    }else {
        showSuccess(input)
    }
}
// ######   Check passwords match    ######
function checkPasswordsMatch (input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match')
    }

}


function getFieldName (input) {
    if (input.id == 'password2') {
        return input = 'Confirm password'
    }
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);

}
// ######   Event Listeners    ######
DOM.form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2)
});

