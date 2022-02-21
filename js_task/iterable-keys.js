let map = new Map();

map.set("name", "John");

let keys = Array.from(map.keys()); //map.keys() возвращает не массив, а итеируемый объект => у него нет методов массива
// чтобы использовать методы массива, нужно использовать Array.from() => тогда мы получаем массив

keys.push("more");
alert(keys);
