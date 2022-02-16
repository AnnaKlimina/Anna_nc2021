function zeroFirstFormat(value) {
  if (value < 10) {
    value = "0" + value;
  }
  return value;
}

function getDate() {
  var currentDatetime = new Date();
  var day = zeroFirstFormat(currentDatetime.getDate());

  return day;
}

setInterval(function () {
  document.getElementById("calendar-date").innerHTML = getDate();
}, 1000);
