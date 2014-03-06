var today = new Date();
var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
print(day[today.getDay()], ", ", mon[today.getMonth()], " ", today.getDate(),", ", today.getFullYear(), ", ", today.getHours()%12, ":", today.getMinutes(), ":", today.getSeconds());