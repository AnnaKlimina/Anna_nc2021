//------------------------страница настроек пользоателя

async function createSettingPage() {
  let page = document.querySelector(".main-page");
  page.dataset.currentPage = "user-settings-page";
  page.innerHTML = "";
  page.append(tmplSettingForm.content.cloneNode(true));
  let settingForm = page.querySelector(
    ".form-block[data-appeared-block=settings]"
  );
  document.getElementById("changeAvatarForm").elements.login.value =
    document.querySelector(".authorization-block__user-login").textContent;
  settingForm.login.onblur = checkLogin;
  settingForm.oldPassword.onblur = async function (event) {
    let response = await fetch(
      "../../../server/index.php?checkPassword=" +
        JSON.stringify([
          document.querySelector(".authorization-block__user-login")
            .textContent,
          event.target.value,
        ])
    );
    let check;
    if (response.ok) {
      check = await response.json();
    } else {
      alert(response.status);
      check = false;
    }
    if (!check) {
      createWarning(event.target, "Неправильный пароль");
      return;
    }
    removeWarning(event.target);
  };
  settingForm.password.onblur = checkPassword;
  settingForm.repeatPassword.onblur = checkRepeatPassword("settings");
  settingForm.addEventListener("click", async function (event) {
    if (event.target.tagName !== "BUTTON") return;
    let field = event.target.closest("fieldset");
    let response;
    let formData;
    switch (event.target.name) {
      case "changeAvatar":
        if (!event.target.closest(".form-block").avatar.files) return;
        document.querySelector(
          ".authorization-block__icon"
        ).style.backgroundImage =
          "url(" +
          window.URL.createObjectURL(
            event.target.closest(".form-block").avatar.files[0]
          ) +
          ")";
        break;

      case "changeLogin":
        event.preventDefault();
        if (!checkLoginOnSubmit(field)) return;
        formData = new FormData();
        formData.append(
          "changeLogin",
          JSON.stringify([
            document.querySelector(".authorization-block__user-login")
              .textContent,
            event.target.closest(".form-block").login.value,
          ])
        );
        response = await fetch("../../../server/index.php?changeLogin", {
          method: "POST",
          mode: "cors",
          dataType: "json",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });

        document.querySelector(".authorization-block__user-login").textContent =
          event.target.closest(".form-block").login.value;
        event.target.closest(".form-block").login.value = "";
        break;

      case "changePassword":
        event.preventDefault();
        response = await fetch(
          "../../../server/index.php?checkPassword=" +
            JSON.stringify([
              document.querySelector(".authorization-block__user-login")
                .textContent,
              event.target.value,
            ])
        );
        let check;
        if (response.ok) {
          check = await response.json();
        } else {
          alert(response.status);
          check = false;
        }
        if (
          !(
            checkPasswordOnSubmit(field) &&
            checkRepeatPasswordOnSubmit(field) &&
            check
          )
        )
          return;
        formData = new FormData();
        formData.append(
          "changePassword",
          JSON.stringify([
            document.querySelector(".authorization-block__user-login")
              .textContent,
            event.target.closest(".form-block").password.value,
          ])
        );
        response = await fetch("../../../server/index.php?changePassword", {
          method: "POST",
          mode: "cors",
          dataType: "json",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });
        event.target.closest(".form-block").oldPassword.value = "";
        event.target.closest(".form-block").password.value = "";
        event.target.closest(".form-block").repeatPassword.value = "";
        break;
    }
  });
}
