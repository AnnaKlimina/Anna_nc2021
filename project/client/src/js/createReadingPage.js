//------------------------ страница чтения книги
async function createReadingPage() {
  let page = document.querySelector(".main-page");
  page.dataset.currentPage = "reading-page";
  page.querySelector(".book-genre-list").remove();
  let fixedButton = page.querySelector(".book-content__header").cloneNode(true);
  fixedButton.classList.add("book-content__fixed-button");
  fixedButton.classList.add("change-page-button");
  fixedButton.dataset.menuLink = "current-book-page";
  page.querySelector(".book-content").prepend(fixedButton);
  Array.from(page.querySelectorAll("button")).forEach((button) => {
    button.remove();
  });
  let [bookName, bookAuthor] = page
    .querySelector(".book-content")
    .dataset.book.split(",");
  let response = await fetch(
    "../../../server/index.php?reading&bookName=" +
      bookName +
      "&bookAuthor=" +
      bookAuthor
  );
  if (response.ok) {
    let text = await response.text();
    page.querySelector(".book-content__content").innerHTML = text;
  } else {
    alert(response.status);
  }
  page.querySelector(".comment-block").remove();
}
