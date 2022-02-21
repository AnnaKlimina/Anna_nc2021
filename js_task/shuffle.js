function shuffle(arr) {
  arr.sort(() => {
    // рандомная сортировка
    return Math.random() - 0.5;
  });
}
