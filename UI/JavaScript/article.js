export default class Article {
    constructor() {
        this._id = null;
        this._title = null;
        this._content = null;
        this._image = null;
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

}