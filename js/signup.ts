import { navMenu } from "./utils.js";

let menuIcon: HTMLImageElement = document.querySelector("#menuIcon")!;
const userSection: HTMLDivElement = document.querySelector("#users")!;

type user = {
  username: string;
  password: string;
  email: string;
};

const signupForm: HTMLFormElement = document.querySelector("#signupForm")!;

signupForm.addEventListener("submit", addUser);
menuIcon.addEventListener("click", () => {
  navMenu();
});

function addUser(event: Event) {
  userSection.innerHTML = "";

  const username: HTMLInputElement = document.querySelector("#username")!;
  const password: HTMLInputElement = document.querySelector("#password")!;
  const mail: HTMLInputElement = document.querySelector("#mail")!;

  if (
    username.value.trim() === "" ||
    password.value.trim() === "" ||
    mail.value.trim() === ""
  ) {
    alert("All fields are required.");
    return;
  }

  if (!password.value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
    alert(
      "Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long.",
    );
    return;
  }

  let newUser = {
    username: username.value,
    password: password.value,
    email: mail.value,
  };

  createUserTag(newUser);
  event.preventDefault();
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
