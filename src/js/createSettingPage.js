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
      "https://my-library-project-server.herokuapp.com/check_password?login=" +
        document.querySelector(".authorization-block__user-login").textContent +
        "&input=" +
        event.target.value
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
        let changeLogin = {
          old: document.querySelector(".authorization-block__user-login")
            .textContent,
          new: event.target.closest(".form-block").login.value,
        };
        response = await fetch(
          "https://my-library-project-server.herokuapp.com/change_login",
          {
            method: "POST",
            mode: "cors",
            dataType: "json",
            headers: {
              Accept: "application/json",
            },
            body: JSON.stringify(changeLogin),
          }
        );

        document.querySelector(".authorization-block__user-login").textContent =
          event.target.closest(".form-block").login.value;
        event.target.closest(".form-block").login.value = "";
        break;

      case "changePassword":
        event.preventDefault();
        response = await fetch(
          "https://my-library-project-server.herokuapp.com/check_password?login=" +
            document.querySelector(".authorization-block__user-login")
              .textContent +
            "&input=" +
            event.target.value
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
        let changePassword = {
          login: document.querySelector(".authorization-block__user-login")
            .textContent,
          newPassword: event.target.closest(".form-block").password.value,
        };
        response = await fetch(
          "https://my-library-project-server.herokuapp.com/change_password",
          {
            method: "POST",
            mode: "cors",
            dataType: "json",
            headers: {
              Accept: "application/json",
            },
            body: JSON.stringify(changePassword),
          }
        );
        event.target.closest(".form-block").oldPassword.value = "";
        event.target.closest(".form-block").password.value = "";
        event.target.closest(".form-block").repeatPassword.value = "";
        break;
    }
  });
}
