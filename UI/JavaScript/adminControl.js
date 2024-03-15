// document.getElementById("add-article").onclick = () => {
//     document.getElementById("create-article-form").style.display = "block";
// }

// var create_article = document.getElementById('add-article');
// var create_div = document.getElementById('create-article-form');
// create_article.addEventListener('click') = (event) => {
//     create_div.style.display = "block";
// }

// var create_article = document.getElementById('add-article');
// var create_div = document.querySelector('#create-article-form');
// function displayForm() {
//     create_div.style.display = "block";
// }


function removeContent() {
    // Hide all content sections
    var contentSections = document.querySelectorAll('.content');
    contentSections.forEach(function (section) {
        section.style.display = 'none';
    });

}

// Show the selected content section
const showCreateArticle = (contentId) => {
    removeContent();
    var selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
}
const showBlogs = (contentId) => {
    removeContent();
    var selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'grid';
    }
}

const showUsers = (contentId) => {
    removeContent();
    var selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
}

const showMessages = (contentId) => {
    removeContent();
    var selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'grid';
    }
}
const showChangeProfile = (contentId) => {
    removeContent();
    var selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'grid';
    }
}


