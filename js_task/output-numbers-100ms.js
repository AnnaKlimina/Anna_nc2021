function printNumbers(from, to) {
  let counter = from;
  timerId = setTimeout(function f() {
    alert(counter++); // изменяем переменную внешнего лексического окружения
    if (counter < to + 1) {
      setTimeout(f, 1000); //вложенный вызов
    }
  }, 1000);
}

function printNumbers2(from, to) {
  let counter = from;
  timerId = setInterval(function f() {
    alert(counter++);
    if (counter > to) {
      clearInterval(timerId);
    }
  }, 1000);
}
