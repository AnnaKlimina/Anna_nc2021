//------------------------------------ обработка декоративных блоков
function blockAppear(css, modifier) {
  return function () {
    let blocks = Array.from(document.querySelectorAll(css));
    blocks.forEach((block) => {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight >
          block.offsetTop + block.offsetHeight * 0.75 &&
        document.documentElement.scrollTop < block.offsetTop
      ) {
        block.classList.add(modifier);
      }
      if (
        document.documentElement.scrollTop >
          block.offsetTop + block.offsetHeight ||
        document.documentElement.scrollTop +
          document.documentElement.clientHeight <
          block.offsetTop + block.offsetHeight * 0.75
      ) {
        block.classList.remove(modifier);
      }
    });
  };
}

window.addEventListener(
  "scroll",
  blockAppear(".decoration-block", "_appeared")
);

window.addEventListener(
  "scroll",
  blockAppear(".advertisement-block__picture", "_advert-appeared")
);
