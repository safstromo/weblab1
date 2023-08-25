import { createCharacterArticles } from "./utils.js";
const charSection = document.querySelector("#charSection");
let favorites = JSON.parse(localStorage.getItem("favorites"));
if (favorites !== null) {
    createCharacterArticles(favorites, charSection);
}
