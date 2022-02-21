function sumInput() {
  let number;
  let sum = 0;
  do {
    number = prompt("Введите число:", "");
    if (isNaN(+number) || number === "") {
      break;
    }
    sum += +number;
  } while (number !== null && number !== "");
  return sum;
}
