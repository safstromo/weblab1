import {
  character,
  createCharacterArticles,
  navMenu,
  search,
} from "./utils.js";

const menuIcon: HTMLImageElement = document.querySelector("#menuIcon")!;
const homeArrow: HTMLImageElement = document.querySelector("#homeArrow")!;
const charSection: HTMLDivElement = document.querySelector("#charSection")!;
const searchbar: HTMLInputElement = document.querySelector("#searchbar")!;
let favorites: character[] = JSON.parse(localStorage.getItem("favorites")!);

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
