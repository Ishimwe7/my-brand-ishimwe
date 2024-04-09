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

const loadListObject = async () => {
    // const storedUsers = localStorage.getItem("usersList");
    // if (typeof storedUsers !== "string") return;
    // const parsedUsers = JSON.parse(storedUsers);
    // parsedUsers.forEach((user) => {
    //     const newUser = registerUser(user._id, user._names, user._email);
    //     allUsers.addUser(newUser);
    // });
    await fetch('https://my-brand-nyanja-cyane.onrender.com/users/allUsers/', {
        method: 'GET',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify({ email, password })
    }).then(response => {

        if (response.status == 500 || response.status == 400 || response.status == 404) {
            const p = document.createElement("p");
            p.innerHTML = "No registerd users at the moment! "
            p.className = "error";
            document.getElementById('responses').appendChild(p);
        }
        if (response.ok) {
            response.json().then(data => {
                const allUsers = data;
                console.log(allUsers);
                document.getElementById("total-users").textContent = allUsers.length;
                renderList(allUsers);
                // allMessages.forEach((message) => {
                //     // const newMessage = addMessage(message._id, message._sender, message._email, message._subject, message._message, message._date);
                //     // allMessages.addMessage(newMessage);
                // });
            })
            // sessionStorage.setItem('adminToken')
            // window.location.href = '/UI/pages/userLogin.html'; // Redirect to login page after successful registration
            //window.location.href = 'UI/pages/adminDashboard.html'; // Redirect to login page after successful registration
        } else {
            const p = document.createElement("p");
            p.innerHTML = "An expected error occurred ! "
            p.className = "error";
            document.getElementById('responses').appendChild(p);
            throw new Error('Users fetching failed');
        }
    })
        .catch(error => {
            console.error('Fetching users error:', error);
            // alert('Registration failed');
        });
    renderList(allUsers);
};

// const buildUser = (user) => {

// }



const renderList = (users) => {
    //const users = myUsersList.getAllUSersList();
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
    let id = 1;
    users.forEach((user) => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.textContent = id;
        const td2 = document.createElement("td");
        td2.textContent = user.names;
        const td3 = document.createElement("td");
        td3.textContent = user.email;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tableBody.appendChild(tr);
        id++;
        // buildArticle(user);
    });
    usersTable.appendChild(tableBody);
    usersDiv.appendChild(usersTable);
}


window.onload = loadListObject();