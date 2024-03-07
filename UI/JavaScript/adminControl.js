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


function showContent(contentId) {
    // Hide all content sections
    var contentSections = document.querySelectorAll('.content');
    contentSections.forEach(function (section) {
        section.style.display = 'block';
    });

    // Show the selected content section
    var selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
}