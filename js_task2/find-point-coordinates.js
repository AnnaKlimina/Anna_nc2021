let coords = field.getBoundingClientRect();
let first = [coords.left, coords.top];
let second = [coords.right, coords.bottom];
let third = [coords.left + field.clientLeft, coords.top + field.clientTop]; // добавляем ширину рамки
let forth = [
  coords.left + field.clientLeft + field.clientWidth,
  coords.top + field.clientTop + field.clientHeight,
];
