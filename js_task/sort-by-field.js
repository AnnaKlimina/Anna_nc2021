// byField должна возвращать функцию сравнения двух
// аргументов,
// аргумент функции byField используется для передачи поля

function byField(fieldName) {
  return function (objA, objB) {
    return objA[fieldName] > objB[fieldName] ? 1 : -1;
  };
}
