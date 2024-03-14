function authenticateUser() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email === "ishimweinstein@gmail.com" && password === "Admin") {
        sessionStorage.setItem('sessionToken', email);
        window.location.href = 'adminDashboard.html';
    } else {
        // alert('Invalid username or password');
        var invalid = document.getElementById("invalidLogin");
        invalid.textContent = "Invalid Credentials !!"
        invalid.style.display = "block"
    }
}