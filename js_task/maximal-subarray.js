// на каждом непрерывном отрезке запоминается максимальная сумма подряд идущих элементов
// как только промежуточная сумма sum становится отрицательной, переменная обнуляется

function getMaxSubSum(arr) {
  let sum = 0;
  let maxSum = 0;
  for (let element of arr) {
    sum += element;
    maxSum = Math.max(maxSum, sum);
    if (sum < 0) {
      sum = 0;
    }
  }
  return maxSum;
}
