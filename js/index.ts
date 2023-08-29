import { character, createCharacterArticles, goTop } from "./utils.js";

let charSection: HTMLDivElement = document.querySelector("#charSection")!;
let homeArrow: HTMLImageElement = document.querySelector("#homeArrow")!;
const numberOfPages: number = 43;
let currentPage = 1;
// TODO hamburger till mobil
// 
//
//media querys
// Signup: css h2, header, validering  
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

async function init(page: number) {
  const characters = await getCharacters(page);
  createCharacterArticles(characters, charSection);
}

async function getCharacters(page: number): Promise<character[]> {
  const response = await fetch(
    "https://rickandmortyapi.com/api/character?page=" + page,
  );
  const chars = await response.json();
  return chars.results;
}

async function loadMoreCharacters(page: number) {
  if (page < numberOfPages) {
    const characters = await getCharacters(page);
    createCharacterArticles(characters, charSection);
  }
}
