import Message from "./message.js";
import AllMessageses from "./allMessages.js";

const message = new Message();
const allMessages = new AllMessageses();


const addMessage = (id, names, email, subject, message, date) => {

    const newMessage = new Message();
    newMessage.setId(id);
    newMessage.setSender(names);
    newMessage.setEmail(email);
    newMessage.setSubject(subject);
    newMessage.setMessage(message);
    newMessage.setDate(date);
    return newMessage;
}

const loadListObject = async () => {
    // const storedMessages = localStorage.getItem("messages");
    // if (typeof storedMessages !== "string") return;
    // const parsedMessages = JSON.parse(storedMessages);

    await fetch('https://my-brand-nyanja-cyane.onrender.com/messages/allMessages/', {
        method: 'GET',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify({ email, password })
    }).then(response => {

        if (response.status == 500 || response.status == 400 || response.status == 404) {
            const p = document.createElement("p");
            p.innerHTML = "No messages at the moment! "
            p.className = "error";
            document.getElementById('responses').appendChild(p);
        }
        if (response.ok) {
            response.json().then(data => {
                const allMessages = data;
                console.log(allMessages);
                renderList(allMessages);
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
            throw new Error('Login failed');
        }
    })
        .catch(error => {
            console.error('Fetching messages error:', error);
            // alert('Registration failed');
        });
};



const renderList = (messages) => {
    // const messages = messagesList.getMessagesList();
    const messagesDiv = document.getElementById("messages");
    const queries = document.getElementById("queries");
    const messageCount = document.getElementById("message-count");
    messageCount.textContent = messages.length;
    const totalmess = document.getElementById("total-messages");
    totalmess.textContent = messages.length;

    messages.forEach((message) => {
        const messageDiv = document.createElement("div");
        messageDiv.className = "query";
        const p = document.createElement("p");
        const span1 = document.createElement("span");
        span1.className = "names";
        span1.textContent = message.sender;
        span1.id = message._Id;
        const span2 = document.createElement("span");
        span2.className = "email";
        span2.textContent = message.email;
        p.className = "user";
        p.appendChild(span1);
        p.appendChild(span2);
        const messagePara = document.createElement("p");
        messagePara.className = "message";
        messagePara.textContent = message.content;
        const date = document.createElement("p");
        date.className = "date";
        date.textContent = message.date;
        messageDiv.appendChild(p);
        messageDiv.appendChild(messagePara);
        messageDiv.appendChild(date);
        queries.appendChild(messageDiv);
    });

}


window.onload = loadListObject();