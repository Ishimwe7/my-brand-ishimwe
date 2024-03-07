import Article from "./article.js";
import ArticlesList from "./articlesList.js";

const myArticlesList = new ArticlesList();
const myArticle = new Article();

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});
const updatePersistentData = (articlesArray) => {
    localStorage.setItem("myArticlesList", JSON.stringify(articlesArray));
};

// const buildArticle = (myArticle) => {
//     const article = document.createElement("article");
//     article.className = "blog-post";
//     article.id = myArticle.getId();
//     const image = document.createElement("img");
//     image.alt = "blog image";
//     image.src = "icons/iconmonstr-line-four-horizontal-lined.svg";
//     const title = document.createElement("h2");
//     title.textContent = myArticle.getTitle();
//     title.className = "blog-title";
//     const content = document.createElement("p");
//     content.textContent = myArticle.getContent();
//     content.className = "blog-content";
//     article.appendChild(image);
//     article.appendChild(title);
//     article.appendChild(content);

//     const actions = document.createElement("div");
//     actions.className = "actions";
//     const likeBtn = document.createElement("img");
//     likeBtn.className = "like-btn";
//     likeBtn.src = "icons/heart-svgrepo-com.svg";
//     likeBtn.alt = "like icon";
//     const shareBtn = document.createElement("img");
//     shareBtn.className = "share-btn";
//     shareBtn.src = "icons/curved-arrow-right-icon.svg";
//     shareBtn.alt = "share icon";
//     const commentBtn = document.createElement("button");
//     commentBtn.className = "comment-btn";
//     commentBtn.textContent = "Comment";
//     actions.appendChild(likeBtn);
//     actions.appendChild(shareBtn);
//     actions.appendChild(commentBtn);

//     article.appendChild(actions);

//     const allArticles = document.getElementById("blog-section");
//     allArticles.appendChild(article);
// }

const createNewArticle = (id, title, content) => {
    const article = new Article();
    article.setId(id);
    article.setTitle(title);
    article.setContent(content);
    return article;
}

const initApp = () => {
    //Add listeners
    const articleForm = document.getElementById("new-article");
    articleForm.addEventListener("submit", (event) => {
        event.preventDefault();
        processSubmission();
    })
    //procedural
    loadListObject();
    // refreshThePage();
}

const processSubmission = () => {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const article = createNewArticle(getLastId(), title, content);
    myArticlesList.addArticle(article);
    // buildArticle(article);
    //Update persistant dta
    updatePersistentData(myArticlesList.getArticlesList());
    // refreshThePage();
}



// =======================================================

// const renderList = () => {
//     const articles = myArticlesList.getArticlesList();
//     articles.forEach((article) => {
//         buildArticle(article);
//     });
// }


// const refreshThePage = () => {
//     renderList();
// }


const loadListObject = () => {
    const storedArticles = localStorage.getItem("myArticlesList");
    if (typeof storedArticles !== "string") return;
    const parsedArticles = JSON.parse(storedArticles);
    parsedArticles.forEach((article) => {
        const newArticle = createNewArticle(article._id, article._title, article._content);
        myArticlesList.addArticle(newArticle);
    });
}

const getLastId = () => {
    let nextArticleId = 1;
    const list = myArticlesList.getArticlesList();
    if (list.length > 0) {
        nextArticleId = list[list.length - 1].getId() + 1;
    }
    return nextArticleId;
}

