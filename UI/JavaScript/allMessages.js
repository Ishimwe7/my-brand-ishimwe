export default class MessagesList {
    constructor() {
        this._messagesList = [];
    }
    getMessagesList() {
        return this._messagesList;
    }
    addMessage(message) {
        this._messagesList.push(message);
    }
    getMessageById(id) {
        return this._messagesList.find((message) => message.id === id);
    }
    // deleteArticle(article) {
    //     this._articlesList.pop(article);
    // }
    deleteMessageFromList(messageId) {
        const messagesList = this._messagesList;
        for (let i = 0; i < messagesList.length; i++) {
            if (messagesList[i]._id == messageId) {
                messagesList.splice(i, 1);
            }
        }
    }

}