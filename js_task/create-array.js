let styles = ["Джаз", "Блюз"]; // 1

styles.push("Рок-н-ролл"); // 2

let middleIndex = Math.round(styles.length / 2 - 1); //3
styles.splice(middleIndex, 1, "Классика");

alert(styles.shift()); //4

styles.unshift("Рэп", "Регги"); //5
