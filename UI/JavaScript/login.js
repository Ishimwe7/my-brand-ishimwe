
window.addEventListener("load", (event) => {
    // if (event.target.readyState === "complete") {
    initApp();
    // }
});

const initApp = () => {
    //Add listeners
    const adminLoginForm = document.getElementById("login-form");
    adminLoginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        authenticateUser();
    })
}

function authenticateUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === "ishimweinstein@gmail.com" && password === "Admin") {
        sessionStorage.setItem('sessionToken', email);
        window.location = "../pages/adminDashboard.html";
    } else {
        const invalid = document.getElementById("invalidLogin");
        invalid.textContent = "Invalid Credentials !!"
        invalid.style.display = "block"
    }
}