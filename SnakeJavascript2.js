var keyRIGH=0,keyUPUP=1,keyLEFT=2,keyDOWN=3;
var WidthBlocks=20,HeightBlocks=20,BlockSize=20,Difficulty=2;
var firstx,firsty,lastx,lasty;
var selection,length,grow,startlength;
var dir=keyRIGH;
var score=0;
//var board = new Array(WidthBlocks+1);
var speedup, delaytime;
var foodate=false;
var dead=false;
var quit=false;
var drawx,drawy,lastms;
var i,j;
/*var setup = function()
	{
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
	dir=keyRIGH;
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
	//if (keyIsDown)
	//	{
	//		DOWN:	n=keyDOWN; break;
	//		RIGHT:	n=keyRIGH; break;
	//		UP:		n=keyUPUP; break;
	//		LEFT:	n=keyLEFT; break;
	//	}
	if ((n===keyLEFT) || (n===keyUPUP) || (n===keyRIGH) || (n===keyDOWN)) //PROCESS INPUT
		{
		if((n===keyLEFT && dir!==keyRIGH)||(n===keyRIGH && dir!==keyLEFT)||(n===keyDOWN && dir!==keyUPUP)||(n===keyUPUP && dir!==keyDOWN)){dir=n;}
		}
	var tempx=firstx;
	var tempy=firsty;
	if (dir===keyLEFT) {tempx--;}
	if (dir===keyUPUP) {tempy--;}
	if (dir===keyRIGH) {tempx++;}
	if (dir===keyDOWN) {tempy++;}
	if	(tempx<0 || tempx>=WidthBlocks || tempy<0 || tempy>=HeightBlocks)
		{
		dead = true;
		foodate = true;
		}
	else
		{
		n=board[tempx][tempy]; //Out of array?????
		if (n>1) {dead=true;}
		if	(n<=1)	{board[tempx][tempy]=length+1;}
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
				n=board[x][y];
				if (n>high) {firstx=x;firsty=y;high=n;}
				if (n===1)	{lastx=x;lasty=y;}
				if (n>=1)	 {board[x][y]--;}//length++;}
				}
			}
		}
	};

var snakeDraw = function()
	{
	//SDL_FillRect(screen,NULL,cBack);
	background(255, 255, 255);
	noFill();
	for (var y=0;y<HeightBlocks;y++)
		{
		for (var x=0;x<WidthBlocks;x++)
			{
			if (board[x][y]>0) //Snake
				{
				fill(0,0,255);
				}
			if (board[x][y]<0) //Food
				{
				fill(0,255,0);
				}
			if (board[x][y]!==0)
				{
				rect(x*BlockSize,y*BlockSize,BlockSize,BlockSize);
				}
			}
		}
	//SDL_Flip(screen);
	};

var snakeGrow = function()
	{
	if (dead===false)
	{
		for (var y=0;y<HeightBlocks;y++)
			{
			for (var x=0;x<WidthBlocks;x++)
				{
				if	(board[x][y]>=1)	{board[x][y]+=grow;}
				}
			}
		score+=1;
		length+=grow;
		delaytime*=speedup;
		floor(delaytime);
		}
	};
*/
var draw = function()
	{
	/*setup();
	while (!quit)
		{
		reset(Difficulty);
		while (!dead && !quit) //WHILE: ALIVE
			{
			makeFood();
			while (!dead && !foodate && !quit) //WHILE: FOOD NOT EATEN
				{
				snakeDraw();
				while(millis()<lastms+delaytime){i=0;}   
				lastms=millis();
				snakeMove();
				}
			snakeGrow();
			}
		//gameOver();
		}*/
	};