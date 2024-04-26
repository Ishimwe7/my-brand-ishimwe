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
function removeContent() {
    // Hide all content sections
    var contentSections = document.querySelectorAll('.content');
    contentSections.forEach(function (section) {
        section.style.display = 'none';
    });

}
const showBlogs = (contentId) => {
    removeContent();
    var selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'grid';
    }
}
document.getElementById('cancel-edit').addEventListener('click', () => {
    document.getElementById('edit-article-form').style.display = "none";
    showBlogs('blog-section');
})
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

const hideForm = () => {
    // removeContent();
    // showBlogs();
    document.getElementById('edit-article-form').style.display = "none";
    location.reload();
}

const processSubmission = () => {
    const blogId = document.getElementById("edit-articleId").value;
    const title = document.getElementById("edit-title").value;
    const content = document.getElementById("edit-content").value;
    const image = document.getElementById("edit-art-image");
    let imageUrl = null;
    const imageReader = new FileReader();
    imageReader.addEventListener('load', async () => {
        console.log("inside process");
        imageUrl = imageReader.result;
        // Create and add the article after the image is loaded
        const article = { "title": title, "imageUrl": imageUrl, "content": content };
        //myArticlesList.addArticle(article);
        // updatePersistentData(myArticlesList.getArticlesList());
        const success = document.getElementById('create-success');
        const errorPara = document.getElementById('create-error');
        success.textContent = '';
        errorPara.textContent = ''
        const token = getToken();
        await fetch(`https://my-brand-nyanja-cyane.onrender.com/blogs/editBlog/${blogId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article)
        }).then(response => {
            if (response.status == 400 || response.status == 404) {
                alert("Blog not updated: An expected error occurred! ");
            }
            if (response.ok) {
                success.textContent = "Blog edited Successfully";
                success.style.display = "block";
                setTimeout(hideForm, 5000);
                clearForm();
                // removeContent();
                // showBlogs('blog-section');
            }
            else {
                errorPara.textContent = "Editing Blog Failed ";
                errorPara.style.display = "block";
                setTimeout(hideForm, 5000);
                throw new Error('Blog editing failed');
            }
            // console.log(response);
        })
            .catch(error => {
                errorPara.textContent = "Editing Blog Failed ";
                errorPara.style.display = "block";
                setTimeout(hideForm, 5000);
                console.error('Creating blog error:', error);
            });
    });
    imageReader.readAsDataURL(image.files[0]);
}


