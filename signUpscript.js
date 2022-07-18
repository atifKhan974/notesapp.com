let form = document.getElementById('form')
let formControl = document.getElementById('form-control')
let username = document.getElementById('username')
let email = document.getElementById('email')
let password = document.getElementById('password')
let confirmPassword = document.getElementById('confirmPassword')

window.onload = function () {
    let container = document.getElementById('container');
    container.style.top = "0px";
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    // get Values from the inputs
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    let usernameSuccess;
    let emailSuccess;
    let passwordSuccess;
    let confirmPasswordSuccess;
    if (usernameValue === '') {
        //show error message
        //add error class
        setErrorFor(username, 'Username can not be empty!');
    }
    else {
        // add success class
        setSuccessFor(username);
        usernameSuccess = true;
    }

    // email 
    if (emailValue === '') {
        setErrorFor(email, 'Email can not be empty!');
    }
    else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Email is not valid!');
    }
    else {
        setSuccessFor(email);
        emailSuccess = true;
    }

    //password
    if (passwordValue === '') {
        setErrorFor(password, 'Password can not be empty!');
    }
    else if (passwordValue.length < 8) {
        setErrorFor(password, 'Password should be have atleast 8 characters');
    }
    else {
        setSuccessFor(password);
        passwordSuccess = true;
    }

    // confirm password
    if (confirmPasswordValue === '') {
        setErrorFor(confirmPassword, 'Password can not be empty!');
    }
    else if (passwordValue !== confirmPasswordValue) {
        setErrorFor(confirmPassword, 'Passwords does not matched!');
    }
    else {
        setSuccessFor(confirmPassword);
        confirmPasswordSuccess = true;
    }


    if (usernameSuccess && emailSuccess && passwordSuccess && confirmPasswordSuccess) {
        setTimeout(() => {

            let successMsg = document.getElementById('successMsg');
            successMsg.style.display = 'block';
            successMsg.style.top = "0";

            let container = document.getElementById('container');
            container.style.display = 'none';
        }, 1500);

        let accObj = {
            email: emailValue,
            password: passwordValue
        }

        // console.log(accObj);

        let accData = [];
        let lcData = localStorage.getItem("accData");

        if (lcData == null) {
            accData = [];
        }
        else {
            accData = JSON.parse(lcData);
        }
        accData.push(accObj);
        localStorage.setItem("accData", JSON.stringify(accData));
    }


}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    // add error message inside small 
    small.innerText = message;

    // add error class in formControl 
    formControl.className = 'form-control error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    formControl.className = 'form-control success';
}

function isEmail(email) {
    // return true;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
        return true;
    }
}

let okBtn = document.getElementById('okBtn');
okBtn.addEventListener("click", () => {
    let link = okBtn.parentElement;
    link.setAttribute("href", "index.html");
});