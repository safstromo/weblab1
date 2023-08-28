import { createH2Tag, createImageTag, createStatus, } from "./utils.js";
const characterSection = document.querySelector("#character");
const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get("id");
async function createCharacter() {
    if (characterId) {
        const character = await getCharacter(parseInt(characterId));
        characterSection.appendChild(createImageTag(character));
        characterSection.appendChild(createH2Tag(character));
        characterSection.appendChild(createStatus(character));
        // todo add more info
        //
    }
    else {
        characterSection.innerText = "No character ID.";
    }
}
async function getCharacter(characterId) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
    const characterData = await response.json();
    return characterData;
}
createCharacter();
