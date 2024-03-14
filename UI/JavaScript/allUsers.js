export default class AllUsers {
    constructor() {
        this._allUsers = [];
    }
    getAllUSersList() {
        return this._allUsers;
    }
    addUser(user) {
        this._allUsers.push(user);
    }

    getUserByEmailAndPassword(email, password) {
        return this._allUsers.find((user) => user.email === email && user.password === password);
    }
    deleteUser(email) {
        const usersList = this._allUsers;
        for (let i = 0; i < usersList.length; i++) {
            if (usersList[i]._email == email) {
                usersList.splice(i, 1);
            }
        }
    }

}