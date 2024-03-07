export default class ArticlesList {
    constructor() {
        this._articlesList = [];
    }
    getArticlesList() {
        return this._articlesList;
    }
    addArticle(article) {
        this._articlesList.push(article);
    }
    // deleteArticle(article) {
    //     this._articlesList.pop(article);
    // }
    deleteArticleFromList(articleId) {
        const articlesList = this._articlesList;
        for (let i = 0; i < articlesList.length; i++) {
            if (articlesList[i]._id == articleId) {
                articlesList.splice(i, 1);
            }
        }
    }

}