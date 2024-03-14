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

const loadListObject = () => {
    const storedMessages = localStorage.getItem("messages");
    if (typeof storedMessages !== "string") return;
    const parsedMessages = JSON.parse(storedMessages);
    parsedMessages.forEach((message) => {
        const newMessage = addMessage(message._id, message._sender, message._email, message._subject, message._message, message._date);
        allMessages.addMessage(newMessage);
    });
    renderList(allMessages);
};



const renderList = (messagesList) => {
    const messages = messagesList.getMessagesList();
    const messagesDiv = document.getElementById("messages");
    const queries = document.getElementById("queries");
    const messageCount = document.getElementById("message-count");
    messageCount.textContent = messages.length;


    messages.forEach((message) => {
        const messageDiv = document.createElement("div");
        messageDiv.className = "query";
        const p = document.createElement("p");
        const span1 = document.createElement("span");
        span1.className = "names";
        span1.textContent = message.getSender();
        span1.id = message.getId();
        const span2 = document.createElement("span");
        span2.className = "email";
        span2.textContent = message.getEmail();
        p.className = "user";
        p.appendChild(span1);
        p.appendChild(span2);
        const messagePara = document.createElement("p");
        messagePara.className = "message";
        messagePara.textContent = message.getMessage();
        const date = document.createElement("p");
        date.className = "date";
        date.textContent = message.getDate();
        messageDiv.appendChild(p);
        messageDiv.appendChild(messagePara);
        messageDiv.appendChild(date);
        queries.appendChild(messageDiv);
    });

}


window.onload = loadListObject();