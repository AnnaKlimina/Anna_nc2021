function positionAt(anchor, position, elem) {
  let anchorCoords = anchor.getBoundingClientRect();
  switch (position) {
    case "top":
      elem.style.top = anchorCoords.top - elem.offsetHeight + "px";
      elem.style.left = anchorCoords.left + "px";
      break;
    case "right":
      elem.style.top = anchorCoords.top + "px";
      elem.style.left = anchorCoords.right + "px";
      break;
    case "bottom":
      elem.style.top = anchorCoords.bottom + "px";
      elem.style.left = anchorCoords.left + "px";
      break;
  }
}
