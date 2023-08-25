import { character, createCharacterArticles } from "./utils.js";

const charSection: HTMLDivElement = document.querySelector("#charSection")!;
let favorites: character[] = JSON.parse(localStorage.getItem("favorites")!);

if (favorites !== null) {
  createCharacterArticles(favorites, charSection);
}
