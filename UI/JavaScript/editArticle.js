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

    const articleForm = document.getElementById("edit-article");
    articleForm.addEventListener("submit", (event) => {
        event.preventDefault();
        processSubmission()
    })
}

const clearForm = () => {
    const title = document.getElementById("edit-title");
    const content = document.getElementById("edit-content");
    const image = document.getElementById("edit-art-image");
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
    imageReader.addEventListener('load', async () => {
        console.log("inside process");
        imageUrl = imageReader.result;
        // Create and add the article after the image is loaded
        const article = { "title": title, "imageUrl": imageUrl, "content": content, "comments": [], "likes": 0 };
        //myArticlesList.addArticle(article);
        // updatePersistentData(myArticlesList.getArticlesList());
        console.log(imageUrl);
        console.log(title);
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
                alert("Blog added Successfully !");
                clearForm();
            }
            else {
                alert("Blog not created: An expected error occurred! ");
                throw new Error('Blog creation failed');
            }
            // console.log(response);
        })
            .catch(error => {
                alert("Blog not created: An expected error occurred! ");
                console.error('Creating blog error:', error);
            });

        // Read the image file
    });
    imageReader.readAsDataURL(image.files[0]);
}


