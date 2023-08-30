import { character, createCharacterArticles, navMenu } from "./utils.js";

const searchbar: HTMLInputElement = document.querySelector("#searchbar")!;
const charSection: HTMLDivElement = document.querySelector("#charSection")!;
const homeArrow: HTMLImageElement = document.querySelector("#homeArrow")!;
const menuIcon: HTMLImageElement = document.querySelector("#menuIcon")!;
const numberOfPages: number = 43;
let currentPage = 1;
// charpage: css, mer info
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
  if (searchbar.value === "Search" || searchbar.value === "") {
    if (page < numberOfPages) {
      const characters = await getCharacters(page);
      createCharacterArticles(characters, charSection);
    }
  }
}
searchbar.addEventListener("click", () => {
  if (searchbar.value === "Search") {
    searchbar.value = "";
  }
});

searchbar.addEventListener("input", async () => {
  let searchResult: character[] = await getCharacterSearch(searchbar.value);
  charSection.innerHTML = "";
  createCharacterArticles(searchResult, charSection);
});

async function getCharacterSearch(searchString: string): Promise<character[]> {
  let searchResult: character[] = [];
  let response = await fetch(
    "https://rickandmortyapi.com/api/character/?page=1&name=" + searchString,
  );
  if (!response.ok) {
    console.log("No match");
    return searchResult;
  }
  const result = await response.json();
  result.results.forEach((char: character) => {
    searchResult.push(char);
  });

  for (let i = 1; i < result.info.pages; i++) {
    let response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${i}&name=${searchString}`,
    );
    let result = await response.json();
    result.results.forEach((char: character) => {
      searchResult.push(char);
    });
  }
  return searchResult;
}
