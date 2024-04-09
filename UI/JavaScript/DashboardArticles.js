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
    article.id = myArticle._id;
    const image = document.createElement("img");
    image.alt = "blog image";
    image.src = myArticle.imageUrl;
    const title = document.createElement("h2");
    title.innerText = myArticle.title;
    title.className = "blog-title";
    const content = document.createElement("p");
    content.textContent = myArticle.content;
    content.className = "blog-content";
    article.appendChild(image);
    article.appendChild(title);
    article.appendChild(content);

    const actions = document.createElement("div");
    actions.className = "actions";
    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update"
    updateBtn.className = "update-btn";
    updateBtn.id = "updateBtn" + myArticle._id;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete"
    deleteBtn.className = "delete-btn";
    deleteBtn.id = "deleteBtn" + myArticle._id;

    deleteBtn.addEventListener('click', async () => {
        await fetch(`https://my-brand-nyanja-cyane.onrender.com/blogs/deleteBlog/${myArticle._id}`, {
            method: 'DELETE',
        }).then(response => {

            if (response.status == 500 || response.status == 400 || response.status == 404) {
                const p = document.createElement("p");
                p.innerHTML = "No blog found! "
                p.className = "error";
                document.getElementById('responses').appendChild(p);
            }
            if (response.ok) {
                response.json().then(data => {
                    const message = data;
                    alert(message.message);
                    location.reload();
                })
            } else {
                const p = document.createElement("p");
                p.innerHTML = "An expected error occurred ! "
                p.className = "error";
                document.getElementById('responses').appendChild(p);
                throw new Error('Deleting blog failed');
            }
        })
            .catch(error => {
                console.error('Fetching Blog filed:', error);
            });
    })
    actions.appendChild(updateBtn);
    actions.appendChild(deleteBtn);

    article.appendChild(actions);

    const allArticles = document.getElementById("blogs");
    allArticles.appendChild(article);
}


const loadListObject = async () => {
    // const storedArticles = localStorage.getItem("myArticlesList");
    // if (typeof storedArticles !== "string") return;
    // const parsedArticles = JSON.parse(storedArticles);
    // parsedArticles.forEach((article) => {
    //     const newArticle = createNewArticle(article._id, article._title, article._image, article._content);
    //     myArticlesList.addArticle(newArticle);
    // });
    await fetch('https://my-brand-nyanja-cyane.onrender.com/blogs/allBlogs', {
        method: 'GET',
    }).then(response => {

        if (response.status == 500 || response.status == 400 || response.status == 404) {
            const p = document.createElement("p");
            p.innerHTML = "No blogs at the moment! "
            p.className = "error";
            document.getElementById('responses').appendChild(p);
        }
        if (response.ok) {
            response.json().then(data => {
                const allBlogs = data;
                console.log(allBlogs);
                document.getElementById("total-blogs").textContent = allBlogs.length;
                renderList(allBlogs);
            })
        } else {
            const p = document.createElement("p");
            p.innerHTML = "An expected error occurred ! "
            p.className = "error";
            document.getElementById('responses').appendChild(p);
            throw new Error('Fetching blogs failed');
        }
    })
        .catch(error => {
            console.error('Fetching messages error:', error);
        });
}


const renderList = (articles) => {
    // const articles = myArticlesList.getArticlesList();
    articles.forEach((article) => {
        buildArticle(article);
    });
}

window.onload = loadListObject();
