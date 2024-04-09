import User from "./User.js";
import AllUsers from "./allUsers.js";

const user = new User();
const allUsers = new AllUsers();

// const logUser = (email, password) => {

//     const newUser = new User();
//     newUser.setEmail(email);
//     newUser.setPassword(password);
//     return newUser;
// }


window.addEventListener("load", (event) => {
    // if (event.target.readyState === "complete") {
    initApp();
    // }
});

const initApp = () => {
    //Add listeners
    const registrationForm = document.getElementById("login-form");
    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        processSubmission();
    })
}


const processSubmission = async () => {
    document.getElementById('responses').innerHTML = '';
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await fetch('https://my-brand-nyanja-cyane.onrender.com/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then(response => {
        // if (response) {
        //     const res = document.createElement("p");
        //     res.innerHTML = response.body;
        //     document.getElementById('responses').appendChild(res);
        // }
        if (response.status == 400 || response.status == 404) {
            const p = document.createElement("p");
            p.innerHTML = "Invalid Login ! "
            p.className = "error";
            document.getElementById('responses').appendChild(p);
        }
        if (response.ok) {
            window.location.href = '../../index.html'; // Redirect to login page after successful registration
        } else {
            throw new Error('Login failed');
        }
    })
        .catch(error => {
            console.error('Login error:', error);
            // alert('Registration failed');
        });
    // const userFound = loadListObject(email, password);
    // if (userFound != null) {
    //     sessionStorage.setItem("loggeInUser", JSON.stringify(userFound));
    //     window.location = "../../index.html";
    // }
    // else {
    //     const invalidLogin = document.getElementById("invalidLogin");
    //     invalidLogin.textContent = "Invalid Login Credentials";
    //     invalidLogin.style.display = "block";
    //     console.log(userFound);
    // }
}


const loadListObject = (email, password) => {
    const storedUsers = localStorage.getItem("usersList");
    if (typeof storedUsers !== "string") return;
    const parsedUsers = JSON.parse(storedUsers);
    // console.log(parsedUsers)
    let foundUser = null;
    parsedUsers.forEach((user) => {
        if (user._email === email && user._password === password) {
            foundUser = user;
        }
    });
    return foundUser;
    //renderList(myArticlesList);
}