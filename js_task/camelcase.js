function camelize(str) {
  return str
    .split("-") //разбиваем на массив слов
    .map((element, index) => {
      // возвращает массив, в котором для каждого элемента выполнена функция
      if (index === 0) {
        return element;
      }
      return element[0].toUpperCase() + element.slice(1);
    })
    .join(""); // "склеиваем" массив в строку
}
