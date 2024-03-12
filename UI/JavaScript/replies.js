export default class Reply {
    constructor(id, author, content, commentId) {
        this._id = id;
        this._author = author;
        this._content = content;
        this._commentId = commentId;
    }


    getId() {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }

    getAuthor() {
        return this._author;
    }
    setAuthor(author) {
        this._author = author;
    }
    getContent() {
        return this._content;
    }
    setContent(content) {
        this._content = content;
    }
    getCommentId() {
        return this._commentId;
    }
    setCommentId(commentId) {
        this._commentId = commentId;
    }
   

    // Method to add a reply to the comment
    addReply(author, content) {
        const reply = {
            author: author,
            content: content,
        };
        this._replies.push(reply);
    }
}