
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

async function authenticateUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    await fetch('https://my-brand-nyanja-cyane.onrender.com/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then(response => {

        if (response.status == 400 || response.status == 404) {
            const p = document.createElement("p");
            p.innerHTML = "Invalid Login ! "
            p.className = "error";
            document.getElementById('responses').appendChild(p);
        }
        if (response.ok) {
            // sessionStorage.setItem('adminToken')
            // window.location.href = '/UI/pages/userLogin.html'; // Redirect to login page after successful registration
            window.location.href = 'UI/pages/adminDashboard.html'; // Redirect to login page after successful registration
        } else {
            const p = document.createElement("p");
            p.innerHTML = "An expected error occurred ! "
            p.className = "error";
            document.getElementById('responses').appendChild(p);
            throw new Error('Login failed');
        }
    })
        .catch(error => {
            console.error('Registration error:', error);
            // alert('Registration failed');
        });

    //     if (email === "ishimweinstein@gmail.com" && password === "Admin") {
    //         sessionStorage.setItem('sessionToken', email);
    //         window.location = "../pages/adminDashboard.html";
    //     } else {
    //         const invalid = document.getElementById("invalidLogin");
    //         invalid.textContent = "Invalid Credentials !!"
    //         invalid.style.display = "block"
    //     }
}