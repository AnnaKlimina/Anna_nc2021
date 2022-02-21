function askPassword(ok, fail) {
  let password = prompt("Password?", "");
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: "Вася",

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },
};

askPassword.bind(user)(user.loginOk, user.loginFail); // решение

// строка askPassword(user.loginOk, user.loginFail); приводит к ошибке,
// потому что происходит потеря контекста. При вызове askPassword(user.loginOk, user.loginFail)
// в качестве аргументов передаются две функции (представленные методами объекта user). При их
// вызове в функции askPassword в качестве this уже выстуает не объект user, а опеределенный в самой функции
// поэтому требуется жесткая привязка контекста, которую обеспечает bind
