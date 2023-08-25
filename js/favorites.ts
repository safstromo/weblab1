import { character, createCharacterArticles } from "./utils.js";

const homeArrow: HTMLImageElement = document.querySelector("#homeArrow")!;
const charSection: HTMLDivElement = document.querySelector("#charSection")!;
let favorites: character[] = JSON.parse(localStorage.getItem("favorites")!);

if (favorites !== null) {
  createCharacterArticles(favorites, charSection);
}
homeArrow.addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
});
