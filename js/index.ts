let charSection: HTMLDivElement = document.querySelector("#charSection")!;
const numberOfPages: number = 43;
let currentPage = 1;
const favorites: character[] = [];

export type character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: Date;
};
// TODO pil för top of page
// favoriter
// css search
//colors och css
//media querys
//form

init(1);

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 10) {
    currentPage++;
    loadMoreCharacters(currentPage);
  }
});

async function init(page: number) {
  const characters = await getCharacters(page);
  createCharacterArticles(characters);
}

async function getCharacters(page: number): Promise<character[]> {
  const response = await fetch(
    "https://rickandmortyapi.com/api/character?page=" + page
  );
  const chars = await response.json();
  return chars.results;
}

async function loadMoreCharacters(page: number) {
  if (page < numberOfPages) {
    const characters = await getCharacters(page);
    createCharacterArticles(characters);
  }
}

export function createCharacterArticles(characters: character[]) {
  characters.forEach((char) => {
    let article = document.createElement("article");
    article.className = "box char";
    article.appendChild(createImageTag(char));
    article.appendChild(createLikeBtn(char));
    article.appendChild(createH2Tag(char));
    article.appendChild(createEpisodeTag(char));
    charSection.appendChild(article);
  });
}
function create20Chars(characters: character[]) {
  for (let i = 0; i < 20; i++) {
    let article = document.createElement("article");
    article.className = "box char";
    article.appendChild(createImageTag(characters[i]));
    article.appendChild(createLikeBtn(characters[i]));
    article.appendChild(createH2Tag(characters[i]));
    article.appendChild(createEpisodeTag(characters[i]));
    charSection.appendChild(article);
  }
}

function createH2Tag(char: character) {
  let h2 = document.createElement("h2");
  h2.innerText = char.name;
  return h2;
}

function createLikeBtn(char: character) {
  let btn = document.createElement("button");
  btn.addEventListener("click", (event) => {
    addToFavorites(event, char);
  });
  btn.className = "favBtn center";
  return btn;
}

function createEpisodeTag(char: character) {
  let div = document.createElement("div");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  div.className = "episode";
  p1.innerText = "Status:";
  p2.innerText = char.status;
  div.appendChild(p1);
  div.appendChild(p2);

  return div;
}

function createImageTag(char: character) {
  let image = document.createElement("img");
  image.src = char.image;
  image.alt = "character image";
  image.className = "box imgchar";

  return image;
}

export function addToFavorites(event: Event, char: character) {
  console.log(event);
  console.log(char);
  favorites.push(char);
  console.log(favorites);
  let btn: HTMLButtonElement = event.target as HTMLButtonElement;
  btn.style.backgroundImage = 'url("/img/heartfilled.png")';
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
