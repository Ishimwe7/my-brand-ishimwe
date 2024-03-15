import Profile from "./profile.js";

const form = document.getElementById("change-profile-form");
form.addEventListener(("submit"), (event) => {
    event.preventDefault();
    // const text = document.getElementById("intro");
    const picture = document.getElementById("picture");

    let imageUrl = null;
    const imageReader = new FileReader();
    imageReader.addEventListener('load', () => {
        imageUrl = imageReader.result;
        const profile = new Profile();
        // profile.setText(text.value);
        profile.setPicture(imageUrl);
        localStorage.setItem("profile", JSON.stringify(profile));
        alert("Profile Updated Successfully !!");
        // text.textContent = '';
        picture.value = '';
        location.reload();
    });

    // Read the image file
    imageReader.readAsDataURL(picture.files[0]);
});