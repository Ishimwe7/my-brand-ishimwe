export default class User {
    constructor() {
        this._id = null;
        this._names = null;
        this._email = null;
        this._password = null;
    }


    getId() {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }

    getNames() {
        return this._names;
    }
    setNames(names) {
        this._names = names;
    }
    getEmail() {
        return this._email;
    }
    setEmail(email) {
        this._email = email;
    }
    getPassword() {
        return this._password;
    }
    setPassword(password) {
        this._password = password;
    }
}