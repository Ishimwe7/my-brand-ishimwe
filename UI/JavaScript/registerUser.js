import User from "./User.js";
import AllUsers from "./allUsers.js";

const user = new User();
const allUsers = new AllUsers();


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
        processSubmission()
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
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm-password").value;
    if (password === confirm_password) {
        const user = registerUser(getLastUserId(), names, email, password);
        allUsers.addUser(user);
        updatePersistentData(allUsers.getAllUSersList());
        alert("Registration Successfully Done !!");
        //   clearForm();
        location.reload();
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
    localStorage.setItem("usersList", JSON.stringify(usersArray));
};