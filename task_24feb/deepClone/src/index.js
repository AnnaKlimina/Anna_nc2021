function copyObject(obj, copy = {}) {
  if (typeof obj != "object") {
    console.log("Неверный тип данных! Функция принимает только объекты!");
    return {};
  }
  for (let key in obj) {
    if (typeof obj[key] == "object") {
      copy[key] = copyObject(obj[key]);
    } else copy[key] = obj[key];
  }
  if (obj instanceof Array) return Array.from(Object.values(copy));
  return new obj.constructor(copy);
}
