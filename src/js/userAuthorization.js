//--------------------------- проверка формы регистрации

let user = {};
function createWarning(field, text) {
  let element = field.nextElementSibling;
  if (element?.classList.contains("form-block__warning")) {
    return;
  }
  let warning = document.createElement("div");
  warning.className = "form-block__warning";
  warning.innerHTML = text;
  field.after(warning);
  return;
}

function removeWarning(field) {
  let element = field.nextElementSibling;
  if (element?.classList.contains("form-block__warning")) {
    element.remove();
  }
}

async function checkLogin(event) {
  let login = event.target.value;
  if (login === "" || (+login === 0 && !login.includes("0"))) {
    createWarning(event.target, "*Некорректный логин");
    return;
  }
  let response = await fetch(
    "https://my-library-project-server.herokuapp.com/check_exist_login?input=" +
      login
  );
  let check;
  if (response.ok) {
    check = await response.json();
  } else {
    alert(response.status);
    return;
  }
  if (check) {
    createWarning(event.target, "*Этот логин уже используется");
    return;
  }
  removeWarning(event.target);
}

function checkPassword(event) {
  let password = event.target.value;
  if (
    password.length < 8 ||
    password.match(/[\p{Alpha}]/giu) === null ||
    password.match(/[\p{Nd}]/giu) === null
  ) {
    createWarning(
      event.target,
      "*Пароль должен содержать от 8 символов. Обязательны хотя бы одна буква и цифра"
    );
    return;
  }
  removeWarning(event.target);
}

function checkRepeatPassword(attribute) {
  return function (event) {
    if (
      document.querySelector(
        ".form-block[data-appeared-block=" + attribute + "]"
      ).password.value !== event.target.value
    ) {
      createWarning(event.target, "*Ввод не соответствует выбранному паролю");
      return;
    }
    removeWarning(event.target);
  };
}

function checkMail(event) {
  let mail = event.target.value;
  if (
    mail.length === 0 ||
    mail.match(/[^A-Za-z\p{Nd}-]/giu) !== null ||
    mail[0].match(/[^A-Za-z]/giu) !== null ||
    mail[mail.length - 1] === "-"
  ) {
    createWarning(
      event.target.parentNode,
      "*Некорректная локальная часть электронной почты"
    );
    return;
  }
  removeWarning(event.target.parentNode);
}

async function checkLoginOnSubmit(form) {
  let login = form.elements.login.value;
  let response = await fetch(
    "https://my-library-project-server.herokuapp.com/check_exist_login?input=" +
      login
  );
  let check;
  if (response.ok) {
    check = await response.json();
  } else {
    alert(response.status);
    return;
  }
  return !(login === "" || (+login === 0 && !login.includes("0")) || check);
}

function checkPasswordOnSubmit(form) {
  let password = form.elements.password.value;
  return !(
    password.length < 8 ||
    password.match(/[\p{Alpha}]/giu) === null ||
    password.match(/[\p{Nd}]/giu) === null
  );
}

function checkRepeatPasswordOnSubmit(form) {
  return !(form.elements.password.value !== form.elements.repeatPassword.value);
}

function checkMailOnSubmit(form) {
  let mail = form.elements.mail.value;
  return !(
    mail.length === 0 ||
    mail.match(/[^A-Za-z\p{Nd}-]/giu) !== null ||
    mail[0].match(/[^A-Za-z]/giu) !== null ||
    mail[mail.length - 1] === "-"
  );
}

async function authorize(user) {
  let userMenu = document.querySelector("._user-menu").firstElementChild;
  userMenu.innerHTML = `<li class="menu-list__item button" data-menu-link="user-library-page">Моя библиотека</li>
            <li class="menu-list__item button" data-menu-link="user-settings-page">Настройки</li>
            <li class="menu-list__item button" data-menu-link="sign-out">Выйти</li>`;
  let avatar = document.querySelector(".authorization-block");
  avatar.dataset.userState = "authorized";
  avatar.innerHTML =
    `<div class="authorization-block__icon _user-avatar" style="background-image:url(` +
    user.avatar +
    `)"></div>`;
  let userLogin = document.createElement("span");
  userLogin.className = "authorization-block__user-login";
  userLogin.innerHTML = user.login;
  avatar.prepend(userLogin);
  if (
    document.querySelector(".main-page").dataset.currentPage ===
    "current-book-page"
  ) {
    let response = await fetch(
      "https://my-library-project-server.herokuapp.com/check_book?book=" +
        document.querySelector(".book-content").dataset.book +
        "&login=" +
        user.login
    );
    let check;
    if (response.ok) {
      check = await response.json();
    } else {
      alert(response.status);
      return;
    }
    if (check)
      changeAddButton("deleteFromUserLibrary", "Удалить из библиотеки");
  }
}

