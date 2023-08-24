"use strict";
let charSection = document.querySelector("#charSection");
const numberOfPages = 43;
let currentPage = 1;
const favorites = [];
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
    createCharacterArticles(characters);
}
async function getCharacters(page) {
    const response = await fetch("https://rickandmortyapi.com/api/character?page=" + page);
    const chars = await response.json();
    return chars.results;
}
async function loadMoreCharacters(page) {
    if (page < numberOfPages) {
        const characters = await getCharacters(page);
        createCharacterArticles(characters);
    }
}
function createCharacterArticles(characters) {
    characters.forEach((char) => {
        let article = document.createElement("article");
        article.className = "box char";
        article.appendChild(createImageTag(char));
        article.appendChild(createLikeBtn());
        article.appendChild(createH2Tag(char));
        article.appendChild(createEpisodeTag(char));
        charSection.appendChild(article);
    });
}
function create20Chars(characters) {
    for (let i = 0; i < 20; i++) {
        let article = document.createElement("article");
        article.className = "box char";
        article.appendChild(createImageTag(characters[i]));
        article.appendChild(createLikeBtn());
        article.appendChild(createH2Tag(characters[i]));
        article.appendChild(createEpisodeTag(characters[i]));
        charSection.appendChild(article);
    }
}
function createH2Tag(char) {
    let h2 = document.createElement("h2");
    h2.innerText = char.name;
    return h2;
}
function createLikeBtn() {
    let btn = document.createElement("button");
    btn.className = "favBtn center";
    return btn;
}
function createEpisodeTag(char) {
    let div = document.createElement("div");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    div.className = "episode";
    p1.innerText = "Status:";
    p2.innerText = char.status;
    div.appendChild(p1);
    div.appendChild(p2);
    return div;
}
function createImageTag(char) {
    let image = document.createElement("img");
    image.src = char.image;
    image.alt = "character image";
    image.className = "box imgchar";
    return image;
}
