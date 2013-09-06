var kbRT=0,kbUP=1,kbLF=2,kbDN=3;
var WidthBlocks=20,HeightBlocks=20;
var firstx,firsty,lastx,lasty;
var selection,length,grow,startlength;
var dir=kbRT;
var score=0;
var board = new Array(WidthBlocks+1);
var speedup, delaytime;
var foodate=false;
var dead=false;
var quit=false;
var drawx,drawy;


var setup = function()
	{
	for (var i = 0; i < 10; i++)
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
	dir=kbRT;
	score=0;
	drawx = 0;
	drawy = 0;
	length=startlength;
	firstx=startlength-1;
	firsty=lastx=lasty=0;
	for (var x=0;x<WidthBlocks;x++)
		{
		for (var y=0;y<HeightBlocks;y++) //CLEAR BOARD
			{
			board[x][y]=0; //(rand()%3)%2;
			}
		}
	if (startlength>WidthBlocks) startlength=WidthBlocks;
	for  (var x=0;x<startlength;x++) //MAKE SNAKE
		{
		board[x][0]=x+1;
		}
	}

var makeFood = function ()
  {
  var n=1;
  while (n) //MAKE FOOD
    {
    var x=round(rand()%(WidthBlocks-1)+1);
    var y=round(rand()%(HeightBlocks-1)+1);
    if (board[x][y]===0) {n=0; board[x][y]=-1;}
    }
  foodate=false;
  dead=false;
  }

var snakeMove = function ()
  {
  var n=0;
  SDL_Event test_event;
  while(SDL_PollEvent(&test_event)) //GET INPUT
    {
    if (test_event.type === SDL_QUIT)
      {
      quit=true;
      }
    if (test_event.key.state === SDL_PRESSED)
      {
      switch (test_event.key.keysym.sym)
        {
        case SDLK_DOWN:  n=kbDN; break;
        case SDLK_RIGHT: n=kbRT; break;
        case SDLK_kbUP:    n=kbUP; break;
        case SDLK_LEFT:  n=kbLF; break;
        }
      }
    }
  if ((n===kbLF) or (n===kbUP) or (n===kbRT) or (n===kbDN)) //PROCESS INPUT
    {
    if((n===kbLF && dir!=kbRT) ||
       (n===kbRT && dir!=kbLF) ||
       (n===kbDN && dir!=kbUP) ||
       (n===kbUP && dir!=kbDN))   dir=n;
    }
  var tempx=firstx;
  var tempy=firsty;
  if (dir===kbLF) tempx--;
  if (dir===kbUP) tempy--;
  if (dir===kbRT) tempx++;
  if (dir===kbDN) tempy++;
  if  (tempx<0 || tempx>=WidthBlocks || tempy<0 || tempy>=HeightBlocks)
    {
    dead = true;
    foodate = true;
    }
  else
    {
    n=board[tempx][tempy]; //Out of array?????
    if (n>1) dead=true;
    if  (n<=1)  board[tempx][tempy]=length+1;
    if  (n===-1) foodate=1;
    }
  if (dead===false) //GROW
    {
    var high = startlength-1;
    //length=0;
    for  (var x=0;x<WidthBlocks;x++)
      {
      for  (var y=0;y<HeightBlocks;y++)
        {
        n=board[x][y];
        if (n>high) {firstx=x;firsty=y;high=n;}
        if (n===1)   {lastx=x;lasty=y;}
        if (n>=1)   {board[x][y]--;}//length++;}
        }
      }
    }
  }

var snakeDraw = function ()
	{
	SDL_FillRect(screen,NULL,cBack);
	drawh = BlockSize;
	draww = BlockSize;
	for (var y=0;y<HeightBlocks;y++)
		{
		for (var x=0;x<WidthBlocks;x++)
			{
			if (board[x][y]>0) //Snake
				{
				drawx = x*BlockSize;
				drawy = y*BlockSize;
				SDL_FillRect(screen , &drawrect , cSnake);
				}
			if (board[x][y]<0) //Food
				{
				drawx = x*BlockSize;
				drawy = y*BlockSize;
				SDL_FillRect(screen , &drawrect , cFood);
				}
			}
		}
	SDL_Flip(screen);
	}

var snakeGrow = function ()
  {
  if (dead===false)
    {
    for (var y=0;y<HeightBlocks;y++)
      {
      for (var x=0;x<WidthBlocks;x++)
        {
        if  (board[x][y]>=1)  {board[x][y]+=grow;}
        }
      }
    score+=1;
    length+=grow;
    delaytime*=speedup;
    floor(delaytime);
    }
  }

/*var gameOver = function ()
  {
  if (!quit)
    quit=(MessageBox(MB_APPLMODAL,"Play Again?","GAME OVER",MB_YESNO|MB_ICONQUESTION)===IkbDNO);
#ifdef DEBUG
  cout<<"quit="<<quit;
#endif
  }*/

var draw = function main = ()
	{
	setup();
	while (!quit)
		{
		reset(Difficulty);
		while (!dead && !quit) //WHILE: ALIVE
			{
			makeFood();
			while (!dead && !foodate && !quit) //WHILE: FOOD NOT EATEN
				{
				snakeDraw();
				for (var i=0; i<delaytime && !quit; i++)
					Delay(1);
				snakeMove();
				}
			snakeGrow();
			}
		//gameOver();
		}
	}