let form = document.querySelector(".form-block[data-appeared-block = sign-up]");
form.login.onblur = checkLogin;
form.password.onblur = checkPassword;
form.repeatPassword.onblur = checkRepeatPassword("sign-up");
form.mail.onblur = checkMail;

form.submit.addEventListener("click", async function (event) {
  event.preventDefault();
  removeWarning(event.target.parentNode);
  let form = event.target.closest(".form-block");
  if (
    !(
      checkLoginOnSubmit(form) &&
      checkMailOnSubmit(form) &&
      checkPasswordOnSubmit(form) &&
      checkRepeatPasswordOnSubmit(form)
    )
  ) {
    createWarning(
      event.target.parentNode,
      "Форма регистрации заполнена некорректно!"
    );
  } else {
    form.dataset.state = "checkPassed";
    document.querySelector(".authorization-block").dataset.userState =
      "authorized";
    let user = {};
    user.login = form.login.value;
    user.password = form.password.value;
    user.mail = form.mail.value;
    user.avatar = form.avatar.files[0]
      ? form.avatar.files[0]
      : "https://my-library-project-server.herokuapp.com/img/defaultUserAvatar.png";
    user.library = [];
    let response = await fetch(
      "https://my-library-project-server.herokuapp.com/add_user",
      {
        method: "POST",
        mode: "cors",
        dataType: "json",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(),
      }
    );
    user.avatar = form.avatar.files[0]
      ? window.URL.createObjectURL(form.avatar.files[0])
      : "https://my-library-project-server.herokuapp.com/img/defaultUserAvatar.png";
    authorize(user);
    formHandler("sign-up")(event);
  }
});

//--------------------------- проверка формы входа
let signInForm = document.querySelector(
  ".form-block[data-appeared-block = sign-in]"
);
signInForm.submit.addEventListener("click", async function (event) {
  event.preventDefault();
  let response = await fetch(
    "https://my-library-project-server.herokuapp.com/authorize?login=" +
      signInForm.login.value +
      "&password=" +
      signInForm.password.value
  );
  let authorizedUser;
  if (response.ok) {
    authorizedUser = await response.json();
  } else {
    alert(response.status);
    return;
  }

  if (!authorizedUser.length) {
    createWarning(event.target.parentNode, "Неверный логин или пароль!");
    event.stopImmediatePropagation();
    return;
  }
  signInForm.dataset.state = "checkPassed";
  authorize(authorizedUser[0]);
  formHandler("sign-in")(event);
});

//--------------------------- действия при выходе из лк
async function signOut() {
  let userMenu = document.querySelector("._user-menu").firstElementChild;
  userMenu.innerHTML = `
                <li class="menu-list__item button" data-menu-link="sign-in-page">Вход</li>
                <li class="menu-list__item button" data-menu-link="sign-up-page">Регистрация</li>`;
  let avatar = document.querySelector(".authorization-block");
  avatar.dataset.userState = "unauthorized";
  avatar.innerHTML = `<svg class="authorization-block__icon svg-icon button" height="30px" width="30px" viewBox="0 0 128 128">
                    <use xlink:href="#user" />
                </svg>`;
  switch (document.querySelector(".main-page").dataset.currentPage) {
    case "current-book-page":
      changeAddButton("addToUserLibrary", "Добавить в библиотеку");
      break;
    case "user-library-page":
      let response = await fetch(
        "https://my-library-project-server.herokuapp.com/library"
      );
      let library;
      if (response.ok) {
        library = await response.json();
      } else {
        alert(response.status);
        return;
      }
      createBooksPage(library, "books-page", true);
      let loadCiteBlock = new CustomEvent("load-cite-block");
      window.dispatchEvent(loadCiteBlock);
      break;
    case "user-settings-page":
      createMajorPage();
      break;
  }
}
