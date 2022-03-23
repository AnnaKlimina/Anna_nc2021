//------------------------главная страница
function fillBookContainer(container, books) {
  for (let i = 0; i < 6; i++) {
    let newBlock = tmplBookMiniCard.content.cloneNode(true);
    container.append(newBlock);
    newBlock = container.lastElementChild;
    newBlock.setAttribute(
      "data-book",
      books[i].bookName + "," + books[i].bookAuthor
    );
    newBlock.querySelector(".container__item-picture").style.backgroundImage =
      "url(" + books[i].img + ")";
    newBlock.querySelector(".book-header__name").textContent =
      books[i].bookName;
    newBlock.querySelector(".book-header__author").textContent =
      books[i].bookAuthor;
  }
}

async function createMajorPage() {
  let page = document.querySelector(".main-page");
  page.dataset.currentPage = "major-page";
  page.innerHTML = `<div class="introduction-block">
                    <h2 class="introduction-block__header">YourLib - бесплатная электронная библиотека</h2>
                    <div class="introduction-block__introduction"></div>
                </div>
                 <section class="news-block">
                    <div class="news-block__header">Новости</div>
                    <a class="news-block__main-news">
                        <div class="news-block__main-news-picture"></div>
                        <h4 class="news-block__main-news-header"></h4>
                    </a>
                    <ul class="news-block__list news-list _scrollbar-transparent">
                        <li class="news-list__item">
                            <div class="news-list__button change-page-button button" data-menu-link="news-page">Показать больше</div>
                        </li>
                    </ul>
                </section>

                <section class="books-block">
                    <section class="card-container">
                        <h2 class="card-container__header">Популярное</h2>
                        <div class="card-container__container container _scrollbar-transparent"></div>
                    </section>

                    <section class="card-container">
                        <h2 class="card-container__header">Новинки</h2>
                        <div class="advertisement-block">
                            <div class="advertisement-block__content">
                                <h3 class="book-header change-page-button" data-menu-link="current-book-page">
                                    <span class="book-header__name"></span>
                                    <span class="book-header__author"></span>
                                </h3>
                                <p class="advertisement-block__content-text"></p>
                            </div>
                            <div class="advertisement-block__picture"></div>
                        </div>
                        <div class="card-container__container container _scrollbar-transparent"></div>
                    </section>
                    <div class="books-block__button change-page-button button" data-menu-link="books-page">Перейти в каталог >>></div>`;

  let response = await fetch("../../../server/index.php?news&main_page");
  if (response.ok) {
    let news = await response.json();
    let mainNews = news[0];
    page.querySelector(".introduction-block__introduction").textContent =
      introductionContent;
    page.querySelector(".news-block__main-news").href = mainNews["link"];
    page.querySelector(".news-block__main-news-picture").style.backgroundImage =
      "url(" + mainNews.img + ")";
    page.querySelector(".news-block__main-news-header").textContent =
      mainNews.header;
    let newsList = page.querySelector(".news-list");
    for (let i = 1; i < 7; i++) {
      let newBlock = tmplNewsMiniCard.content.cloneNode(true);
      newsList.prepend(newBlock);
      newBlock = newsList.querySelector(".news-list__item");
      newBlock.querySelector(".news-list__link").href = news[i].link;
      newBlock.querySelector(".news-list__link").style.backgroundImage =
        "url(" + news[i].img + ")";
      newBlock.querySelector(".news-list__link-header").textContent =
        news[i].header;
    }
  } else {
    alert(response.status);
    return;
  }
  response = await fetch("../../../server/index.php?popular&books&main_page");
  if (response.ok) {
    let books = await response.json();
    fillBookContainer(page.querySelector(".card-container__container"), books);
  } else {
    alert(response.status);
  }
  response = await fetch("../../../server/index.php?new&books&main_page");
  if (response.ok) {
    let books = await response.json();
    fillBookContainer(
      page.querySelectorAll(".card-container__container")[1],
      books
    );
  } else {
    alert(response.status);
  }
  let advertBlock = page.querySelector(".advertisement-block");
  advertBlock
    .querySelector(".change-page-button")
    .setAttribute("data-book", newBook.bookName + "," + newBook.bookAuthor);
  advertBlock.querySelector(".book-header__name").textContent =
    newBook.bookName;
  advertBlock.querySelector(".book-header__author").textContent =
    newBook.bookAuthor;
  advertBlock.querySelector(".advertisement-block__content-text").textContent =
    newBook.bookContent;
  advertBlock.querySelector(
    ".advertisement-block__picture"
  ).style.backgroundImage = "url(" + newBook.image + ")";
}
