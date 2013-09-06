var WidthBlocks=20,HeightBlocks=20,BlockSize=20,Difficulty=2;
var firstx,firsty,lastx,lasty;
var selection,length,grow,startlength;
var dir=RIGHT;
var score=0;
var board;
var speedup, delaytime;
var foodate=false;
var dead=false;
var quit=false;
var drawx,drawy,lastms;
var i,j;
var haveSetup=false;

var setup = function()
    {
	board = new Array(WidthBlocks+1);
	for (i = 0; i < 10; i++)
		{
		board[i] = new Array(HeightBlocks+1);
		}
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
	dir=RIGHT;
	score=0;
	drawx = 0;
	drawy = 0;
	length=startlength;
	firstx=startlength-1;
	firsty=lastx=lasty=0;
	for (i=0;i<WidthBlocks;i++)
		{
		for (j=0;j<HeightBlocks;j++) //CLEAR BOARD
			{
			board[i][j]=0; //(rand()%3)%2;
			}
		}
	if (startlength>WidthBlocks) {startlength=WidthBlocks;}
	for  (i=0;i<startlength;i++) //MAKE SNAKE
		{
		board[i][0]=i+1;
		}
	};

var makeFood = function()
	{
	var n=1;
	while (n) //MAKE FOOD
		{
		i=round(random()%(WidthBlocks-1)+1);
		j=round(random()%(HeightBlocks-1)+1);
		if (board[i][j]===0) {n=0; board[i][j]=-1;}
		}
	foodate=false;
	dead=false;
	};

var snakeMove = function()
	{
	var n=0;
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
		n=0;
		//n=board[tempx][tempy]; //Out of array????? //this line has issues
		if (n>1) {dead=true;}
		//if	(n<=1)	{board[tempx][tempy]=length+1;} //this line has issues
		if	(n===-1) {foodate=1;}
		}
	if (dead===false) //GROW
		{
		var high = startlength-1;
		//length=0;
		for	(var x=0;x<WidthBlocks;x++)
			{
			for	(var y=0;y<HeightBlocks;y++)
				{
				//n=board[x][y];//this line has issues
				if (n>high) {firstx=x;firsty=y;high=n;}
				if (n===1)	{lastx=x;lasty=y;}
				if (n>=1)	 {board[x][y]--;} //length++;}
				}
			}
		}
	};

var snakeDraw = function()
	{
	background(200, 200, 255);
	noFill();
	for (var y=0;y<HeightBlocks;y++)
		{
		for (var x=0;x<WidthBlocks;x++)
			{
			//if (board[x][y]>0) //Snake //this line has issues
			//	{
			//	fill(0,0,255);
			//	}
			//if (board[x][y]<0) //Food //this line has issues i think
			//	{
			//	fill(0,255,0);
			//	}
			//if (board[x][y]!==0) //this line has issues i think
			//	{
			//	rect(x*BlockSize,y*BlockSize,BlockSize,BlockSize);
			//	}
			}
		}
	};

var snakeGrow = function()
	{
	if (dead===false)
		{
		for (var y=0;y<HeightBlocks;y++)
			{
			for (var x=0;x<WidthBlocks;x++)
				{
				//if (board[x][y]>=1) {board[x][y]+=grow;}
				}
			}
		score+=1;
		length+=grow;
		delaytime*=speedup;
		floor(delaytime);
		}
	};

var gameOver = function()
	{};

var draw = function()
	{
	if (!haveSetup)
		{haveSetup=true; setup();}
	if (dead)
		{reset(Difficulty);}
	if (foodate)
		{makeFood();}
	if (!dead)
		{snakeDraw();}
	else
		{gameOver();}
	while(millis()<lastms+delaytime)
		{i=0;}   
	lastms=millis();
	snakeMove();
	if (foodate)
		{snakeGrow();}
	};