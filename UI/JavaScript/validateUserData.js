const names = document.getElementById("names");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm-password");

const req_email = document.getElementById("req-email");
const req_names = document.getElementById("req-names");
const req_pass = document.getElementById("req-pass");

const registrationForm = document.getElementById("register-form");
registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    validateInputs()
})


function validateName(name) {
    // Check if the name is not empty and contains only letters and spaces
    return /^[A-Za-z ]+$/.test(name.trim);
}

function validateEmail(email) {
    // Check if the email matches a basic email pattern
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    // Check if the password has at least 8 characters and contains at least one uppercase letter, one lowercase letter, and one digit
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}


const validateInputs = () => {
    let flag = true;
    if (!validateName(names)) {
        req_names.textContent = "Please enter valid names";
        req_names.style.display = "block";
        flag = false;
    }
    if (!validateEmail(email)) {
        req_email.textContent = "Please enter valid email ";
        req_email.style.display = "block";
        flag = false;
    }
    if (!validatePassword(password)) {
        req_pass.textContent = "Please enter strong password "
        req_pass.style.display = "block";
        flag = false;
    }
    return flag;
}