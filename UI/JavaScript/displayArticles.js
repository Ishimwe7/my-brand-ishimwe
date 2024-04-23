import Article from "./article.js";
import ArticlesList from "./articlesList.js";
import Comment from "./comment.js";
import CommentsList from "./commentsList.js";;


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
const getToken = () => {
    const authToken = sessionStorage.getItem("loggedUser");
    if (typeof authToken !== "string") return;
    const parsedToken = JSON.parse(authToken);
    //console.log(parsedToken.token);
    return parsedToken.token;
}

const getTokenObj = () => {
    const authToken = sessionStorage.getItem("loggedUser");
    if (typeof authToken !== "string") return;
    const parsedToken = JSON.parse(authToken);
    //console.log(parsedToken.token);
    return parsedToken;
}

let myDecodedToken = null;
// async function decode() {
//     const token = getToken();
//     await fetch(`https://my-brand-nyanja-cyane.onrender.com/users/decodeToken`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ token: token })
//     }).then(response => {
//         if (response.ok) {
//             response.json().then(data => {
//                 myDecodedToken = data;
//                 // console.log(myDecodedToken.username);
//                 return myDecodedToken;
//             })
//         }
//     })
//         .catch(error => {
//             console.error('An expected error:', error);
//         });
// }

async function decode() {
    const token = getToken();
    if (token != null) {
        try {
            const response = await fetch(`https://my-brand-nyanja-cyane.onrender.com/users/decodeToken`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            });
            if (response.ok) {
                myDecodedToken = await response.json();
                console.log(myDecodedToken.username);
            } else {
                throw new Error('Failed to decode token');
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
            throw error; // Rethrow the error to be caught by the caller
        }
    }
}


