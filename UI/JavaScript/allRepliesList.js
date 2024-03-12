export default class RepliesList {
    constructor() {
        this._repliesList = [];
    }
    getRepliesList() {
        return this._repliesList;
    }
    addReply(reply) {
        this._repliesList.push(reply);
    }
    // deleteArticle(article) {
    //     this._articlesList.pop(article);
    // }
    deleteReplyList(replyId) {
        const repliesList = this._repliesList;
        for (let i = 0; i < repliesList.length; i++) {
            if (repliesList[i]._id == replyId) {
                repliesList.splice(i, 1);
            }
        }
    }

}