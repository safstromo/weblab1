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
        article.appendChild(createH2Tag(char));
        article.appendChild(createStatus(char));
        charSection.appendChild(article);
    });
}
export function createH2Tag(char) {
    let h2 = document.createElement("h2");
    h2.innerText = char.name;
    return h2;
}
function createLikeBtn(char) {
    let btn = document.createElement("button");
    btn.addEventListener("click", (event) => {
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
function addToFavorites(event, char, favorites) {
    favorites.push(char);
    let btn = event.target;
    btn.style.backgroundImage = 'url("/img/heartfilled.png")';
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
export function goTop() {
    document.documentElement.scrollTop = 0;
}
