import { search, createCharacterArticles, navMenu } from "./utils.js";
const menuIcon = document.querySelector("#menuIcon");
const homeArrow = document.querySelector("#homeArrow");
const charSection = document.querySelector("#charSection");
const searchbar = document.querySelector("#searchbar");
let favorites = JSON.parse(localStorage.getItem("favorites"));
if (favorites !== null) {
    createCharacterArticles(favorites, charSection);
}
homeArrow.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
});
menuIcon.addEventListener("click", () => {
    navMenu();
});
searchbar.addEventListener("click", () => {
    if (searchbar.value === "Search") {
        searchbar.value = "";
    }
});
searchbar.addEventListener("input", () => {
    search(favorites, charSection, searchbar.value);
});
