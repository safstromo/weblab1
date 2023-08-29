import { character, createCharacterArticles, navMenu } from "./utils.js";

let menuIcon: HTMLImageElement = document.querySelector("#menuIcon")!;
const homeArrow: HTMLImageElement = document.querySelector("#homeArrow")!;
const charSection: HTMLDivElement = document.querySelector("#charSection")!;
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
