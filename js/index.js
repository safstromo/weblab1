import { createCharacterArticles, navMenu } from "./utils.js";
let charSection = document.querySelector("#charSection");
let homeArrow = document.querySelector("#homeArrow");
let menuIcon = document.querySelector("#menuIcon");
const numberOfPages = 43;
let currentPage = 1;
//
//media querys
// Signup: css h2, header, validering css knapp gul
// charpage: css, mer info
//
init(1);
homeArrow.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
});
window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
        currentPage++;
        loadMoreCharacters(currentPage);
    }
});
menuIcon.addEventListener("click", () => {
    navMenu();
});
async function init(page) {
    const characters = await getCharacters(page);
    createCharacterArticles(characters, charSection);
}
async function getCharacters(page) {
    const response = await fetch("https://rickandmortyapi.com/api/character?page=" + page);
    const chars = await response.json();
    return chars.results;
}
async function loadMoreCharacters(page) {
    if (page < numberOfPages) {
        const characters = await getCharacters(page);
        createCharacterArticles(characters, charSection);
    }
}
