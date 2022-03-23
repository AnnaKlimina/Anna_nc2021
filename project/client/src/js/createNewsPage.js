//------------------------новости
function createNewsPage() {
  let page = document.querySelector(".main-page");
  page.dataset.currentPage = "news-page";
  page.innerHTML = `<div class="main-page__background"></div>
            <h1 class="main-page__header">Новости</h1>
            <div class="main-page__add-content-button button" data-click-count-news="0" data-click-count-dec="0">Показать ещё</div>`;
  addNewsContent();
  let button = document.querySelector(".main-page__add-content-button");
  button.addEventListener("click", addNewsContent);
}

async function addNewsContent() {
  let newsIndex = +document.querySelector(".main-page__add-content-button")
    .dataset.clickCountNews;
  let newsCount = 6;
  let grid = document.createElement("div");
  grid.className = "articles-grid";
  if (document.querySelector("._card-view")) grid.classList.add("_card-view");
  document.querySelector(".main-page__add-content-button").before(grid);
  let response = await fetch(
    "../../../server/index.php?newsContent&newsIndex=" +
      newsIndex +
      "&newsCount=" +
      newsCount
  );
  let news;
  if (response.ok) {
    news = await response.json();
  } else {
    alert(response.status);
    return;
  }

  for (let i = 0; i < news?.length; i++) {
    let newsBlock = tmplNewsCard.content.cloneNode(true);
    grid.append(newsBlock);
    newsBlock = grid.querySelector(".article:last-of-type");
    newsBlock.querySelector(".article__link").href = news[i].link;
    newsBlock.querySelector(".link__image").style.backgroundImage =
      `url(` + news[i].img + `)`;
    newsBlock.querySelector(".content__link").href = news[i].link;
    newsBlock.querySelector(".content__header").textContent = news[i].header;
    newsBlock.querySelector(".content__main").textContent = news[i].content;
    newsBlock.querySelector(".article-footer__domain-link").href =
      news[i].domain_link;
    newsBlock.querySelector(".article-footer__domain-link").textContent =
      news[i].domain;
    newsBlock.querySelector(".article-footer__date").textContent = news[i].date;
  }

  let decIndex = +document.querySelector(".main-page__add-content-button")
    .dataset.clickCountDec;
  response = await fetch(
    "../../../server/index.php?newsDecor&decorIndex=" +
      decIndex +
      "&decorCount=1"
  );

  let newsDecor;
  if (response.ok) {
    newsDecor = await response.json();
  } else {
    alert(response.status);
    return;
  }

  if (news.length < newsCount) {
    document.querySelector(".main-page__add-content-button").remove();
    return;
  } else {
    document.querySelector(
      ".main-page__add-content-button"
    ).dataset.clickCountNews = news[news.length - 1].id;
    document.querySelector(
      ".main-page__add-content-button"
    ).dataset.clickCountDec = newsDecor.id;
  }

  let decorBlock = tmplNewsDecor.content.cloneNode(true);
  grid.after(decorBlock);
  decorBlock = document.querySelector(
    ".main-page__add-content-button"
  ).previousElementSibling;
  decorBlock.querySelector(".decoration-block__picture").style.backgroundImage =
    `url(` + newsDecor.img + `)`;
  decorBlock.querySelector(".decoration-block__cite").textContent =
    newsDecor.cite;
  decorBlock.querySelector(".decoration-block__cite-resource").textContent =
    newsDecor.author;
}
