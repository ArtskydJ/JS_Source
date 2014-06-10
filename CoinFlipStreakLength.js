var targetStreak = 28 //28 takes ~8 sec, 300 million flips

function addCommas(nStr) { //http://www.mredkj.com/javascript/nfbasic.html
	nStr += ''
	x = nStr.split('.')
	x1 = x[0]
	x2 = x.length > 1 ? '.' + x[1] : ''
	var rgx = /(\d+)(\d{3})/
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2')
	}
	return x1 + x2
}

function randomInt(num) {
	if (num <= 0)
		throw new Error("Cannot generate random number from " + num + ".")
	return Math.floor(Math.random() * Math.floor(num))
}

var streak = 0
var secondLongestStreak = 0
var flip = 2
var lastFlip = 2
var i=0
var name = ["HEADS", "tails"]
for (i=0; streak<targetStreak; i++) {
	lastFlip = flip
	flip = randomInt(2)
	
	if (targetStreak<=12) {
		console.log(name[flip])
		if (lastFlip != flip && streak>secondLongestStreak)
			secondLongestStreak = streak
	}
	
	streak = (lastFlip != flip) ? 1 : streak+1
}

console.log("After %d coin flips, %d was flipped %d times in a row.",
	addCommas(i.toString()), name[flip].toLowerCase(), targetStreak)
if (targetStreak<=12)
	console.log("The second longest streak was " + secondLongestStreak + " flips.")

while(true){

}
