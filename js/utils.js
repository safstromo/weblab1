const favorites = [];
export function createCharacterArticles(characters, charSection) {
    characters.forEach((char) => {
        let article = document.createElement("article");
        article.addEventListener("click", () => {
            window.location.href = `character.html?id=${char.id}`;
        });
        article.className = "box char";
        article.appendChild(createImageTag(char));
        article.appendChild(createLikeBtn(char));
        article.appendChild(createH3(char));
        article.appendChild(createStatus(char));
        charSection.appendChild(article);
    });
}
export function createH3(char) {
    let h3 = document.createElement("h3");
    h3.innerText = char.name;
    h3.className = "charText";
    return h3;
}
function createLikeBtn(char) {
    let btn = document.createElement("button");
    btn.addEventListener("click", (event) => {
        event.stopPropagation();
        addToFavorites(event, char, favorites);
    });
    btn.className = "favBtn center";
    return btn;
}
export function createStatus(char) {
    let div = document.createElement("div");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    div.className = "status";
    p1.innerText = "Status:";
    p2.innerText = char.status;
    div.appendChild(p1);
    div.appendChild(p2);
    return div;
}
export function createImageTag(char) {
    let image = document.createElement("img");
    image.src = char.image;
    image.alt = "character image";
    image.className = "box imgchar";
    return image;
}
export function createSpecies(char) {
    let div = document.createElement("div");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    div.className = "status";
    p1.innerText = "Species:";
    p2.innerText = char.species;
    div.appendChild(p1);
    div.appendChild(p2);
    return div;
}
export function createLocation(char) {
    let div = document.createElement("div");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    div.className = "status";
    p1.innerText = "Last known location:";
    p2.innerText = char.location.name;
    div.appendChild(p1);
    div.appendChild(p2);
    return div;
}
export async function createEpisode(char) {
    let div = document.createElement("div");
    let h4 = document.createElement("h4");
    div.className = "episodes";
    h4.innerText = "Episodes:";
    div.appendChild(h4);
    div = await createEpisodes(char, div);
    return div;
}
async function createEpisodes(char, parentDiv) {
    let list = document.createElement("ul");
    list.className = "episodeList";
    for (const episode of char.episode) {
        let name = await getEpisodeName(new URL(episode));
        let item = document.createElement("li");
        item.innerText = name;
        list.appendChild(item);
    }
    parentDiv.appendChild(list);
    return parentDiv;
}
async function getEpisodeName(url) {
    let response = await fetch(url);
    let episodeData = await response.json();
    return episodeData.episode;
}
function addToFavorites(event, char, favorites) {
    favorites.push(char);
    let btn = event.target;
    btn.style.backgroundImage = 'url("/img/heartfilled.png")';
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
export function goTop() {
    document.documentElement.scrollTop = 0;
}
export function navMenu() {
    let menu = document.querySelector("#nav");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    }
    else {
        menu.style.display = "flex";
    }
}
export function search(charArray, divElement, searchString) {
    let search = charArray.filter((char) => char.name.toLowerCase().match(searchString.toLowerCase()));
    divElement.innerHTML = "";
    createCharacterArticles(search, divElement);
}
