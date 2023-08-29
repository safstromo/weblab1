import {
  character,
  createH3,
  createImageTag,
  createStatus,
  navMenu,
} from "./utils.js";

let menuIcon: HTMLImageElement = document.querySelector("#menuIcon")!;
const characterSection: HTMLDivElement = document.querySelector("#character")!;

const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get("id");

async function createCharacter() {
  if (characterId) {
    const character = await getCharacter(parseInt(characterId));
    characterSection.className = "charPageBox box";
    characterSection.appendChild(createImageTag(character));
    characterSection.appendChild(createH3(character));
    characterSection.appendChild(createStatus(character));
    // todo add more info
    //
  } else {
    characterSection.innerText = "No character ID.";
  }
}

async function getCharacter(characterId: number): Promise<character> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${characterId}`,
  );
  const characterData = await response.json();
  return characterData as character;
}
menuIcon.addEventListener("click", () => {
  navMenu();
});

createCharacter();
