
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
            response.json().then(data => {
                sessionStorage.setItem("adminToken", JSON.stringify(data));
                // console.log(data);
                window.location.href = '../pages/adminDashboard.html';
            });
        } else {
            const p = document.createElement("p");
            p.className = "error";
            document.getElementById('responses').style.margin = 0;
            document.getElementById('responses').style.display = "block";
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