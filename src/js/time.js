function zero_first_format(value)
{
    if (value < 10){ value='0'+value;}
    return value;
}
function set_month(value){
var months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
return months[value];
}
function set_day(value){
var days = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
return days[value];
}
function date()
{
    var current_datetime = new Date();
    var day = current_datetime.getDate();
    var month = set_month(current_datetime.getMonth());
    var dayOfWeek = set_day(current_datetime.getDay());

    return day+" "+month+", "+ dayOfWeek;
}

function time(){
    var current_datetime = new Date();
    var hours = zero_first_format(current_datetime.getHours());
    var minutes = zero_first_format(current_datetime.getMinutes());
    return hours+":"+minutes;
}



setInterval(function () {
     document.getElementById('current_date').innerHTML = date();}, 1000);

     
setInterval(function () {
    document.getElementById('current_time').innerHTML = time();}, 1000);