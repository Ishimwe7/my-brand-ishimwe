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


const initApp = () => {
    const updateButton = document.querySelector('.update-btn');
    updateButton.addEventListener("click", (event) => {
        const articleId = event.target.closest("article").id;
        event.preventDefault();
        loadListObject(articleId);
    })
}

const processUpdate = () => {
    const updateButtons = document.querySelectorAll(".update-btn");
    updateButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {

            const articleId = event.target.closest("article").dataset.articleId;

        });
    });
}

const update = (articleId) => {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("art-image");
    let imageUrl = null;
    const imageReader = new FileReader();

    imageReader.addEventListener('load', () => {
        imageUrl = imageReader.result;

        // Create and add the article after the image is loaded
        const article = createNewArticle(articleId, title, imageUrl, content, commentsList.getCommentsList(), 0);
        myArticlesList.updateArticle(articleId, article);
        updatePersistentData(myArticlesList.getArticlesList());
    });

    // Read the image file
    imageReader.readAsDataURL(image.files[0]);
}

// const processUpdate = () => {
//     const updateButtons = document.querySelectorAll(".update-btn");
//     updateButtons.forEach(function (button) {
//         button.addEventListener("click", function (event) {
//             const articleId = event.target.closest("article").id;
//             const articleToUpdate = myArticlesList.getArticleById(articleId);
//             if (!articleToUpdate) {
//                 console.error("Article not found");
//                 return;
//             }
//             // Populate the form fields with existing article data
//             document.getElementById("title").value = articleToUpdate.getTitle();
//             document.getElementById("content").value = articleToUpdate.getContent();
//             // Assuming image is provided as URL
//             document.getElementById("art-image").value = articleToUpdate.getImage();

//             // Show the update form
//             document.getElementById("update-form").style.display = "block";

//             // Add event listener for form submission
//             const updateForm = document.getElementById("update-form");
//             updateForm.addEventListener("submit", function (event) {
//                 event.preventDefault();
//                 update(articleId);
//                 // Hide the update form after submission
//                 document.getElementById("update-form").style.display = "none";
//             });
//         });
//     });
// };