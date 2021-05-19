// getting the elements

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const clear = document.getElementById("clear-last-users");
const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners() {
  githubForm.addEventListener("submit", getData);

  clearLastUsers.addEventListener("click", clearAllSearched);
  document.addEventListener("DOMContentLoaded", getAllSearched);
}

function getData(e) {
  let username = nameInput.value.trim();

  if (username === "") {
    alert("bişiler yaz");
  } else {
    github
      .getGithubData(username)
      .then((response) => {
        if (response.user.message === "Not Found") {
          ui.showError("Kullanıcı Bulunamadı.");
        } else {
          ui.addSearchedUserToUI(username);
          Storage.addSearchedUserRoStorage(username);
          ui.showUserInfo(response.user);
          ui.showRepoInfo(response.repo);
        }
      })
      .catch((err) => console.log(err));
  }

  ui.clearInput(); //input clear
  e.preventDefault();
}

function clearAllSearched() {
  if (confirm("Are You Shure?")) {
    Storage.clearAllSearchedUsersFromStorage(); // clear from storage
    ui.clearAllSearchedFromUI();
  }
}

function getAllSearched() {
  //add searched to ul, al from storage
  let users = Storage.getSearchedUsersFromStorage();
  let result = "";

  users.map((user) => {
    result += `<li class="list-group-item">${user}</li>`;
  });

  lastUsers.innerHTML = result;
}
