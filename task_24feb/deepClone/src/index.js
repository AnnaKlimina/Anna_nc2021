function deepClone(obj, copy = {}) {
  if (typeof obj != "object") {
    console.log("Неверный тип данных! Функция принимает только объекты!");
    return {};
  }

  for (let key in obj) {
    if (typeof obj[key] == "object") {
      copy[key] = deepClone(obj[key]);
    } else copy[key] = obj[key];
  }
  if (obj instanceof Array) return Array.from(Object.values(copy));
  if (obj instanceof Date) return new Date(obj);
  return new obj.constructor(copy);
}
