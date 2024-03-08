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
    const comment = new Comment();
    comment.setAuthor(author);
    comment.setContent(content);
    comment.setArticleId(articleId);
    comment.setLikes(likes);
    comment.setReplies(replies);
    return comment;
}



const initApp = () => {
    //Add listeners
    const articleForm = document.getElementById("new-article");
    articleForm.addEventListener("submit", (event) => {
        event.preventDefault();
        processSubmission()
        alert("Article Created Successfully !!");
        clearForm();
    })
    //procedural
    loadListObject();
    // refreshThePage();
}

const clearForm = () => {
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const image = document.getElementById("art-image");
    title.value = '';
    content.value = '';
    image.value = '';
}

const processSubmission = () => {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("art-image");
    let imageUrl = null;
    const imageReader = new FileReader();

    imageReader.addEventListener('load', () => {
        imageUrl = imageReader.result;

        // Create and add the article after the image is loaded
        const article = createNewArticle(getLastId(), title, imageUrl, content);
        myArticlesList.addArticle(article);
        updatePersistentData(myArticlesList.getArticlesList());
    });

    // Read the image file
    imageReader.readAsDataURL(image.files[0]);
}


const loadListObject = () => {
    const storedArticles = localStorage.getItem("myArticlesList");
    if (typeof storedArticles !== "string") return;
    const parsedArticles = JSON.parse(storedArticles);
    parsedArticles.forEach((article) => {
        const newArticle = createNewArticle(article._id, article._title, article._image, article._content);
        myArticlesList.addArticle(newArticle);
    });
    //renderList(myArticlesList);
}


const getLastId = () => {
    let nextArticleId = 1;
    const list = myArticlesList.getArticlesList();
    if (list.length > 0) {
        nextArticleId = list[list.length - 1].getId() + 1;
    }
    return nextArticleId;
}
const getLastCommentId = () => {
    let nextCommentId = 1;
    const commentsList = commentsList.getCommentsList();
    if (commentsList.length > 0) {
        nextCommentId = commentsList[commentsList.length - 1].getId() + 1;
    }
    return nextCommentId;
}

