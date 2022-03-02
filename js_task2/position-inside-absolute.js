function positionAt(anchor, position, elem) {
  let anchorCoords = anchor.getBoundingClientRect();
  switch (position) {
    case "top-out":
      elem.style.top = anchorCoords.top - elem.offsetHeight + "px";
      elem.style.left = anchorCoords.left + "px";
      break;
    case "top-in":
      elem.style.top = anchorCoords.top + "px";
      elem.style.left = anchorCoords.left + "px";
      break;
    case "right-out":
      elem.style.top = anchorCoords.top + "px";
      elem.style.left = anchorCoords.right + "px";
      break;
    case "right-in":
      elem.style.top = anchorCoords.top + "px";
      elem.style.left = anchorCoords.right - elem.offsetWidth + "px";
      break;
    case "bottom-out":
      elem.style.top = anchorCoords.bottom + "px";
      elem.style.left = anchorCoords.left + "px";
      break;
    case "bottom-in":
      elem.style.top = anchorCoords.bottom - elem.offsetHeight + "px";
      elem.style.left = anchorCoords.left + "px";
      break;
  }
}
