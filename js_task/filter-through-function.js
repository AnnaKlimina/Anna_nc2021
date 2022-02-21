// inBetween и inArray возвращают функции для метода .filter(fn)

function inBetween(a, b) {
  return function (item) {
    return item >= a && item <= b;
  };
}

function inArray(arr) {
  return function (item) {
    return arr.includes(item);
  };
}
