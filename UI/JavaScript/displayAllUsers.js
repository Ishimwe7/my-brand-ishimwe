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

const loadListObject = () => {
    const storedUsers = localStorage.getItem("usersList");
    if (typeof storedUsers !== "string") return;
    const parsedUsers = JSON.parse(storedUsers);
    parsedUsers.forEach((user) => {
        const newUser = registerUser(user._id, user._names, user._email);
        allUsers.addUser(newUser);
    });
    renderList(allUsers);
};

// const buildUser = (user) => {

// }



const renderList = (myUsersList) => {
    const users = myUsersList.getAllUSersList();
    const usersDiv = document.getElementById("users");
    const usersTable = document.createElement("table");
    const tableHeader = document.createElement("thead");
    const tableBody = document.createElement("tbody");
    const tHeadRow = document.createElement("tr");
    const tableHeader1 = document.createElement("td");
    const tableHeader2 = document.createElement("td");
    const tableHeader3 = document.createElement("td");
    tableHeader1.textContent = "S/N";
    tableHeader2.textContent = "Names";
    tableHeader3.textContent = "Email";
    tHeadRow.appendChild(tableHeader1);
    tHeadRow.appendChild(tableHeader2);
    tHeadRow.appendChild(tableHeader3);
    tableHeader.appendChild(tHeadRow);
    usersTable.appendChild(tableHeader);
    users.forEach((user) => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.textContent = user.getId();
        const td2 = document.createElement("td");
        td2.textContent = user.getNames();
        const td3 = document.createElement("td");
        td3.textContent = user.getEmail();
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tableBody.appendChild(tr);

        // buildArticle(user);
    });
    usersTable.appendChild(tableBody);
    usersDiv.appendChild(usersTable);
}


window.onload = loadListObject();