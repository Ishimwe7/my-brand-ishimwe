// import Message from "./message.js";
// import MessagesList from "./allMessages.js";


// const messagesList = new MessagesList();
// const message = new Message();

// document.addEventListener("readystatechange", (event) => {
//     if (event.target.readyState === "complete") {
//         initApp();
//     }
// });
// const updatePersistentData = (messagesArray) => {
//     localStorage.setItem("messages", JSON.stringify(messagesArray));
// };


// const createNewMessage = (id, sender, email, subject, message, date) => {
//     const newMessage = new Message();
//     newMessage.setId(id);
//     newMessage.setSender(sender);
//     newMessage.setEmail(email);
//     newMessage.setSubject(subject);
//     newMessage.setMessage(message);
//     newMessage.setDate(date);
//     return newMessage;
// }


// const initApp = () => {
//     const contactForm = document.getElementById("contact-form");
//     contactForm.addEventListener("submit", (event) => {
//         event.preventDefault();
//         processMessage();
//         clearForm();
//     })
//     // loadListObject();
// }

// const clearForm = () => {
//     const names = document.getElementById("names");
//     const email = document.getElementById("email");
//     const subject = document.getElementById("subject");
//     const query = document.getElementById("query");
//     names.value = '';
//     email.value = '';
//     subject.value = '';
//     query.value = '';
// }


// const processMessage = async () => {
//     const sender = document.getElementById("names").value;
//     const email = document.getElementById("email").value;
//     const subject = document.getElementById("subject").value;
//     const content = document.getElementById("query").value;
//     const senderError = document.getElementById("sender-error");
//     const emailError = document.getElementById("email-error");
//     const subjectError = document.getElementById("subject-error");
//     const contentError = document.getElementById("query-error");
//     if (!sender) {
//         senderError.textContent = "Names are required !"
//     }
//     if (!email) {
//         emailError.textContent = "Email is required !"
//     }
//     if (!subject) {
//         subjectError.textContent = "Subject is required !"
//     }
//     if (!content) {
//         contentError.textContent = "Message content is required !"
//         return;
//     }
//     await fetch('https://my-brand-nyanja-cyane.onrender.com/messages/newMessage', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ subject, content, sender, email, date: Date.now() })
//     }).then(response => {
//         if (response.status == 400 || response.status == 404) {
//             alert("Message not sent: An expected error occurred! ");
//         }
//         if (response.ok) {
//             window.location = "./UI/pages/messageSent.html";
//         } else {
//             alert("Message not sent: An expected error occurred! ");
//             throw new Error('Message sending failed');
//         }
//     })
//         .catch(error => {
//             alert("Message not sent: An expected error occurred! ");
//         });
// };

// const loadListObject = () => {
//     const storedMessages = localStorage.getItem("messages");
//     if (typeof storedMessages !== "string") return;
//     const parsedMessages = JSON.parse(storedMessages);
//     parsedMessages.forEach((message) => {
//         const newMessage = createNewMessage(message._id, message._sender, message._email, message._subject, message._query, message._date);
//         messagesList.addMessage(newMessage);
//     });
//     //renderList(myArticlesList);
// }


// const getLastId = () => {
//     let nextMessageId = 1;
//     const list = messagesList.getMessagesList();
//     if (list.length > 0) {
//         nextMessageId = list[list.length - 1].getId() + 1;
//     }
//     return nextMessageId;
// }


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
};

const initApp = () => {
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        processMessage()
    });

    // Add event listeners for real-time validation
    addInputListeners();
};

const clearForm = () => {
    const names = document.getElementById("names");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const query = document.getElementById("query");
    names.value = '';
    email.value = '';
    subject.value = '';
    query.value = '';
    clearErrors();
};

const clearErrors = () => {
    document.getElementById("names-error").textContent = '';
    document.getElementById("email-error").textContent = '';
    document.getElementById("subject-error").textContent = '';
    document.getElementById("query-error").textContent = '';
};

const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

const processMessage = async () => {
    const sender = document.getElementById("names").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const content = document.getElementById("query").value.trim();
    const senderError = document.getElementById("names-error");
    const emailError = document.getElementById("email-error");
    const subjectError = document.getElementById("subject-error");
    const contentError = document.getElementById("query-error");
    const requestError = document.getElementById("request-error");
    let valid = true;
    clearErrors();

    if (!sender) {
        senderError.textContent = "Names are required!";
        valid = false;
    }

    if (!email) {
        emailError.textContent = "Email is required!";
        valid = false;
    } else if (!isValidEmail(email)) {
        emailError.textContent = "Invalid email format!";
        valid = false;
    }

    if (!subject) {
        subjectError.textContent = "Subject is required!";
        valid = false;
    }

    if (!content) {
        contentError.textContent = "Message content is required!";
        valid = false;
    }

    if (!valid) return false;

    try {
        const response = await fetch('https://my-brand-nyanja-cyane.onrender.com/messages/newMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subject, content, sender, email, date: Date.now() })
        });

        if (response.ok) {
            clearForm();
            window.location = "./UI/pages/messageSent.html";
        } else {
            requestError.textContent='Message Not Sent.'
        }
    } catch (error) {
        requestError.textContent='An Expected Error Occurred.'
    }

    return true;
};

const addInputListeners = () => {
    const names = document.getElementById("names");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const query = document.getElementById("query");

    names.addEventListener("input", () => validateInput("names"));
    email.addEventListener("input", () => validateInput("email"));
    subject.addEventListener("input", () => validateInput("subject"));
    query.addEventListener("input", () => validateInput("query"));
};

const validateInput = (field) => {
    const value = document.getElementById(field).value.trim();
    const errorElement = document.getElementById(`${field}-error`);

    switch (field) {
        case "names":
            if (!value) {
                errorElement.textContent = "Names are required!";
            } else {
                errorElement.textContent = '';
            }
            break;
        case "email":
            if (!value) {
                errorElement.textContent = "Email is required!";
            } else if (!isValidEmail(value)) {
                errorElement.textContent = "Invalid email format!";
            } else {
                errorElement.textContent = '';
            }
            break;
        case "subject":
            if (!value) {
                errorElement.textContent = "Subject is required!";
            } else {
                errorElement.textContent = '';
            }
            break;
        case "query":
            if (!value) {
                errorElement.textContent = "Message content is required!";
            } else {
                errorElement.textContent = '';
            }
            break;
        default:
            break;
    }
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
};

const getLastId = () => {
    let nextMessageId = 1;
    const list = messagesList.getMessagesList();
    if (list.length > 0) {
        nextMessageId = list[list.length - 1].getId() + 1;
    }
    return nextMessageId;
};
