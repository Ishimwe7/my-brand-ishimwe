import Article from "./article.js";
import ArticlesList from "./articlesList.js";

const myArticlesList = new ArticlesList();
const myArticle = new Article();

const createNewArticle = (id, title, image, content) => {
    const article = new Article();
    article.setId(id);
    article.setTitle(title);
    article.setImage(image);
    article.setContent(content);
    return article;
}

const buildArticle = (myArticle) => {
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


const loadListObject = () => {
    const storedArticles = localStorage.getItem("myArticlesList");
    if (typeof storedArticles !== "string") return;
    const parsedArticles = JSON.parse(storedArticles);
    parsedArticles.forEach((article) => {
        const newArticle = createNewArticle(article._id, article._title, article._image, article._content);
        myArticlesList.addArticle(newArticle);
    });
    renderList(myArticlesList);
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