const buildArticle = (myArticle, id) => {
    const token = getToken();
    const article = document.createElement("article");
    const img_desc = document.createElement("div");
    const title_desc = document.createElement("div");
    img_desc.className = "img-desc";
    title_desc.className = "title-desc";
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
    img_desc.appendChild(image);
    title_desc.appendChild(title);
    title_desc.appendChild(content);
    img_desc.appendChild(title_desc);
    article.appendChild(img_desc)

    const actions = document.createElement("div");
    actions.className = "actions";
    const likeBtn = document.createElement("img");
    const unLikeBtn = document.createElement("img");
    unLikeBtn.style.display = "none";
    const usersLiked = myArticle.usersLiked;
    //let userId;

    if (token) {
        const userId = myDecodedToken.id;
        if (userId !== undefined) {
            usersLiked.forEach(userlikedId => {
                if (userlikedId === userId) {
                    likeBtn.style.display = "none";
                    unLikeBtn.style.display = "inline";
                }
                else {
                    unLikeBtn.style.display = "none";
                    likeBtn.style.display = "inline";
                }
            })
        }
    }

    likeBtn.addEventListener('click', async () => {
        await fetch(`https://my-brand-nyanja-cyane.onrender.com/blogs/addLike/${myArticle._id}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    //loadListObject();
                    // likeBtn.style.display = "none";
                    // unLikeBtn.style.display = "inline";
                    location.reload();
                })
            } else {
                window.location.href = "./UI/pages/userLogin.html";
                throw new Error('liking failed');
            }
        })
            .catch(error => {
                console.error('Fetching messages error:', error);
            });
    })

    unLikeBtn.addEventListener('click', async () => {
        await fetch(`https://my-brand-nyanja-cyane.onrender.com/blogs/unLike/${myArticle._id}/like`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    // likeBtn.style.display = "inline";
                    // unLikeBtn.style.display = "none";
                    //loadListObject();
                    location.reload();
                })
            } else {
                console.log("Un liking failed")
                window.location.href = "./UI/pages/userLogin.html";
                throw new Error('unLiking failed');
            }
        })
            .catch(error => {
                console.log("Un liking failed");
                console.error('Fetching messages error:', error);
            });
    })
    const likes = document.createElement("span");
    likes.style.fontSize = "larger";
    likes.textContent = myArticle.likes;
    likeBtn.className = "like-btn";
    likeBtn.src = "UI/icons/heart-svgrepo-com.svg";
    likeBtn.alt = "like icon";
    unLikeBtn.src = "UI/icons/red-heart-11121.svg";
    unLikeBtn.alt = "like icon";
    const shareBtn = document.createElement("img");
    shareBtn.className = "share-btn";
    shareBtn.src = "UI/icons/curved-arrow-right-icon.svg";
    shareBtn.alt = "share icon";

    actions.appendChild(likeBtn);
    actions.appendChild(unLikeBtn);
    actions.appendChild(likes);
    actions.appendChild(shareBtn);
    actions.style.display = "flex";
    actions.style.alignItems = "center";
    const commentDiv = document.createElement("div");
    commentDiv.className = "add-comment"
    const commentForm = document.createElement("form");
    commentForm.name = "comment-form";
    commentForm.id = "comment-form" + id;
    const commentInput = document.createElement("input");
    commentInput.className = "create-comment";
    commentInput.placeholder = "Your comment here"
    commentInput.id = "new-comment" + myArticle._id;
    commentInput.style.color = "black";
    comment.className = "new-comment";
    commentInput.type = "text";
    commentInput.maxLength = "100";

    //console.log(commentForm.id + " " + commentInput.id)
    // const commentData = {
    // };
    const addCommentBtn = document.createElement("button");
    addCommentBtn.className = "add-comment-btn"
    addCommentBtn.id = "add-comment-btn" + myArticle._id;
    //addCommentBtn.className = "add-comment-btn";
    addCommentBtn.textContent = "Comment";
    commentForm.appendChild(commentInput);
    commentForm.appendChild(addCommentBtn);
    commentDiv.appendChild(commentForm);
    const comments_section = document.createElement("div");
    const all_comments = document.createElement("div");
    all_comments.className = "comments";
    comments_section.className = "comments-section";
    const comments_header = document.createElement("h3");
    comments_header.className = "comments-header";
    comments_section.appendChild(comments_header);
    article.appendChild(actions);
    article.appendChild(commentDiv);
    comments_header.addEventListener('click', () => {
        if (all_comments.style.display = "none") {
            all_comments.style.display = "block";
        }
    })

    let author = null;
    if (myDecodedToken != null) {
        author = myDecodedToken.username;
    }
    const comments = myArticle.comments;
    comments_header.textContent = "Comments(" + comments.length + ")";
    if (comments.length > 0) {
        comments.forEach((comment) => {
            const one_comment = document.createElement("div");
            const comlikes = document.createElement("span");
            one_comment.className = "comment";
            const comment_actions = document.createElement("div");
            comment_actions.className = "comment-actions";
            const com_like = document.createElement("img");
            com_like.className = "like-btn";
            com_like.id = "com-like" + id;
            com_like.src = "UI/icons/heart-svgrepo-com.svg";
            const unLikeCommentBtn = document.createElement("img");
            unLikeCommentBtn.style.display = "none";
            unLikeCommentBtn.src = "UI/icons/red-heart-11121.svg";
            unLikeCommentBtn.className = "like-btn";
            comlikes.innerHTML = "<strong>" + comment.likes + "</strong>";
            const usersLikedComment = comment.usersLiked;
            if (token) {
                const userId = myDecodedToken.id;
                // console.log(usersLikedComment[0])
                if (userId !== undefined && usersLikedComment !== undefined) {
                    usersLikedComment.forEach(userlikedId => {
                        if (userlikedId === userId) {
                            com_like.style.display = "none";
                            unLikeCommentBtn.style.display = "inline";
                        }
                        else {
                            unLikeCommentBtn.style.display = "none";
                            com_like.style.display = "inline";
                        }
                    })
                }
            }
            com_like.addEventListener('click', async () => {
                await fetch(`https://my-brand-nyanja-cyane.onrender.com/blogs/likeComment/${myArticle._id}/${comment.id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        response.json().then(data => {
                            console.log("Like added")
                            //location.reload();
                        })
                    } else {
                        window.location.href = "./UI/pages/userLogin.html";
                        throw new Error('liking failed');
                    }
                })
                    .catch(error => {
                        console.error('Liking comment error:', error);
                    });
            })
            unLikeCommentBtn.addEventListener('click', async () => {
                await fetch(`https://my-brand-nyanja-cyane.onrender.com/blogs/unlikeComment/${myArticle._id}/${comment.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        response.json().then(data => {
                            console.log("Like removed")
                            location.reload();
                            console.log("Comment unliked")
                        })
                    } else {
                        window.location.href = "./UI/pages/userLogin.html";
                        throw new Error('unliking failed');
                    }
                })
                    .catch(error => {
                        console.error('unLiking comment error:', error);
                    });
            })

            const com_reply = document.createElement("img");
            com_reply.className = "reply-btn";
            com_reply.id = "com-reply" + id;
            com_reply.src = "UI/icons/curved-arrow-left-icon.svg";
            com_reply.addEventListener('click', () => {
                replyForm.style.display = "block";
            })
            comment_actions.appendChild(com_like);
            comment_actions.appendChild(unLikeCommentBtn);
            comment_actions.appendChild(comlikes);
            comment_actions.appendChild(com_reply);
            const com_auth = document.createElement("p");
            com_auth.innerHTML = "<strong>" + comment.author + "</strong>" + " : " + comment.content;
            const replyForm = document.createElement("form");
            replyForm.className = "reply-form"
            const replyInput = document.createElement("input");
            replyInput.type = "text";
            replyInput.placeholder = "write your reply here ..";
            const replyBtn = document.createElement("button");
            replyBtn.type = "submit";
            replyBtn.textContent = "Add reply";
            replyBtn.className = "add-reply-btn"
            replyForm.appendChild(replyInput);
            replyForm.appendChild(replyBtn);
            replyInput.className = "reply-input";
            const showReplies = document.createElement("h6");
            showReplies.className = "show-replies"

            const comment_replies = comment.replies;

            const repliesContainer = document.createElement("div");
            comment_replies.forEach((com_reply) => {
                const reply = document.createElement("p");
                reply.innerHTML = com_reply.author + " ~ " + com_reply.content;
                repliesContainer.appendChild(reply);
            })

            //  showReplies.textContent = "replies(" + comment_replies.length + ")";
            replyForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const replyContent = replyInput.value.trim();
                if (author != null && replyContent !== '') {
                    await fetch(`https://my-brand-nyanja-cyane.onrender.com/blogs/replyToComment/${myArticle._id}/${comment.id}`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ content: replyContent, author: author }),
                    }).then(response => {
                        if (response.ok) {
                            response.json().then(data => {
                                //loadListObject();
                                console.log("reply added");
                                location.reload();
                            })
                        } else {
                            window.location.href = "./UI/pages/userLogin.html";
                            console.log('replying failed');
                            throw new Error('replying failed');
                        }
                    })
                        .catch(error => {
                            console.log('replying failed');
                            console.error('Fetching blogs error:', error);
                        });
                } else {
                    window.location.href = "./UI/pages/userLogin.html"
                }
            })

            one_comment.appendChild(com_auth);
            one_comment.appendChild(comment_actions);
            one_comment.appendChild(replyForm);
            one_comment.appendChild(showReplies);
            one_comment.appendChild(repliesContainer);
            all_comments.appendChild(one_comment);
        })
        const hideComments = document.createElement("h2");
        hideComments.className = "hide-comments";
        hideComments.textContent = "Hide Comments"
        hideComments.addEventListener('click', () => {
            all_comments.style.display = "none";
        })
        all_comments.appendChild(hideComments);
        comments_section.appendChild(all_comments);
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
    // let author = null;
    // if (myDecodedToken != null) {
    //     author = myDecodedToken.username;
    // }

    commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const commentContent = commentInput.value.trim();
        if (author != null && commentContent !== '') {
            await fetch(`https://my-brand-nyanja-cyane.onrender.com/blogs/addComment/${myArticle._id}/comments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: commentContent, author: author }),
            }).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        //loadListObject();
                        console.log("Comment added");
                        location.reload();
                    })
                } else {
                    window.location.href = "./UI/pages/userLogin.html";
                    console.log('commenting failed');
                    throw new Error('commenting failed');
                }
            })
                .catch(error => {
                    console.log('commenting failed');
                    console.error('Fetching blogs error:', error);
                });
        } else {
            window.location.href = "./UI/pages/userLogin.html"
        }
    })
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
                // console.log(allBlogs);
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


window.onload = (async () => {
    const token = getToken();
    if (token) {
        try {
            await decode(); // Wait for decoding to complete
            if (token && myDecodedToken) { // Check if token and decoded token are available
                loadListObject(); // Start loading the articles
            } else {
                console.error('Token or decoded token is not available.');
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }
    else {
        loadListObject();
    }
})();

//window.onload = loadListObject();

// document.addEventListener("readystatechange", (event) => {
//     if (event.target.readyState === "complete") {
//         renderList();
//     }
// });