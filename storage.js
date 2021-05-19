class Storage {
  static getSearchedUsersFromStorage() {
    //gel all users
    let users;

    if (localStorage.getItem("searched") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("searched"));
    }

    return users;
  }

  static addSearchedUserRoStorage(username) {
    //add user
    let users = this.getSearchedUsersFromStorage();

    // index of

    if (users.indexOf(username) === -1) {
      users.push(username);
    }
    localStorage.setItem("searched", JSON.stringify(users));
  }

  static clearAllSearchedUsersFromStorage() {
    //clear all users

    localStorage.removeItem("searched");
  }
}
