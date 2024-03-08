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

const buildArticle = (myArticle) => {
    let i;
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
    likeBtn.src = "icons/heart-svgrepo-com.svg";
    likeBtn.alt = "like icon";
    const shareBtn = document.createElement("img");
    shareBtn.className = "share-btn";
    shareBtn.src = "icons/curved-arrow-right-icon.svg";
    shareBtn.alt = "share icon";

    actions.appendChild(likeBtn);
    actions.appendChild(shareBtn);

    const commentDiv = document.createElement("div");
    commentDiv.className = "add-comment"
    const commentForm = document.createElement("form");
    commentForm.name = "comment-form";
    commentForm.id = "comment-form";
    const commentInput = document.createElement("input");
    commentInput.className = "create-comment";
    commentInput.type = "text";
    commentInput.maxLength = "100";
    const addCommentBtn = document.createElement("button");
    addCommentBtn.className = "add-comment-btn"
    addCommentBtn.className = "add-comment-btn";
    addCommentBtn.textContent = "Comment";
    commentForm.appendChild(commentInput);
    commentForm.appendChild(addCommentBtn);
    commentDiv.appendChild(commentForm)

    const comments_section = document.createElement("div");
    comments_section.className = "comments-section";
    const comments_header = document.createElement("h2");
    const one_comment = document.createElement("div");
    const com_auth = document.createElement("p");
    const comment = myArticle.comments[i];
    com_auth.textContent = "<strong>" + myArticle.comment[i].author + "</strong> : " + myArticle.comment[i].content;
    article.appendChild(actions);
    article.appendChild(commentDiv);

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
        const newArticle = createNewArticle(article._id, article._title, article._image, article._content, article.comments.forEach((comment) => {
            const newComment = createNewComment(comment.author, comment.content, comment.articleId, comment.likes, comment.replies);
            commentsList.addComment(newComment);
        }));
        newArticle.setComments(commentsList);
        myArticlesList.addArticle(newArticle);
    });
    renderList();
}


const renderList = (myArticlesList) => {
    const articles = myArticlesList.getArticlesList();
    articles.forEach((article) => {
        buildArticle(article);
    });
}

window.onload = loadListObject();

// document.addEventListener("readystatechange", (event) => {
//     if (event.target.readyState === "complete") {
//         renderList();
//     }
// });