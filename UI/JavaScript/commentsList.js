export default class CommentsList {
    constructor() {
        this._commentsList = [];
    }
    getCommentsList() {
        return this._commentsList;
    }
    addComment(comment) {
        this._commentsList.push(comment);
    }
    // deleteArticle(article) {
    //     this._articlesList.pop(article);
    // }
    deleteCommentFromList(articleId) {
        const commentsList = this._commentsList;
        for (let i = 0; i < commentsList.length; i++) {
            if (commentsList[i]._id == articleId) {
                commentsList.splice(i, 1);
            }
        }
    }

}