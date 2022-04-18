function formatTime(value: number) {
  let result: string;
  result = String(value);
  if (value < 10) {
    result = '0' + value;
  }
  return result;
}
function setMonth(value: number) {
  var months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  return months[value];
}
function setDay(value: number) {
  var days = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ];
  return days[value];
}

export function getDate() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = setMonth(currentDate.getMonth());
  var dayOfWeek = setDay(currentDate.getDay());

  return day + ' ' + month + ', ' + dayOfWeek;
}

export function getTime() {
  var currentTime = new Date();
  var hours = formatTime(currentTime.getHours());
  var minutes = formatTime(currentTime.getMinutes());
  return hours + ':' + minutes;
}
