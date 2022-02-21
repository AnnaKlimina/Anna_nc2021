function getAverageAge(arr) {
  return (
    arr.reduce((prep, item) => {
      // метод на основе элементов выполняет определенные инструкции и возвращает общий результат
      prep += item.age;
      return prep;
    }, 0) / arr.length
  );
}
