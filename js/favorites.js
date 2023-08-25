import { createCharacterArticles } from "./utils.js";
const homeArrow = document.querySelector("#homeArrow");
const charSection = document.querySelector("#charSection");
let favorites = JSON.parse(localStorage.getItem("favorites"));
if (favorites !== null) {
    createCharacterArticles(favorites, charSection);
}
homeArrow.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
});
