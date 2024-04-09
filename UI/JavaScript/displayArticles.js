import Article from "./article.js";
import ArticlesList from "./articlesList.js";
import Comment from "./comment.js";
import CommentsList from "./commentsList.js";

const myArticlesList = new ArticlesList();
const myArticle = new Article();
const comment = new Comment();
const commentsList = new CommentsList();

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
const createNewComment = (id, author, content, likes, replies) => {
    const comment = new Comment();
    comment.setId(id);
    comment.setAuthor(author);
    comment.setContent(content);
    comment.setLikes(likes);
    comment.setReplies(replies);
    return comment;
}

const buildArticle = (myArticle, id) => {
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
    const likeBtn = document.createElement("img");
    let liked = false;
    likeBtn.addEventListener('click', async () => {
        if (!liked) {
            await fetch(`https://my-brand-nyanja-cyane.onrender.com/blogs/addLike/${myArticle._id}/like`, {
                method: 'POST',
            }).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        liked = true;
                        //loadListObject();
                        location.reload();
                    })
                } else {
                    throw new Error('liking failed');
                }
            })
                .catch(error => {
                    console.error('Fetching messages error:', error);
                });
        }
        else {
            await fetch(`https://my-brand-nyanja-cyane.onrender.com/blogs/unLike/${myArticle._id}/like`, {
                method: 'POST',
            }).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        liked = false;
                        //loadListObject();
                        location.reload();
                    })
                } else {
                    throw new Error('liking failed');
                }
            })
                .catch(error => {
                    console.error('Fetching messages error:', error);
                });
        }
    })
    const likes = document.createElement("span");
    likes.style.fontSize = "larger";
    likes.textContent = myArticle.likes;
    likeBtn.className = "like-btn";
    likeBtn.src = "UI/icons/heart-svgrepo-com.svg";
    likeBtn.alt = "like icon";
    const shareBtn = document.createElement("img");
    shareBtn.className = "share-btn";
    shareBtn.src = "UI/icons/curved-arrow-right-icon.svg";
    shareBtn.alt = "share icon";

    actions.appendChild(likeBtn);
    actions.appendChild(likes);
    actions.appendChild(shareBtn);

    const commentDiv = document.createElement("div");
    commentDiv.className = "add-comment"
    const commentForm = document.createElement("form");
    commentForm.name = "comment-form";
    commentForm.id = "comment-form" + id;
    const commentInput = document.createElement("input");
    commentInput.className = "create-comment";
    commentInput.id = "new-comment";
    comment.className = "new-comment";
    commentInput.type = "text";
    commentInput.maxLength = "100";
    const commentData = {
        author: 'Nyanja',
        content: commentInput.value,
        likes: 0,
        replies: [],
        addedDate: new Date().toISOString() // Assuming you want to include the current date/time
    };
    commentForm.addEventListener('submit', async () => {
        await fetch(`https://my-brand-nyanja-cyane.onrender.com/blogs/addComment/${myArticle._id}/comments`, {
            method: 'POST',
            body: JSON.stringify(commentData)
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    //loadListObject();
                    location.reload();
                })
            } else {
                throw new Error('commenting failed');
            }
        })
            .catch(error => {
                console.error('Fetching blogs error:', error);
            });
    })
    const addCommentBtn = document.createElement("button");
    addCommentBtn.className = "add-comment-btn"
    addCommentBtn.id = "add-comment-btn" + id;
    //addCommentBtn.className = "add-comment-btn";
    addCommentBtn.textContent = "Comment";
    commentForm.appendChild(commentInput);
    commentForm.appendChild(addCommentBtn);
    commentDiv.appendChild(commentForm)
    const comments_section = document.createElement("div");
    comments_section.className = "comments-section";
    const comments_header = document.createElement("h3");
    comments_header.textContent = "Comments";
    comments_section.appendChild(comments_header);
    article.appendChild(actions);
    article.appendChild(commentDiv);
    const comments = myArticle.comments;
    if (comments.length > 0) {
        comments.forEach((comment) => {
            const one_comment = document.createElement("div");
            one_comment.className = "comment";
            const comment_actions = document.createElement("div");
            comment_actions.className = "comment-actions";
            const com_like = document.createElement("img");
            com_like.className = "like-btn";
            com_like.id = "com-like" + id;
            com_like.src = "UI/icons/heart-svgrepo-com.svg";
            const com_reply = document.createElement("img");
            com_reply.className = "reply-btn";
            com_reply.id = "com-reply" + id;
            com_reply.src = "UI/icons/curved-arrow-left-icon.svg";
            comment_actions.appendChild(com_like);
            comment_actions.appendChild(com_reply);
            const com_auth = document.createElement("p");
            com_auth.textContent = comment.author + ":" + comment.content;
            one_comment.appendChild(com_auth);
            one_comment.appendChild(comment_actions);
            comments_section.appendChild(one_comment);
        })
        article.appendChild(comments_section);
    }
    else {
        article.appendChild(comments_section);
        const no_comments = document.createElement("p");
        //no_comments.className = "no-comments";
        no_comments.textContent = "No comments yet !";
        comments_section.appendChild(no_comments);
        article.appendChild(no_comments);
    }
    const allArticles = document.getElementById("blog-section");
    allArticles.appendChild(article);
}


const loadListObject = async () => {
    // const storedArticles = localStorage.getItem("myArticlesList");
    // if (typeof storedArticles !== "string") return;
    // const parsedArticles = JSON.parse(storedArticles);
    // parsedArticles.forEach((article) => {
    //     const newArticle = createNewArticle(article._id, article._title, article._image, article._content);
    //     article._comments.forEach((comment) => {
    //         const newComment = createNewComment(comment._id, comment._author, comment._content, comment._likes, comment._replies);
    //         newArticle.addComment(newComment);
    //     });
    //     // newArticle.setComments(commentsList);
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
            console.error('Fetching blogs error:', error);
        });
}


const renderList = (articles) => {
    // const articles = myArticlesList.getArticlesList();
    let id = 1;
    articles.forEach((article) => {
        buildArticle(article, id);
        id++;
    });
}

window.onload = loadListObject();

// document.addEventListener("readystatechange", (event) => {
//     if (event.target.readyState === "complete") {
//         renderList();
//     }
// });