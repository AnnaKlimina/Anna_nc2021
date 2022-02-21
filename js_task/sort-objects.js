function sortByAge(arr) {
  arr.sort((userA, userB) => {
    return userA.age - userB.age;
  });
}
