// после вызова makeArmy()
// i = 10, поэтому при вызове army[j]()
// функция ищет i в лексическом окружении;
// переменная printI после присваивания не зависит от
// i и сохраняет свое значение для каждой итерации цикла

function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let printI = i;
    let shooter = function () {
      // функция shooter
      alert(printI); // должна выводить порядковый номер
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0]();
army[5]();
