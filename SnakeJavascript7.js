var WidthBlocks=20;
var HeightBlocks=20;
var nOfBlocks=(WidthBlocks*HeightBlocks);
var BlockSize=20;
var Difficulty=2;
var firstx,firsty,lastx,lasty;
var selection,length,grow,startlength;
var dir=0;
var score=0;
var speedup, delaytime;
var foodate=false;
var dead=false;
var quit=false;
var drawx,drawy,lastms;
var i,j,n;
var board=[];


var odx = function(invalue) //One Dimension X
    //{return (floor(invalue/WidthBlocks));};
	{invalue -= (invalue%WidthBlocks);
	return (invalue/WidthBlocks);};
	
	
var ody = function(invalue) //One Dimension Y
	{return (invalue%HeightBlocks);};

var od = function (inx,iny) //One Dimesion from two
	{
	if (inx>WidthBlocks) {inx=WidthBlocks;}
	if (iny>HeightBlocks) {iny=HeightBlocks;}
	return ((inx*WidthBlocks)+iny);};

var makeFood = function()
	{
	n=1;
	while (n===1) //MAKE FOOD
		{
		i=round(random()%nOfBlocks);
		if (board[i]===0) {n=0; board[i]=-1;}
		}
	foodate=false;
	dead=false;
	};

var reset = function (selection)
	{
	if (selection<1) {selection=1;}
	if (selection>5) {selection=5;}
	if (selection===1)
		{
		grow=2;
		startlength=3;
		speedup=0.975;
		delaytime=300;
		}
	else if (selection===2)
		{
		grow=3;
		startlength=3;
		speedup=0.9375;
		delaytime=250;
		}
	else if (selection===3)
		{
		grow=4;
		startlength=3;
		speedup=0.9;
		delaytime=200;
		}
	else if (selection===4)
		{
		grow=10;
		startlength=10;
		speedup=1;
		delaytime=150;
		}
	//srand(time(0));
	foodate=false;
	dead=false;
	dir=DOWN;
	score=0;
	drawx = 0;
	drawy = 0;
	length=startlength;
	firsty=startlength-1; //switched firstx and firsty
	firstx=lastx=lasty=0;
	for (i=0;i<nOfBlocks;i++) //CLEAR BOARD
		{
		//fill(0,0,200);
		//rect(odx(i)*BlockSize,ody(i)*BlockSize,BlockSize/2,BlockSize/2);
		board[i]=0; //(rand()%3)%2;
		}
	if (startlength>WidthBlocks) {startlength=WidthBlocks;}
	for  (i=0;i<startlength;i++) //MAKE SNAKE
		{
		board[i]=i+1;
		}
	//makeFood();
	};

var snakeMove = function()
	{
	n=0;
	/*if (keyIsPressed)
		{*/
		if (keyCode===LEFT || keyCode===UP || keyCode===RIGHT || keyCode===DOWN)
			{n=keyCode;}
		/*}*/
	if (n===LEFT || n===UP || n===RIGHT || n===DOWN) //PROCESS INPUT (don't allow opposite direction)
		{
		if((n===LEFT && dir!==RIGHT)||(n===RIGHT && dir!==LEFT)||(n===DOWN && dir!==UP)||(n===UP && dir!==DOWN))
			{dir=n;}
		}
	var tempx=firstx;
	var tempy=firsty;
	if (dir===LEFT)  {tempx--;}
	if (dir===UP)    {tempy--;}
	if (dir===RIGHT) {tempx++;}
	if (dir===DOWN)  {tempy++;}
	if	(tempx<0 || tempx>=WidthBlocks || tempy<0 || tempy>=HeightBlocks)
		{
		dead = true;
		foodate = true;
		}
	else
		{
		var t=0;
		console.log("creating:",tempx,",",tempy,", which is:",od(tempx,tempy));
		t=(board[od(tempx,tempy)]); //Out of array?????
		if (t>1) {dead=true;}
		if	(t<=1) {board[od(tempx,tempy)]=length+1;}
		if	(t===-1) {foodate=1;}
		}
	if (dead===false) //DELETE END
		{
		console.log("deleting end");
		var high = startlength-1;
		//length=0;
		for (i=0; i<nOfBlocks; i++)
			{
			n=board[i];
			if (n>high) {firstx=odx(i);firsty=ody(i);high=n;}
			if (n===1)	{lastx=odx(i);lasty=ody(i);}
			if (n>=1)	 {board[i]--; console.log("subtract");} //length++;}
			}
		}
	else {console.log("im dead");}
	};

var snakeDraw = function()
	{
	stroke(10,0,0,0);
	background(255,255,255);
	fill(150, 200, 250);
	rect(2,2,HeightBlocks*BlockSize-4,WidthBlocks*BlockSize-4);
	//noStroke();
	text(10,10,"HELLO");
	//board[od(4,4)]=1000;
	for (i=0;i<nOfBlocks;i++)
		{
		var t = board[i];
		if (t>0) //Snake                   
			{fill(0,0,255);console.log(t);}
		if (t<0) //Food
			{fill(0,255,0);}
		if (t===0) //Something
			{fill(150, 200, 250);}
		rect(odx(i)*BlockSize,ody(i)*BlockSize,BlockSize,BlockSize);
		}
	console.log("Next Frame");
	};

var snakeGrow = function()
	{
	if (!dead)
		{
		for (i=0;i<nOfBlocks;i++)
			{
			if (board[i]>=1) {board[i]+=grow;}
			}
		score+=1;
		length+=grow;
		delaytime*=speedup;
		floor(delaytime);
		}
	};

var gameOver = function()
	{};

var wait = function(invalue)
	{
	if (invalue<20) {invalue=20;}
	//frameRate(1000/invalue);
	};
    
    


do
    {
    console.log("one");
	if (dead===true) {reset(Difficulty); console.log("dead");}
	wait(delaytime);
	console.log("snkMove()");
	snakeMove();
	snakeDraw();
	console.log("snkDraw()");
	if (foodate)
		{
		console.log("grow");
		snakeGrow();
		makeFood();}
	if (dead) {gameOver(); console.log("oh, no dead!");}
	} while(dead===false);
console.log("two");