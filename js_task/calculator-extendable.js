// каждая операция - это метод, вызываемый из метода calculate
function Calculator() {
  this.calculate = function (expression) {
    expression = expression.split(" ");
    return this[expression[1]](+expression[0], +expression[2]);
  };

  this.addMethod = function (symbol, operation) {
    this[symbol] = operation;
  };
  this["+"] = (a, b) => a + b;
  this["-"] = (a, b) => a + b;
}
