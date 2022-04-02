//------------------------------------ меню открыть - закрыть

let menuIcon = document.querySelector(".page-header__menu-icon");
menuIcon.addEventListener("click", function (event) {
  menuIcon.style.transform =
    menuIcon.style.transform === "rotate(90deg)"
      ? "rotate(0deg)"
      : "rotate(90deg)";
  let list = document.querySelector(".menu-container");
  list.style.width = list.clientWidth === 0 ? "12rem" : 0;
});

document.addEventListener("click", function (event) {
  if (event.target.closest(".authorization-block__icon")) {
    let list = document.querySelector("._user-menu");
    list.style.width = list.clientWidth === 0 ? "12rem" : 0;
  }
});

//------------------------------------ смена страницы
function closeMenu(event) {
  if (
    event.target.classList.contains("menu-list__item") &&
    !event.target.closest(".menu-container")?.classList.contains("_user-menu")
  ) {
    let menuIcon = document.querySelector(".page-header__menu-icon");
    menuIcon.style.transform =
      menuIcon.style.transform === "rotate(90deg)"
        ? "rotate(0deg)"
        : "rotate(90deg)";
  }
  Array.from(document.querySelectorAll(".menu-container")).forEach(
    (menu) => (menu.style.width = 0)
  );
}

async function navigate(event) {
  let newPage =
    event.target.state?.currentPage ??
    event.target.dataset.menuLink ??
    event.currentTarget.dataset.menuLink ??
    event.target.closest(".change-page-button")?.dataset.menuLink;

  document.documentElement.scrollTop = 0;
  let response;
  switch (newPage) {
    case "major-page":
      createMajorPage();
      break;
    case "news-page":
      createNewsPage();
      break;
    case "books-page":
      response = await fetch(
        "https://my-library-project-server.herokuapp.com/library",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
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
    case "current-book-page":
      createCurrentBookPage(
        ...event.target.closest("[data-book]").dataset.book.split(",")
      );
      break;
    case "reading-page":
      createReadingPage();
      break;
    case "sign-in-page":
      showForm("sign-in")(event);
      break;
    case "sign-up-page":
      showForm("sign-up")(event);
      break;
    case "user-library-page":
      response = await fetch(
        "https://my-library-project-server.herokuapp.com/user_library&login=" +
          document.querySelector(".authorization-block__user-login").textContent
      );
      let userLibrary;
      if (response.ok) {
        userLibrary = await response.json();
      } else {
        alert(response.status);
        return;
      }
      createBooksPage(userLibrary, "user-library-page");
      break;
    case "user-settings-page":
      createSettingPage();
      break;
    case "sign-out":
      signOut();
      event.stopImmediatePropagation();
      break;
  }
}

function changePage(event) {
  if (
    event.target.classList.contains("menu-list__item") ||
    event.target.classList.contains("change-page-button") ||
    event.currentTarget.classList.contains("change-page-button") ||
    event.target.closest(".change-page-button")
  ) {
    closeMenu(event);

    let page = document.querySelector(".main-page");

    if (
      page.dataset.currentPage === event.target.dataset.menuLink ||
      page.dataset.currentPage === event.currentTarget.dataset.menuLink
    )
      return;

    navigate(event);
  }
}
