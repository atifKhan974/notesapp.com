let form = document.getElementById('form')
let formControl = document.getElementById('form-control')
let email = document.getElementById('email')
let password = document.getElementById('password')
let signUpLink = document.getElementById('signUpLink')

window.onload = function () {
    let container = document.getElementById('container');
    container.style.top = "0px";
}

signUpLink.addEventListener("click", (e) => {
    let eraseAcc = confirm("Once you click the sign up link, your previous account will be deleted")
    if (eraseAcc) {
        localStorage.clear();
        // console.log(localStorage);
        // console.log(eraseAcc)
    }
    else {
        signUpLink.setAttribute("href", "loginform.html");
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    // get Values from the inputs
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();

    let emailSuccess;
    let passwordSuccess;

    let accData = [];
    let lcData = localStorage.getItem("accData");

    if (lcData == null) {
        accData = [];
        alert("Sorry! You do not have any account. Make sure you create account first")
    }
    else {
        accData = JSON.parse(lcData);
    }
    // console.log(accData[0].email)
    // email 
    if (emailValue === '') {
        setErrorFor(email, 'Email can not be empty!');
    }
    else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Email is not valid!');
    }
    else {
        if (emailValue == accData[0].email) {
            setSuccessFor(email);
            emailSuccess = true;
        }
        else {
            setErrorFor(email, 'Invalid Email');
        }
    }
    //password

    if (passwordValue === '') {
        setErrorFor(password, 'Password can not be empty!');
    }
    else if (passwordValue.length < 8) {
        setErrorFor(password, 'Password should be have atleast 8 characters');
    }
    else {
        if (passwordValue == accData[0].password) {
            setSuccessFor(password);
            passwordSuccess = true;
        }
        else {
            setErrorFor(password, 'Invalid Password');
        }
    }


    if (emailSuccess && passwordSuccess) {
        let successMsg = document.getElementById('successMsg');
        successMsg.style.display = 'block';
        successMsg.style.top = "0";

        let container = document.getElementById('container');
        container.style.display = 'none';

        emailValue = "";
        passwordValue = "";
    }


}

let okBtn = document.getElementById('okBtn');
okBtn.addEventListener("click", () => {
    password.value = "";
    email.value = "";
    let link = okBtn.parentElement;
    link.setAttribute("href", "notes.html");
});

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