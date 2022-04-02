//------------------------новости
let scrollHandler = debounce(addContentOnScroll);

async function createNewsPage() {
  let page = document.querySelector(".main-page");
  page.dataset.currentPage = "news-page";
  page.innerHTML = `<div class="main-page__background"></div>
            <h1 class="main-page__header" data-news-index="0" data-decor-index="0">Новости</h1>`;
  await addNewsContent();
  document.addEventListener("scroll", scrollHandler);
}

async function addNewsContent() {
  let newsIndex =
    +document.querySelector(".main-page__header").dataset.newsIndex;
  let newsCount = 3;
  let grid = document.createElement("div");
  grid.className = "articles-grid";
  if (document.querySelector("._card-view")) grid.classList.add("_card-view");
  document.querySelector(".main-page").append(grid);
  let response = await fetch(
    "https://my-library-project-server.herokuapp.com/news_content?news_index=" +
      newsIndex +
      "&news_count=" +
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

  let decIndex =
    +document.querySelector(".main-page__header").dataset.decorIndex;
  let decCount = 1;
  response = await fetch(
    "https://my-library-project-server.herokuapp.com/decor_content?decor_index=" +
      decIndex +
      "&decor_count=" +
      decCount
  );

  let newsDecor;
  if (response.ok) {
    newsDecor = await response.json();
  } else {
    alert(response.status);
    return;
  }
  let decor = newsDecor[0];
  decIndex = newsDecor[1];

  if (news.length < newsCount) {
    document.removeEventListener("scroll", scrollHandler);
    return;
  } else {
    document.querySelector(".main-page__header").dataset.newsIndex =
      +document.querySelector(".main-page__header").dataset.newsIndex +
      newsCount;
    document.querySelector(".main-page__header").dataset.decorIndex =
      decIndex === 0
        ? 1
        : +document.querySelector(".main-page__header").dataset.decorIndex +
          decCount;
  }

  let decorBlock = tmplNewsDecor.content.cloneNode(true);
  decorBlock.querySelector(".decoration-block__picture").style.backgroundImage =
    `url(` + decor.img + `)`;
  decorBlock.querySelector(".decoration-block__cite").textContent = decor.cite;
  decorBlock.querySelector(".decoration-block__cite-resource").textContent =
    decor.author;
  grid.after(decorBlock);
}

function debounce(func) {
  let callFlag = true;
  return function (...args) {
    if (!callFlag) return;
    func(...args);
    callFlag = false;
    setTimeout(() => {
      callFlag = true;
    }, 500);
  };
}

async function addContentOnScroll() {
  let documentHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
  if (
    documentHeight -
      window.pageYOffset -
      document.documentElement.clientHeight >
    200
  )
    return;
  await addNewsContent();
}
