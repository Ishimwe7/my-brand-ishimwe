
const profilepic = document.getElementById("prof-pic");

const setProfile = () => {

    const profile = localStorage.getItem("profile");
    const parsedProfile = JSON.parse(profile);
    profilepic.src = parsedProfile._picture;
}

window.onload = setProfile();