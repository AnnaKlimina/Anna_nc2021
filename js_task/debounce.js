function debounce(func, ms) {
  let allowFlag = 0;
  return function () {
    if (allowFlag) return;
    func.apply(this, arguments);
    allowFlag = 1;
    setTimeout(() => (allowFlag = 0), ms);
  };
}
