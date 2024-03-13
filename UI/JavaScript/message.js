export default class Message {
    constructor() {
        this._id = null;
        this._sender = null;
        this._email = null;
        this._subject = null;
        this._message = null;
        this._date = null;
    }
    getId() {
        return this._id
    }
    setId(id) {
        this._id = id;
    }
    getSender() {
        return this._sender;
    }
    setSender(sender) {
        this._sender = sender;
    }
    getEmail() {
        return this._email;
    }
    setEmail(email) {
        this._email = email;
    }
    getSubject() {
        return this._subject;
    }
    setSubject(subject) {
        this._subject = subject;
    }
    getMessage() {
        return this._message;
    }
    setMessage(message) {
        this._message = message;
    }
    getDate() {
        return this._date;
    }
    setDate(date) {
        this._date = date;
    }
}