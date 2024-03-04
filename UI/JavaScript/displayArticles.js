import Article from "./article.js";
import ArticlesList from "./articlesList.js";

const myArticlesList = new ArticlesList();
const myArticle = new Article();

const buildArticle = (myArticle) => {
    const article = document.createElement("article");
    article.className = "blog-post";
    article.id = myArticle.getId();
    const image = document.createElement("img");
    image.alt = "blog image";
    image.src = "icons/iconmonstr-line-four-horizontal-lined.svg";
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
    const commentBtn = document.createElement("button");
    commentBtn.className = "comment-btn";
    commentBtn.textContent = "Comment";
    actions.appendChild(likeBtn);
    actions.appendChild(shareBtn);
    actions.appendChild(commentBtn);

    article.appendChild(actions);

    const allArticles = document.getElementById("blog-section");
    allArticles.appendChild(article);
}

// const createNewArticle = (id, title, content) => {
//     const article = new Article();
//     article.setId(id);
//     article.setTitle(title);
//     article.setContent(content);
//     return article;
// }


const renderList = () => {
    const articles = myArticlesList.getArticlesList();
    articles.forEach((article) => {
        buildArticle(article);
    });
}

window.onload = renderList();

// document.addEventListener("readystatechange", (event) => {
//     if (event.target.readyState === "complete") {
//         renderList();
//     }
// });