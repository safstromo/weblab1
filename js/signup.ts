import { navMenu } from "./utils.js";

let menuIcon: HTMLImageElement = document.querySelector("#menuIcon")!;
const userSection: HTMLDivElement = document.querySelector("#users")!;
const users: user[] = [];

type user = {
  username: string;
  password: string;
  email: string;
};

const signupForm: HTMLFormElement = document.querySelector("#signupForm")!;
const submitBtn: HTMLButtonElement = document.querySelector("#submitBtn")!;

submitBtn.addEventListener("click", addUser);
menuIcon.addEventListener("click", () => {
  navMenu();
});

function addUser(event: Event) {
  event.preventDefault();
  userSection.innerHTML = "";

  const username: HTMLInputElement = document.querySelector("#username")!;
  const password: HTMLInputElement = document.querySelector("#password")!;
  const mail: HTMLInputElement = document.querySelector("#mail")!;

  let newUser = {
    username: username.value,
    password: password.value,
    email: mail.value,
  };

  if (
    newUser.username !== "" && newUser.password !== "" && newUser.email !== ""
  ) {
    createUserTag(newUser);
  }
}

function createUserTag(user: user) {
  let userElement = document.createElement("div");
  userElement.className = "user";
  let header = document.createElement("h2");
  header.innerText = "Created new user:";

  let username = document.createElement("p");
  username.innerText = user.username;

  let password = document.createElement("p");
  password.innerText = user.password;

  let mail = document.createElement("p");
  mail.innerText = user.email;

  userElement.appendChild(header);
  userElement.appendChild(username);
  userElement.appendChild(password);
  userElement.appendChild(mail);
  userSection.appendChild(userElement);
}
