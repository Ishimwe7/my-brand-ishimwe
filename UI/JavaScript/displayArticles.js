import Article from "./article.js";
import ArticlesList from "./articlesList.js";
import Comment from "./comment.js";
import CommentsList from "./commentsList.js";

const myArticlesList = new ArticlesList();
const myArticle = new Article();
const comment = new Comment();
const commentsList = new CommentsList();

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
const createNewComment = (author, content, articleId, likes, replies) => {
    const article = new Article();
    comment.setAuthor(author);
    comment.setContent(content);
    comment.setArticleId(articleId);
    comment.setLikes(likes);
    comment.setReplies(replies);
    return comment;
}

const buildArticle = (myArticle, id) => {
    const article = document.createElement("article");
    article.className = "blog-post";
    article.id = myArticle.getId();
    const image = document.createElement("img");
    image.alt = "blog image";
    image.src = myArticle.getImage();
    const title = document.createElement("h2");
    title.innerText = myArticle.getTitle();
    title.className = "blog-title";
    const content = document.createElement("p");
    content.textContent = myArticle.getContent();
    content.className = "blog-content";
    article.appendChild(image);
    article.appendChild(title);
    article.appendChild(content);

    const actions = document.createElement("div");
    actions.className = "actions";
    const likeBtn = document.createElement("img");
    likeBtn.className = "like-btn";
    likeBtn.src = "UI/icons/heart-svgrepo-com.svg";
    likeBtn.alt = "like icon";
    const shareBtn = document.createElement("img");
    shareBtn.className = "share-btn";
    shareBtn.src = "UI/icons/curved-arrow-right-icon.svg";
    shareBtn.alt = "share icon";

    actions.appendChild(likeBtn);
    actions.appendChild(shareBtn);

    const commentDiv = document.createElement("div");
    commentDiv.className = "add-comment"
    const commentForm = document.createElement("form");
    commentForm.name = "comment-form";
    commentForm.id = "comment-form" + id;
    const commentInput = document.createElement("input");
    commentInput.className = "create-comment";
    commentInput.id = "new-comment";
    commentInput.type = "text";
    commentInput.maxLength = "100";
    const addCommentBtn = document.createElement("button");
    addCommentBtn.className = "add-comment-btn"
    addCommentBtn.id = "add-comment-btn" + id;
    //addCommentBtn.className = "add-comment-btn";
    addCommentBtn.textContent = "Comment";
    commentForm.appendChild(commentInput);
    commentForm.appendChild(addCommentBtn);
    commentDiv.appendChild(commentForm)
    const comments_section = document.createElement("div");
    comments_section.className = "comments-section";
    const comments_header = document.createElement("h3");
    comments_header.textContent = "Comments";
    comments_section.appendChild(comments_header);
    const comments = myArticle.getComments();
    if (comments != null) {
        comments.forEach((comment) => {
            const one_comment = document.createElement("div");
            one_comment.className = "comment";
            const comment_actions = document.createElement("div");
            comment_actions.className = "comment-actions";
            const com_like = document.createElement("img");
            com_like.className = "like-btn";
            com_like.id = "com-like" + id;
            com_like.src = "UI/icons/heart-svgrepo-com.svg";
            const com_reply = document.createElement("img");
            com_reply.className = "reply-btn";
            com_reply.id = "com-reply" + id;
            com_reply.src = "UI/icons/curved-arrow-left-icon.svg";
            comment_actions.appendChild(com_like);
            comment_actions.appendChild(com_reply);
            const com_auth = document.createElement("p");
            com_auth.textContent = "<strong>" + comments[id].author + "</strong> : " + comments[id].content;
            one_comment.appendChild(comment_actions);
            one_comment.appendChild(com_auth);
            comments_section.appendChild(one_comment);
        })
    }
    else {
        const no_comments = document.createElement("p");
        no_comments.className = "no-comments";
        no_comments.textContent = "No comments yet !";
        comments_section.appendChild(no_comments);
    }
    article.appendChild(actions);
    article.appendChild(commentDiv);
    article.appendChild(comments_section);
    const allArticles = document.getElementById("blog-section");
    allArticles.appendChild(article);
}


// const loadListObject = () => {
//     const storedArticles = localStorage.getItem("myArticlesList");
//     if (typeof storedArticles !== "string") return;
//     const parsedArticles = JSON.parse(storedArticles);
//     parsedArticles.forEach((article) => {
//         const newArticle = createNewArticle(article._id, article._title, article._image, article._content);
//         myArticlesList.addArticle(newArticle);
//     });
//     renderList(myArticlesList);
// }

const loadListObject = () => {
    const storedArticles = localStorage.getItem("myArticlesList");
    if (typeof storedArticles !== "string") return;
    const parsedArticles = JSON.parse(storedArticles);
    parsedArticles.forEach((article) => {
        const newArticle = createNewArticle(article._id, article._title, article._image, article._content);
        article._comments.forEach((comment) => {
            const newComment = createNewComment(comment._author, comment._content, comment._articleId, comment._likes, comment._replies);
            newArticle.addComment(newComment);
        });
        // newArticle.setComments(commentsList);
        myArticlesList.addArticle(newArticle);
    });
    //location.reload();
    renderList(myArticlesList);
}


const renderList = (myArticlesList) => {
    const articles = myArticlesList.getArticlesList();
    let id = 1;
    articles.forEach((article) => {
        buildArticle(article, id);
        id++;
    });
}

window.onload = loadListObject();

// document.addEventListener("readystatechange", (event) => {
//     if (event.target.readyState === "complete") {
//         renderList();
//     }
// });