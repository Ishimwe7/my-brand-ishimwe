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
        location.reload();
    })
    loadListObject();
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


const processMessage = () => {
    const names = document.getElementById("names").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const query = document.getElementById("query").value;
    const date = new Date();
    const message = createNewMessage(getLastId(), names, email, subject, query, date);
    messagesList.addMessage(message);
    updatePersistentData(messagesList.getMessagesList());
    window.location = "../pages/messageSent.html";
    //console.log(window.location);
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


