export default class Article {
    constructor() {
        this._id = null;
        this._title = null;
        this._content = null;
        this._image = null;
        this._comments = [];
        this._likes = 0;
    }
    getId() {
        return this._id
    }
    setId(id) {
        this._id = id;
    }
    getTitle() {
        return this._title
    }
    setTitle(title) {
        this._title = title;
    }
    getContent() {
        return this._content;
    }
    setContent(content) {
        this._content = content;
    }
    getImage() {
        return this._image;
    }
    setImage(image) {
        this._image = image;
    }
    getComments() {
        return this._comments;
    }
    setComments(comments) {
        this._comments = comments;
    }
    getLikes() {
        return this._likes;
    }
    setLikes(likes) {
        this._likes = likes;
    }

    like() {
        this._likes++;
    }

    addComment(author, commentContent, likes, replies) {
        const comment = new Comment(author, commentContent, likes, replies);
        this._comments.push(comment);
    }

}