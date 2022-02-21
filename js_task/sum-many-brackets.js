function sum(a) {
  let sum = a; // внутренняя переменная, в которой будет аккумулироваться сумма

  function innerFunc(b) {
    sum += b;
    return innerFunc; // работает с переменной из внешнего лексического окружения и возвращает себя (для дальнейших вызовов)
  }

  innerFunc[Symbol.toPrimitive] = (hint) => sum; // так как возвращается функция, нужно определить преобразование к примитиву

  return innerFunc;
}
