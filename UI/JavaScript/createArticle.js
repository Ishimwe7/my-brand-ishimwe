import Article from "./article.js";
import ArticlesList from "./articlesList.js";
import Comment from "./comment.js";
import CommentsList from "./commentsList.js";
//import multer from 'multer';

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

const createNewComment = (commentId, author, content, likes, replies) => {
    const comment = new Comment();
    comment.setId(commentId);
    comment.setAuthor(author);
    comment.setContent(content);
    comment.setLikes(likes);
    comment.setReplies(replies);
    return comment;
}


const getToken = () => {
    const authToken = sessionStorage.getItem("adminToken");
    if (typeof authToken !== "string") return;
    const parsedToken = JSON.parse(authToken);
    //console.log(parsedToken.token);
    return parsedToken.token;
}


const initApp = () => {

    const articleForm = document.getElementById("new-article");
    articleForm.addEventListener("submit", (event) => {
        event.preventDefault();
        processSubmission()
        //location.reload();
    })
    // const commentForm = document.getElementById("comment-form");
    // commentForm.addEventListener("submit", (event) => {
    //     const articleId = event.target.closest("article").id;
    //     console.log(articleId + "Hello Nyanja");
    //     event.preventDefault();
    //     processCommentSubmission(articleId);
    // })
    //procedural
    // loadListObject();
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

// const processCommentSubmission = (articleId) => {
//     console.log("It is not working");
//     const comment = document.getElementById("new-comment").value;
//     const author = "Nyanja";
//     const replies = [];
//     const newComment = createNewComment(getLastCommentId(), author, comment, 0, replies);
//     //myArticlesList.addArticle(article);
//     const article = myArticlesList.getArticlesList.find((article) => article.id === articleId);
//     if (article) {
//         article.addComment(newComment);
//     }
//     else {
//         console.log("It is not working");
//     }
//     updatePersistentData(myArticlesList.getArticlesList());
// };


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

const processSubmission = () => {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("art-image");
    let imageUrl = null;
    const imageReader = new FileReader();
    imageReader.addEventListener('load', async () => {
        console.log("inside process");
        imageUrl = imageReader.result;
        // Create and add the article after the image is loaded
        const article = { "title": title, "imageUrl": imageUrl, "content": content, "comments": [], "likes": 0 };
        //myArticlesList.addArticle(article);
        // updatePersistentData(myArticlesList.getArticlesList());
        const success = document.getElementById('success');
        const errorPara = document.getElementById('error');
        const token = getToken();
        await fetch('https://my-brand-nyanja-cyane.onrender.com/blogs/newBlog', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article)
        }).then(response => {
            if (response.status == 400 || response.status == 404) {
                alert("Blog not added: An expected error occurred! ");
            }
            if (response.ok) {
                success.textContent = "Blog Created Successfully";
                success.style.display = "block";
                clearForm();
            }
            else {
                errorPara.textContent = "Blog Creation Failed ";
                errorPara.style.display = "block";
                throw new Error('Blog creation failed');
            }
            // console.log(response);
        })
            .catch(error => {
                errorPara.textContent = "An expected error occurred !";
                errorPara.style.display = "block";
                console.error('Creating blog error:', error);
            });

        // Read the image file
    });
    imageReader.readAsDataURL(image.files[0]);
}

const loadListObject = () => {
    const storedArticles = localStorage.getItem("myArticlesList");
    if (typeof storedArticles !== "string") return;
    const parsedArticles = JSON.parse(storedArticles);
    parsedArticles.forEach((article) => {
        const newArticle = createNewArticle(article._id, article._title, article._image, article._content, article._comments, article._likes);
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
// const getLastCommentId = () => {
//     let nextCommentId = 1;
//     const commentsList = commentsList.getCommentsList();
//     if (commentsList.length > 0) {
//         nextCommentId = commentsList[commentsList.length - 1].getId() + 1;
//     }
//     return nextCommentId;
// }

