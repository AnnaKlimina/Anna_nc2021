//--------------------------------changePage.js
document.body.addEventListener("click", changePage);

document
  .querySelector(".logo")
  .addEventListener("click", changePage, { capture: false });

window.addEventListener(
  "load-cite-block",
  blockAppear(".cite-block", "_translate-on-appear")
);

//--------------------------------modalWindowHandler.js
document.addEventListener("copy", function (event) {
  showAnnouncement("Убедительно просим не копировать данные сайта!", event);
});

//--------------------------------createMajorPage.js
createMajorPage();

//-----------------------------
document.addEventListener("unload", async function () {
  await fetch("https://my-library-project-server.herokuapp.com/closeDB");
});
