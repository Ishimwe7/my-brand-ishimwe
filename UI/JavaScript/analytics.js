const users = document.getElementById("total-users");
const messages = document.getElementById("total-messages");
const blogs = document.getElementById("total-blogs");
const profilepic = document.getElementById("prof-pic");

const showAnalytics = () => {
    const storedArticles = localStorage.getItem("myArticlesList");
    const parsedArticles = JSON.parse(storedArticles);
    const storedUsers = localStorage.getItem("usersList");
    const parsedUsers = JSON.parse(storedUsers);
    const storedMessages = localStorage.getItem("messages");
    const parsedMessages = JSON.parse(storedMessages);
    blogs.textContent = parsedArticles.length;
    users.textContent = parsedUsers.length;
    messages.textContent = parsedMessages.length

    const profile = localStorage.getItem("profile");
    const parsedProfile = JSON.parse(profile);

    profilepic.src = parsedProfile._picture;
}

window.onload = showAnalytics();