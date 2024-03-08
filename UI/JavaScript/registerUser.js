import User from "./User.js";
import AllUsers from "./allUsers.js";

const user = new User();
const allUsers = new AllUsers();


const registerUser = (names, email, password) => {

    user.setNames(names);
    user.setEmail(email);
    user.setPassword(password);
    return user;
}



const initApp = () => {
    //Add listeners
    const registrationForm = document.getElementById("register-form");
    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        processSubmission()
        alert("Registration Successfully Done !!");
        clearForm();
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

const processSubmission = () => {
    const names = document.getElementById("names").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password");
    const confirm_password = document.getElementById("confirm-password");
    if (password === confirm_password) {
        const user = registerUser(names, email, password);
        allUsers.addUser(user);
        updatePersistentData(allUsers.getAllUSersList());
    }
    else {
        document.getElementById("password-mismatches").textContent = "Password Mismatches !";
        return;
    }
}


const loadListObject = () => {
    const storedUsers = localStorage.getItem("usersList");
    if (typeof storedUsers !== "string") return;
    const parsedUsers = JSON.parse(storedUsers);
    parsedUsers.forEach((user) => {
        const newUser = registerUser(user._names, user._email, user._password);
        allUsers.addUser(newUser);
    });
    //renderList(myArticlesList);
}