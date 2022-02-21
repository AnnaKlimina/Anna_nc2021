function throttle(func, ms) {
  let allowFlag = 0;
  let args, context;

  return function () {
    if (allowFlag) {
      // сохранение контекста и параметров функции, котороая проигнорирована, но может быть вызвана
      args = arguments;
      context = this;
      return;
    }
    func.apply(this, arguments);
    allowFlag = 1;
    setTimeout(() => {
      // отложенный вызов для обнуления флага и вызова функции, если котекст и аргументы были сохранены
      allowFlag = 0;
      if (args) {
        func.apply(context, args);
      }
    }, ms);
  };
}
