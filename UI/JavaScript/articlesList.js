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
    getArticleById(id) {
        return this._articlesList.find((article) => article.id === id);
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
    updateArticle(articleId, updatedArticle) {
        this._articlesList = this._articlesList.map((article) => {
            if (article.id === articleId) {
                return { ...article, ...updatedArticle };
            }
            return article;
        });
    }
}