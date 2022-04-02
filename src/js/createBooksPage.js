//------------------------сетка книг
function sortBooks(books, type) {
  for (let i = books.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      let bookA = books[j][type];
      let bookB = books[j + 1][type];
      if (bookA - bookB < 0) {
        books[j + 1].after(books[j]);
      }
    }
  }
}

function fillBooksPage(books) {
  document.querySelector(".articles-grid").innerHTML = "";
  document.querySelector(".main-page__announcement")?.remove();
  if (!books.length) {
    let block = document.createElement("div");
    block.textContent = "Книг не найдено";
    block.className = "main-page__announcement";
    document.querySelector(".main-page").append(block);
    return;
  }
  for (let i = 0; i < books.length; i++) {
    let newBlock = tmplBookCard.content.cloneNode(true);
    document.querySelector(".articles-grid").append(newBlock);
    newBlock = document.querySelector(".article:last-of-type");

    newBlock.setAttribute(
      "data-book",
      books[i].bookName + "," + books[i].bookAuthor
    );
    newBlock["data-addDate"] = new Date(books[i].addDate);
    newBlock["data-addCount"] = books[i].addCount;

    newBlock.querySelectorAll(".reactions-block__count")[0].textContent =
      books[i].commentCount;
    newBlock.querySelectorAll(".reactions-block__count")[1].textContent =
      books[i].addCount;
    newBlock.querySelector(".article__book-picture").style.backgroundImage =
      `url(` + books[i].img + `)`;
    newBlock.querySelector(".book-header__name").textContent =
      books[i].bookName;
    newBlock.querySelector(".book-header__author").textContent =
      books[i].bookAuthor;
    newBlock.querySelector(".content__main").textContent = books[i].bookContent;
    let genreList = newBlock.querySelector(".article-footer__book-genres");
    for (let genre of books[i].genreList) {
      let item = document.createElement("li");
      item.className = "book-genre-list__item";
      item.textContent = genre;
      genreList.append(item);
    }
  }
}

function createBooksPage(books, currentPage, loadCiteFlag = false) {
  let page = document.querySelector(".main-page");
  page.dataset.currentPage = currentPage;
  page.innerHTML = loadCiteFlag
    ? `<div class="cite-block">
            <div class="cite-block__picture-wrapper">
                <div class="cite-block__picture"></div>
            </div>
            <div class="cite-block__cite-container">
                <cite class="cite-block__cite"></cite>
                <div class="cite-block__resource"></div>
            </div>
        </div>
        <div class="search-block">
          <div class="search-container">
            <div class="form-block__logo logo">
              <span class="logo__text">YourLib</span>
              <svg class="logo__icon" height="25px" width="25px" viewBox="0 0 128 128"><use xlink:href="#book" /></svg>
            </div>
            <div class="search-container__wrapper">
              <input class="search-container__input" value="введите автора или название книги">
              <button class="search-container__button button">Поиск</button>
            </div>
          </div>
          <div class="search-container__checkbox-container checkbox-container">
            <div class="checkbox-container__header">Жанры</div>
            <div class="checkbox-container__wrapper"></div>
            <button  class="checkbox-container__button button">Применить фильтр</button>
          </div>
          <button class="search-block__button button">Показать все книги</button>
          <div class="sort-buttons book-content">
            <div class="book-content__header">Сортировать по</div>
            <button class="book-content__button button" data-button-task="sortByAdds">популярности</button>
            <button class="book-content__button button" data-button-task="sortByDate">новизне</button></div>
        </div>`
    : ``;
  page.innerHTML += `<div class="articles-grid"></div>`;

  if (loadCiteFlag) {
    document.querySelector(".cite-block__picture").style.backgroundImage =
      `url(` + citeBlock.image + `)`;
    document.querySelector(".cite-block__cite").textContent = citeBlock.cite;
    document.querySelector(".cite-block__resource").textContent =
      citeBlock.resource;

    document
      .querySelector(".search-container__button")
      .addEventListener("click", async function (event) {
        let searchValue = document.querySelector(
          ".search-container__input"
        ).value;
        if (searchValue === "") return;
        let response = await fetch(
          "https://my-library-project-server.herokuapp.com/search?book=" +
            searchValue
        );
        let resultBooks;
        if (response.ok) {
          resultBooks = await response.json();
          fillBooksPage(resultBooks);
        } else {
          alert(response.status);
          return;
        }
      });
    for (let genre of genreList) {
      let newBlock = document.createElement("div");
      newBlock.className = "checkbox-container__checkbox-wrapper";
      document.querySelector(".checkbox-container__wrapper").append(newBlock);
      let newCheckbox = document.createElement("input");
      newCheckbox.type = "checkbox";
      newCheckbox.name = genre;
      newCheckbox.className = "checkbox-container__checkbox";
      document
        .querySelector(".checkbox-container__checkbox-wrapper:last-of-type")
        .append(newCheckbox);
      let newLabel = document.createElement("label");
      newLabel.for = genre;
      newLabel.className = "checkbox-container__label";
      newLabel.innerHTML = genre;
      document
        .querySelector(".checkbox-container__checkbox-wrapper:last-of-type")
        .append(newLabel);
    }

    document
      .querySelector(".checkbox-container__button")
      .addEventListener("click", async function (event) {
        let genreArr = Array.from(
          document.querySelectorAll(".checkbox-container__checkbox")
        ).reduce((prev, checkbox) => {
          if (checkbox.checked) prev.push(checkbox.name);
          return prev;
        }, []);
        if (!genreArr.length) return;
        let response = await fetch(
          "https://my-library-project-server.herokuapp.com/filter?genres=" +
            JSON.stringify(genreArr)
        );
        let resultBooks;
        if (response.ok) {
          resultBooks = await response.json();
          fillBooksPage(resultBooks);
        } else {
          alert(response.status);
          return;
        }
      });

    document
      .querySelector(".search-block__button")
      .addEventListener("click", async function (event) {
        document.querySelector(".search-container__input").value =
          "введите автора или название книги";
        Array.from(
          document.querySelectorAll(".checkbox-container__checkbox")
        ).forEach((checkbox) => (checkbox.checked = false));
        let response = await fetch(
          "https://my-library-project-server.herokuapp.com/library"
        );
        let library;
        if (response.ok) {
          library = await response.json();
          fillBooksPage(library);
        } else {
          alert(response.status);
          return;
        }
      });

    document
      .querySelector(".sort-buttons")
      .addEventListener("click", function (event) {
        switch (event.target.dataset?.buttonTask) {
          case "sortByAdds":
            sortBooks(
              document.getElementsByClassName("article"),
              "data-addCount"
            );
            break;
          case "sortByDate":
            sortBooks(
              document.getElementsByClassName("article"),
              "data-addDate"
            );
            break;
        }
      });
  }
  fillBooksPage(books);
}
