import Article from "./article.js";
import ArticlesList from "./articlesList.js";
import Comment from "./comment.js";
import CommentsList from "./commentsList.js";

const myArticlesList = new ArticlesList();
const myArticle = new Article();
const comment = new Comment();
const commentsList = new CommentsList();

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});
const updatePersistentData = (articlesArray) => {
    localStorage.setItem("myArticlesList", JSON.stringify(articlesArray));
};

const createNewComment = (commentId, author, content, likes, replies) => {
    const comment = new Comment();
    comment.setId(commentId);
    comment.setAuthor(author);
    comment.setContent(content);
    comment.setLikes(likes);
    comment.setReplies(replies);
    return comment;
}

const initApp = () => {
    //Add listeners
    //const commentForm = document.getElementById("comment-form1");
    const commentButton = document.querySelector('.add-comment-btn');
    commentButton.addEventListener("click", (event) => {
        const articleId = event.target.closest("article").id;
        event.preventDefault();
        // console.log(articleId);
        loadListObject(articleId);
        //processCommentSubmission(articleId);
    })
    //procedural
    //loadListObject();
    // refreshThePage();
}

const processCommentSubmission = (articleId, myArticlesList) => {
    const comment = document.getElementById("new-comment").value;
    const author = "Nyanja";
    const replies = [];
    const newComment = createNewComment(getLastCommentId(), author, comment, 0, replies);
    const articles = myArticlesList.getArticlesList();
    articles.forEach((article) => {
        // console.log(article.getId() + "=" + articleId);
        if (article.getId() == articleId) {
            article.addComment(newComment);
            console.log(article + "noooo");
            //storedArticlesList.addArticle(article);
            // console.log(storedArticlesList);
            updatePersistentData(articles);
            return;
        }
        else { console.log("Byanze kbx") }
    });
};

const getLastCommentId = () => {
    let nextCommentId = 1;
    const commentsArray = commentsList.getCommentsList();
    if (commentsArray.length > 0) {
        nextCommentId = commentsArray[commentsArray.length - 1].getId() + 1;
    }
    return nextCommentId;
}

const loadListObject = (articleId) => {
    // let loadedArticles = new ArticlesList();
    const storedArticles = localStorage.getItem("myArticlesList");
    if (typeof storedArticles !== "string") return;
    const parsedArticles = JSON.parse(storedArticles);
    parsedArticles.forEach((article) => {
        const newArticle = createNewArticle(article._id, article._title, article._image, article._content, article._comments, article._likes);
        myArticlesList.addArticle(newArticle);
    });
    processCommentSubmission(articleId, myArticlesList);
}

const createNewArticle = (id, title, image, content, comments, likes) => {
    const article = new Article();
    article.setId(id);
    article.setTitle(title);
    article.setImage(image);
    article.setContent(content);
    article.setComments(comments);
    article.setLikes(likes);
    return article;
}