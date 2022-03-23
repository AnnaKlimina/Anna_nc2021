//------------------------страница книги
function getDate() {
  let months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  let date = new Date();
  return (
    date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear()
  );
}

function changeAddButton(buttonTask, buttonContent) {
  let button = document.querySelector(
    ".book-content__button[data-button-task]"
  );
  button.dataset.buttonTask = buttonTask;
  button.textContent = buttonContent;
}

function addComment(image, author, date, content) {
  let commentContainer = document.querySelector(
    ".comment-block__comment-container"
  );
  let commentBlock = tmplComment.content.cloneNode(true);
  commentContainer.append(commentBlock);
  commentBlock = commentContainer.querySelector(
    ".comment-block__comment:last-of-type"
  );
  commentBlock.querySelector(
    ".comment-block__comment-author-avatar"
  ).style.backgroundImage = "url(" + image + ")";
  commentBlock.querySelector(".content__header-author").textContent = author;
  commentBlock.querySelector(".content__header-date").textContent = date;
  commentBlock.querySelector(".content__main").textContent = content;
}

async function createCurrentBookPage(bookName, bookAuthor) {
  let response = await fetch(
    "../../../server/index.php?bookName=" +
      bookName +
      "&bookAuthor=" +
      bookAuthor
  );
  let bookInfo;
  if (response.ok) {
    bookInfo = await response.json();
  } else {
    alert(response.status);
    return;
  }

  let page = document.querySelector(".main-page");
  page.innerHTML = "";
  page.dataset.currentPage = "current-book-page";

  let newBlock = tmplCurrentBook.content.cloneNode(true);
  page.append(newBlock);
  newBlock = page.querySelector(".book-content");
  newBlock.dataset.book = bookName + "," + bookAuthor;

  let genreList = newBlock.querySelector(".book-genre-list");
  for (let genre of bookInfo.genreList.split(",")) {
    let item = document.createElement("li");
    item.className = "book-genre-list__item";
    item.textContent = genre;
    genreList.append(item);
  }

  newBlock.querySelector(".book-content__picture").style.backgroundImage =
    "url(" + bookInfo.img + ")";
  newBlock.querySelector(".book-header__name").textContent = bookInfo.bookName;
  newBlock.querySelector(".book-header__author").textContent =
    bookInfo.bookAuthor;
  newBlock.querySelector(".book-content__content").textContent =
    bookInfo.bookContent;
  response = await fetch(
    "../../../server/index.php?checkBook=" +
      bookInfo.bookName +
      "," +
      bookInfo.bookAuthor +
      "&login=" +
      document.querySelector(".authorization-block__user-login")?.textContent
  );
  let check;
  if (response.ok) {
    check = await response.json();
  } else {
    alert(response.status);
    return;
  }

  if (check) {
    changeAddButton("deleteFromUserLibrary", "Удалить из библиотеки");
  }

  let addButton = newBlock.querySelector(
    ".book-content__button[data-button-task]"
  );
  addButton.addEventListener("click", async function (event) {
    switch (event.target.dataset.buttonTask) {
      case "addToUserLibrary":
        if (
          document.querySelector(".authorization-block").dataset.userState ===
          "authorized"
        ) {
          let userLogin = document.querySelector(
            ".authorization-block__user-login"
          );
          let formData = new FormData();
          let book = [userLogin.textContent, bookName, bookAuthor];
          formData.append("addToUserLibrary", JSON.stringify(book));

          let response = await fetch(
            "../../../server/index.php?addToUserLibrary",
            {
              method: "POST",
              mode: "cors",
              dataType: "json",
              headers: {
                Accept: "application/json",
              },
              body: formData,
            }
          );

          changeAddButton("deleteFromUserLibrary", "Удалить из библиотеки");
        } else {
          showAnnouncement(
            "Составлять свою библиотеку могут только авторизированные пользователи",
            event
          );
        }
        break;
      case "deleteFromUserLibrary":
        let userLogin = document.querySelector(
          ".authorization-block__user-login"
        );
        let formData = new FormData();
        let book = [userLogin.textContent, bookName, bookAuthor];
        formData.append("deleteFromUserLibrary", JSON.stringify(book));

        let response = await fetch(
          "../../../server/index.php?deleteFromUserLibrary",
          {
            method: "POST",
            mode: "cors",
            dataType: "json",
            headers: {
              Accept: "application/json",
            },
            body: formData,
          }
        );
        changeAddButton("addToUserLibrary", "Добавить в библиотеку");
        break;
    }
  });
  response = await fetch(
    "../../../server/index.php?comments&bookName=" +
      bookName +
      "&bookAuthor=" +
      bookAuthor
  );
  let comments;
  if (response.ok) {
    comments = await response.json();
  } else {
    alert(response.status);
    return;
  }
  for (let i = 0; i < comments.length; i++) {
    addComment(
      comments[i].img,
      comments[i].commentAuthor,
      comments[i].addDate,
      comments[i].commentContent
    );
  }
  document
    .querySelector(".comment-block__button")
    .addEventListener("click", async function (event) {
      let text = document.querySelector(".comment-block__textarea").value;
      if (!text || +text === 0) return;
      if (
        document.querySelector(".authorization-block").dataset.userState ===
        "unauthorized"
      ) {
        showAnnouncement(
          "Комментарии могут оставлять только авторизированные пользователи нашего сайта.",
          event
        );
        return;
      }
      let date = getDate();
      addComment(
        document
          .querySelector(".authorization-block__icon")
          .style.backgroundImage.match(/url\(\"(.+)\"\)/)[1],
        document.querySelector(".authorization-block__user-login").textContent,
        date,
        text
      );

      let formData = new FormData();
      let comment = [
        bookName,
        bookAuthor,
        document
          .querySelector(".authorization-block__icon")
          .style.backgroundImage.match(/url\(\"(.+)\"\)/)[1],
        document.querySelector(".authorization-block__user-login").textContent,
        date,
        text,
      ];
      formData.append("addComment", JSON.stringify(comment));
      let response = await fetch("../../../server/index.php?addComment", {
        method: "POST",
        mode: "cors",
        dataType: "json",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
    });
}
