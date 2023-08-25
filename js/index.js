import { createCharacterArticles } from "./utils.js";
let charSection = document.querySelector("#charSection");
const numberOfPages = 43;
let currentPage = 1;
//const favorites: character[] = [];
// TODO pil för top of page
// favoriter
// css search
//colors och css
//media querys
//form
init(1);
window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
        currentPage++;
        loadMoreCharacters(currentPage);
    }
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
