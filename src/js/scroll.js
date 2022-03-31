function addContent() {
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
  let data = JSON.parse(jsonData);
  let newCard = document.querySelectorAll(".right-card")[1].cloneNode(true);

  document
    .getElementsByClassName("main-content-grid")[0]
    .insertAdjacentElement("beforeend", newCard);

  let img = newCard.querySelector(".content-block__image");
  img.style.background = data.img;

  let header = newCard.querySelector(".content-block__header");
  header.textContent = data.header;

  let domainLink = newCard.querySelector(
    ".content-block-footer__resource-domain"
  );
  domainLink.textContent = data.domainLink;

  let likes = newCard.querySelector(".content-block-footer__like-count");
  likes.textContent = data.likes;
}

function debounce(func) {
  let callFlag = true;
  return function (...args) {
    if (!callFlag) return;
    func(...args);
    callFlag = false;
    setTimeout(() => {
      callFlag = true;
    }, 50);
  };
}

addContent = debounce(addContent);

window.addEventListener("scroll", addContent);
