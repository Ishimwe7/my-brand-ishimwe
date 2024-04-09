import Message from "./message.js";
import MessagesList from "./allMessages.js";


const messagesList = new MessagesList();
const message = new Message();

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});
const updatePersistentData = (messagesArray) => {
    localStorage.setItem("messages", JSON.stringify(messagesArray));
};


const createNewMessage = (id, sender, email, subject, message, date) => {
    const newMessage = new Message();
    newMessage.setId(id);
    newMessage.setSender(sender);
    newMessage.setEmail(email);
    newMessage.setSubject(subject);
    newMessage.setMessage(message);
    newMessage.setDate(date);
    return newMessage;
}


const initApp = () => {
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        processMessage();
        clearForm();
    })
    // loadListObject();
}

const clearForm = () => {
    const names = document.getElementById("names");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const query = document.getElementById("query");
    names.value = '';
    email.value = '';
    subject.value = '';
    query.value = '';
}


const processMessage = async () => {
    const sender = document.getElementById("names").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const content = document.getElementById("query").value;
    const date = new Date();
    //const message = createNewMessage(getLastId(), names, email, subject, query, date);
    // messagesList.addMessage(message);
    // updatePersistentData(messagesList.getMessagesList());
    await fetch('http://localhost:8000/messages/newMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subject, content, sender, email, date: Date.now() })
    }).then(response => {
        if (response.status == 400 || response.status == 404) {
            alert("Message not sent: An expected error occurred! ");
            // const p = document.createElement("p");
            // p.innerHTML = "Message not sent: An expected error occurred! "
            // p.className = "error";
            // document.getElementById('responses').appendChild(p);
        }
        if (response.ok) {
            window.location = "../UI/pages/messageSent.html";
            //window.location.href = '../../index.html'; // Redirect to login page after successful registration
        } else {
            alert("Message not sent: An expected error occurred! ");
            throw new Error('Message sending failed');
        }
    })
        .catch(error => {
            alert("Message not sent: An expected error occurred! ");
            console.error('Registration error:', error);
            // alert('Registration failed');
        });
};

const loadListObject = () => {
    const storedMessages = localStorage.getItem("messages");
    if (typeof storedMessages !== "string") return;
    const parsedMessages = JSON.parse(storedMessages);
    parsedMessages.forEach((message) => {
        const newMessage = createNewMessage(message._id, message._sender, message._email, message._subject, message._query, message._date);
        messagesList.addMessage(newMessage);
    });
    //renderList(myArticlesList);
}


const getLastId = () => {
    let nextMessageId = 1;
    const list = messagesList.getMessagesList();
    if (list.length > 0) {
        nextMessageId = list[list.length - 1].getId() + 1;
    }
    return nextMessageId;
}


