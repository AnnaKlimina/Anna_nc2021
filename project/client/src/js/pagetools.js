//------------------------------------ смена темы

let switchTheme = document.querySelector(".switch-block__color-example");
switchTheme.addEventListener("click", function (event) {
  document.documentElement.classList.toggle("html-warm-theme");
  document.documentElement.classList.toggle("html-cold-theme");
});

//------------------------------------ смена вида

let switchView = document.querySelector(".switch-block__view-example");
switchView.addEventListener("click", function (event) {
  let grids = Array.from(document.querySelectorAll(".articles-grid"));
  grids.forEach((block) => {
    block.classList.toggle("_card-view");
  });
  if (grids.length) {
    switchView.innerHTML = grids[0].classList.contains("_card-view")
      ? '<use xlink:href="#menu" />'
      : '<use xlink:href="#card-view" />';
  }
});

//------------------------------------ изменение поведения и внешнего вида кнопки

document.addEventListener("pointerdown", function (event) {
  if (event.target.tagName === "BUTTON") {
    event.target.classList.add("_pressed");
    event.preventDefault();
  }
});

document.addEventListener("pointerup", function (event) {
  document.querySelector("._pressed")?.classList.remove("_pressed");
});

//------------------------------------ автоперемотка на начало страницы

document.addEventListener("scroll", function (event) {
  if (
    document.documentElement.scrollTop > document.documentElement.clientHeight
  ) {
    document.querySelector(".arrow-on-top__icon").style.display =
      "inline-block";
    if (document.querySelector(".book-content__fixed-button"))
      document.querySelector(".book-content__fixed-button").style.display =
        "inline-block";
  } else {
    document.querySelector(".arrow-on-top__icon").style.display = "none";
    if (document.querySelector(".book-content__fixed-button"))
      document.querySelector(".book-content__fixed-button").style.display =
        "none";
  }
});

document
  .querySelector(".arrow-on-top__icon")
  .addEventListener("click", function () {
    document.documentElement.scrollTop = 0;
  });
