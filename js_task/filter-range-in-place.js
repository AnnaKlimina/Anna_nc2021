function filterRangeInPlace(arr, a, b) {
  arr = arr.map((item, index) => {
    if (item < a || item > b) {
      arr.splice(index, 1);
    }
  });
}
