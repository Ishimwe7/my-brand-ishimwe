document.getElementById("admin-logout").onclick = () => {
    sessionStorage.removeItem("sessionToken");
    window.location = '../pages/adminLogin.html';
}