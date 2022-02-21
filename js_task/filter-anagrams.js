function aclean(inputArr) {
  let anagramGroups = new Map();

  inputArr.forEach((word) => {
    let sortedWord = word.toLowerCase().split("").sort().join("");
    if (!anagramGroups.has(sortedWord)) {
      anagramGroups.set(sortedWord, word);
    }
  });

  return Array.from(anagramGroups.values())
    .filter((elem) => elem.length > 1)
    .sort();
}
