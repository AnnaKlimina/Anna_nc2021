//---------------------------- обработка модальных окон
function showAnnouncement(text, event) {
  let announcement = document.querySelector(
    ".form-block[data-appeared-block = announcement]"
  );
  announcement.querySelector(".form-block__header").textContent = text;
  showForm("announcement")(event);
}

function formHandler(datasetValue) {
  return function clickHandler(event) {
    if (
      event.target.closest(
        ".form-block[data-appeared-block = " + datasetValue + "]"
      ) &&
      !(
        Array.from(
          document.querySelectorAll(".form-block__button[name=submit]")
        ).some((button) => button === event.target) &&
        event.target.closest(".form-block").dataset.state === "checkPassed"
      ) &&
      !Array.from(
        document.querySelectorAll(".form-block__button[name=cancel]")
      ).some((button) => button === event.target)
    )
      return;
    if (document.querySelector(".form-block[data-state=checkPassed]")) {
      document.querySelector(
        ".form-block[data-state=checkPassed]"
      ).dataset.state = "checkFailed";
    }
    let form = document.querySelector(
      ".form-block[data-appeared-block = " + datasetValue + "]"
    );
    form.hidden = true;
    Array.from(form.querySelectorAll("input")).forEach((input) => {
      input.value = "";
    });
    Array.from(form.querySelectorAll(".form-block__warning")).forEach(
      (warning) => {
        warning.remove();
      }
    );
    if (!document.querySelector(".form-block:not([hidden])")) {
      document
        .querySelector(".page-container__shadow")
        .classList.remove("_active");
      document.body.style.overflowY = "scroll";
      event.preventDefault();
    }
    document.removeEventListener("click", clickHandler);
  };
}

function showForm(datasetValue) {
  return function (event) {
    if (
      (event.type === "copy" && event.target.closest(".form-block")) ||
      event.target.closest(".form-block[data-appeared-block=settings]")
    )
      return;
    if (!event.target.classList.contains(".form-block__registration-link")) {
      event.stopPropagation();
    }
    document.body.style.overflowY = "hidden";
    document.querySelector(".page-container__shadow").classList.add("_active");
    document
      .querySelector(".form-block[data-appeared-block = " + datasetValue + "]")
      .removeAttribute("hidden");
    document.querySelector(
      ".form-block[data-appeared-block = " + datasetValue + "]"
    ).style.top = document.documentElement.scrollTop + 140 + "px";
    // event.preventDefault();
    document.addEventListener("click", formHandler(datasetValue));
  };
}
