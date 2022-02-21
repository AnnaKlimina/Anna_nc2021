// .set() и .decrease() - это методы счетчика, имеющие одно лексическое
// окружение

function makeCounter() {
  function counter() {
    return counter.count++;
  }

  counter.set = function (value) {
    this.count = value;
    return this.count;
  };

  counter.decrease = function () {
    return this.count--;
  };

  counter.count = 0;

  return counter;
}
