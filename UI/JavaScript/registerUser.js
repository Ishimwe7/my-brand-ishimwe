import User from "./User.js";
import AllUsers from "./allUsers.js";

const user = new User();
const allUsers = new AllUsers();


const names = document.getElementById("names");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm-password");

const req_email = document.getElementById("req-email");
const req_names = document.getElementById("req-names");
const req_pass = document.getElementById("req-pass");


function validateName(name) {
    // Check if the name is not empty and contains only letters and spaces
    return /^[A-Za-z ]+$/.test(name.trim);
}

function validateEmail(email) {
    // Check if the email matches a basic email pattern
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim);
}

function validatePassword(password) {
    // Check if the password has at least 8 characters and contains at least one uppercase letter, one lowercase letter, and one digit
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password.trim);
}


const validateInputs = () => {
    let flag = true;
    if (!validateName(names)) {
        req_names.textContent = "Please enter valid names";
        req_names.style.display = "block";
        flag = false;
    }
    // if (!validateEmail(email)) {
    //     req_email.textContent = "Please enter valid email ";
    //     req_email.style.display = "block";
    //     flag = false;
    // }
    // if (!validatePassword(password)) {
    //     req_pass.textContent = "Please enter strong password "
    //     req_pass.style.display = "block";
    //     flag = false;
    // }
    return flag;
}


const registerUser = (id, names, email, password) => {

    const newUser = new User();
    newUser.setId(id);
    newUser.setNames(names);
    newUser.setEmail(email);
    newUser.setPassword(password);
    return newUser;
}


document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    //Add listeners
    const registrationForm = document.getElementById("register-form");
    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (validateInputs()) {
            processSubmission()
        }
    })
    //procedural
    loadListObject();
    // refreshThePage();
}

const clearForm = () => {
    const names = document.getElementById("names");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirm_password = document.getElementById("confirm-password");
    names.value = '';
    email.value = '';
    password.value = '';
    confirm_password.value = '';
}

const processSubmission = async () => {
    document.getElementById('responses').innerHTML = '';
    const names = document.getElementById("names").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm-password").value;
    if (password === confirm_password) {
        // const user = registerUser(getLastUserId(), names, email, password);
        // allUsers.addUser(user);
        // updatePersistentData(allUsers.getAllUSersList());
        // alert("Registration Successfully Done !!");
        //   clearForm();
        const isAdmin = false;
        await fetch('http://localhost:8000/users/newUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ names, email, password, isAdmin })
        }).then(response => {
            // if (response) {
            //     const res = document.createElement("p");
            //     res.innerHTML = response.body;
            //     document.getElementById('responses').appendChild(res);
            // }
            if (response.status == 400) {
                const p = document.createElement("p");
                p.innerHTML = "All fields are required !"
                p.className = "error";
                document.getElementById('responses').appendChild(p);
            }
            if (response.status == 409) {
                const p = document.createElement("p");
                p.innerHTML = "Email already registered !";
                p.className = "error";
                document.getElementById('responses').appendChild(p);
            }
            if (response.status == 500) {
                const p = document.createElement("p");
                p.innerHTML = "Invalid email or weak password !"
                p.className = "error";
                document.getElementById('responses').appendChild(p);
            }
            if (response.ok) {
                // alert('Registration successful');
                const p = document.createElement("p");
                p.innerHTML = "Registration successful Done !"
                p.className = "success";
                document.getElementById('responses').appendChild(p);
                // window.location.href = '/UI/pages/userLogin.html'; // Redirect to login page after successful registration
            } else {
                throw new Error('Registration failed');
            }
        })
            .catch(error => {
                console.error('Registration error:', error);
                // alert('Registration failed');
            });
        //location.reload();
    }
    else {
        document.getElementById("password-mismatches").textContent = "Password Mismatches !";
        document.getElementById("password-mismatches").style.display = "block";
        return;
    }
}


const loadListObject = () => {
    const storedUsers = localStorage.getItem("usersList");
    if (typeof storedUsers !== "string") return;
    const parsedUsers = JSON.parse(storedUsers);
    parsedUsers.forEach((user) => {
        const newUser = registerUser(user._id, user._names, user._email, user._password);
        allUsers.addUser(newUser);
    });
    //renderList(myArticlesList);
}

const getLastUserId = () => {
    let nextUserId = 1;
    const list = allUsers.getAllUSersList();
    if (list.length > 0) {
        nextUserId = list[list.length - 1].getId() + 1;
    }
    return nextUserId;
}
const updatePersistentData = (usersArray) => {
    // console.log(usersArray)
    localStorage.setItem("usersList", JSON.stringify(usersArray));
};