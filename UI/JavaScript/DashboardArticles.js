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

    const editForm = document.getElementById("edit-article-form");
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
    const edit_title = document.getElementById("edit-title");
    const edit_desc = document.getElementById("edit-content");
    const editId = document.getElementById("edit-articleId");
    const success = document.getElementById('create-success');
    const cerror = document.getElementById('create-error');
    updateBtn.addEventListener('click', () => {
        removeContent();
        editForm.style.display = "grid";
        edit_title.value = myArticle.title;
        edit_desc.value = myArticle.content;
        editId.value = myArticle._id;
        success.textContent = '';
        cerror.textContent = '';
    })
    const token = getToken();
    deleteBtn.addEventListener('click', async () => {
        const del_response = document.createElement('p');
        del_response.className = "del-res";
        del_response.style.width = '200px';
        del_response.style.height = '100px';
        del_response.style.justifyContent = 'center';
        del_response.style.alignItems = 'center';
        del_response.style.position = 'absolute';
        del_response.style.top = '300px';
        del_response.style.left = '500px';
        const showRes = () => {
            del_response.style.display = "flex";
        }
        await fetch(`https://my-brand-nyanja-cyane.onrender.com/blogs/deleteBlog/${myArticle._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.status == 500 || response.status == 400 || response.status == 404) {
                del_response.textContent = "Blog Not found !";
                del_response.style.color = 'red';
                document.getElementById('responses').appendChild(p);
            }
            if (response.ok) {
                response.json().then(data => {
                    const message = data;
                    // alert(message.message);
                    del_response.textContent = message.message;
                    setTimeout(showRes, 3000);
                })
            } else {
                del_response.textContent = "Blog Not Deleted!";
                del_response.style.color = 'red';
                setTimeout(showRes, 3000);
                throw new Error('Deleting blog failed');
            }
        })
            .catch(error => {
                del_response.textContent = "Blog Not deleted. An expected error occurred!";
                del_response.style.color = 'red';
                setTimeout(showRes, 3000);
                console.error('Fetching Blog filed:', error);
            });
        // removeContent();
        // showBlogs('blog-section')
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
