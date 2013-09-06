var WidthBlocks=20;
var HeightBlocks=20;
var nOfBlocks=(WidthBlocks*HeightBlocks);
var BlockSize=20;
var Difficulty=2;
var firstx,firsty,lastx,lasty;
var selection,length,grow,startlength;
var dir=RIGHT;
var score=0;
var speedup, delaytime;
var foodate=false;
var dead=true;
var quit=false;
var drawx,drawy,lastms;
var i,j,n;
var board;
debug("test");

var odx = function(invalue) //One Dimension drawing X
	{return (floor(invalue/WidthBlocks)*BlockSize);};
	
var ody = function(invalue) //One Dimension drawing Y
	{return (invalue%WidthBlocks*BlockSize);};

var od = function (inx,iny) //One Dimesion from two
	{
	if (inx<WidthBlocks) {inx=WidthBlocks;}
	if (iny<HeightBlocks) {iny=HeightBlocks;}
	return ((inx*WidthBlocks)+iny);};
	
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
	dir=RIGHT;
	score=0;
	drawx = 0;
	drawy = 0;
	length=startlength;
	firstx=startlength-1;
	firsty=lastx=lasty=0;
	for (i=0;i<nOfBlocks;i++) //CLEAR BOARD
		{
		//fill(0,0,200);
		//rect(odx(i),ody(i),BlockSize/2,BlockSize/2);
		board[i]=0; //(rand()%3)%2;
		}
	if (startlength>WidthBlocks) {startlength=WidthBlocks;}
	for  (i=0;i<startlength;i++) //MAKE SNAKE
		{
		board[i]=i+1;
		}
	};

var makeFood = function()
	{
	n=1;
	while (n) //MAKE FOOD
		{
		i=round(random()%(nOfBlocks-1));
		if (board[i]===0) {n=0; board[i]=-1;}
		}
	foodate=false;
	dead=false;
	};

var snakeMove = function()
	{
	n=0;
	if (keyIsPressed)
		{
		if (keyCode===LEFT || keyCode===UP || keyCode===RIGHT || keyCode===DOWN)
			{n=keyCode;}
		}
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
		t=(board[od(tempx,tempy)]); //Out of array?????       //this line had issues
		if (t>1) {dead=true;}
		if	(t<=1) {board[od(tempx,tempy)]=length+1;}    //this line had issues
		if	(t===-1) {foodate=1;}
		}
	if (dead===false) //GROW
		{
		var high = startlength-1;
		//length=0;
		for	(var x=0;x<WidthBlocks;x++) //this has to stay
			{
			for	(var y=0;y<HeightBlocks;y++) //this has to stay
				{
				n=board[od(x,y)];                           //this line had issues
				if (n>high) {firstx=x;firsty=y;high=n;}
				if (n===1)	{lastx=x;lasty=y;}
				if (n>=1)	 {board[od(x,y)]--;} //length++;}
				}
			}
		}
	};

var snakeDraw = function()
	{
	background(150, 200, 250);
	noStroke();
	text(10,10,"HELLO");
	//board[od(4,4)]=1000;
	for (i=0;i<nOfBlocks;i++)
		{
		var t = board[i];
		if (t>0) //Snake                   
			{fill(0,0,255);debug(t);}
		if (t<0) //Food
			{fill(0,255,0);}
		if (t===0) //Something
			{fill(150, 200, 250);}
		rect(odx(i),ody(i),BlockSize,BlockSize);
		}
	debug("Next Frame");
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
	frameRate(1000/invalue);
	};

var draw = function()
	{
	if (dead) {reset(Difficulty); debug("dead");}
	if (foodate)
		{makeFood(); debug("make food");}
	snakeDraw();
	wait(delaytime);
	snakeMove();
	//debug("move");
	if (foodate)
		{snakeGrow();
		debug("grow");}
	if (dead) {gameOver();}
	};