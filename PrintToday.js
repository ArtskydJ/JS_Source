var today = new Date();
var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
console.log(day[today.getDay()]
	+ ", " + month[today.getMonth()]
	+ " "  + today.getDate()
	+ ", " + today.getFullYear()
	+ ", " + today.getHours()%12
	+ ":"  + today.getMinutes()
	+ ":"  + today.getSeconds()
)