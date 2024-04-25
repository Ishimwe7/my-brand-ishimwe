document.getElementById("admin-logout").onclick = () => {
    sessionStorage.removeItem("adminToken");
    window.location = '../pages/adminLogin.html';
}