function authenticateUser() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Check if the stored password matches the entered password
    // if (localStorage.getItem(email) === password) {
    if (localStorage.getItem(email) === password) {
        // Store a session token (for simplicity, using the username)
        localStorage.setItem('sessionToken', email);

        // Redirect to the dashboard or perform other actions
        window.location.href = 'adminDashboard.html';
    } else {
        // alert('Invalid username or password');
        var invalid = document.getElementById("invalidLogin");
        invalid.textContent = "Invalid Credentials !!"
        invalid.style.display = "block"
    }
}