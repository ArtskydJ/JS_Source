//Tetris
//Joseph Dykstra
//Finished 01-04-2013

//Dimensions / Graphics
var blksz  = 4;
var fwidth  = 10;
var fheight = 25;
var TitleX = 35;
var SX     = 94;
var SY     = 61;
var msgX   = 0;
var msgY   = 56;
var defaultmode    = 0;
var previewPieces  = 6;
//Timing (all *10)
var waitGravity     = 5;
var waitDisp        = 18;
var waitSlowMove    = 3;
var waitFastMove    = 0;
var waitRotateAgain = 3;
var waitHardDrop    = 3;
var waitLock        = 2;
var fastRepeat      = 5;
//Buttons
var BTNCENTER = 0;
var BTNEXIT = 1;
var BTNRIGHT = 2;
var BTNLEFT = 3;
var BtnMoveL  = BTNCENTER;
var BtnMoveR  = BTNEXIT;
var BtnRotate = BTNRIGHT;
var BtnDrop   = BTNLEFT;
//Move()
var dwn = 0;
var lft = 1;
var rht = 2;
//var sty 3
//Drop
var dropHard  = 1; //Normal
var dropSoft  = 2; //Normal
var dropWHard = 3; //Wait
//Tetriminos
var Itet = 0;
var Jtet = 1;
var Ltet = 2;
var Otet = 3;
var Stet = 4;
var Ttet = 5;
var Ztet = 6;
var prob = 7;


//                 GLOBAL CONSTANTS
var allowDbg[5]={0,0,0,0,0};
var tet[8][28]={{0,1,2,3,2,2,2,2},{1,1,1,1,0,1,2,3},{0,1,2,3,1,1,1,1},{2,2,2,2,0,1,2,3},{0,1,2,2,1,1,1,2},{1,1,1,0,0,1,2,2},{0,1,2,0,1,1,1,0},{1,1,1,2,0,1,2,0},{0,0,1,2,2,1,1,1},{0,1,1,1,0,0,1,2},{0,1,2,2,1,1,1,0},{1,1,1,2,0,1,2,2},{1,1,2,2,0,1,0,1},{1,1,2,2,0,1,0,1},{1,1,2,2,0,1,0,1},{1,1,2,2,0,1,0,1},{2,1,1,0,1,1,2,2},{0,0,1,1,0,1,1,2},{2,1,1,0,0,0,1,1},{1,1,2,2,0,1,1,2},{0,1,1,2,1,1,2,1},{1,1,0,1,0,1,1,2},{0,1,1,2,1,1,0,1},{1,1,2,1,0,1,1,2},{0,1,1,2,1,1,2,2},{0,0,1,1,2,1,1,0},{0,1,1,2,0,0,1,1},{1,1,2,2,2,1,1,0}};


//                 GLOBAL VARIABLES
var alive         =0;
var prevQuadClear =0;
var highMade      =0;
var floorKickUsed =0;

//START  ARRAYS
var area[fwidth][fheight+2]; //Two hidden rows
var chnc[8];
var nextPiece[previewPieces];
// END   ARRAYS

var showDisp      =0;
var viewDbg       =0;
var gametype      =0;
var gamespeed     =0;
var delaytime     =0;
var lockDelay     =0;
var prevRht       =0;
var prevLft       =0;
var prevDrp       =0;
var prevRot       =0;
var currentPiece  =0;
var currentRotate =0;
var tetLR         =0;
var tetUD         =0;
var drop          =0;
var prevWaited    =0;
var speedup     =0;
var score        =0;
var msg        ="";
var disp       ="";
var accesshigh ="";


//                 SUBROUTINES
void selectGame(var INfastmode)
  {
  prevQuadClear=false;
  prevRht=0;
  prevLft=0;
  score=0;
  disp="";
  accesshigh="Tet";
  if (INfastmode) //debugging
    {
    gamespeed=0;
    gametype=2;
    }
  else
    {
    while (ButtonPressed(BTNRIGHT)==false)
      {
      gamespeed=senseButton(gamespeed,false,1,2,false);
      ClearScreen();
      Text(TitleX,LCD_LINE1,"TETRIS", 0);
      Text(2, LCD_LINE2,"Speed:", 0);
      Text(2, LCD_LINE3,"Slow",   0);
      Text(2, LCD_LINE4,"Medium", 0);
      Text(2, LCD_LINE5,"Fast",   0);
      Text(88,LCD_LINE8,"OK",     0);
      Rect(0,40-(gamespeed*8),49,8,0);
      Wait(50);
      }
    Text(TitleX,LCD_LINE1,"TETRIS",  0);
    until (ButtonPressed(BTNRIGHT)==false) {}
    while (ButtonPressed(BTNRIGHT)==false)
      {
      gametype=senseButton(gametype,false,1,4,false);
      ClearScreen();
      Text(TitleX,LCD_LINE1,"TETRIS",   0);
      Text(2, LCD_LINE2,"Type:",    0);
      Text(2, LCD_LINE3,"Giveaway", 0);
      Text(2, LCD_LINE4,"Simple",   0);
      Text(2, LCD_LINE5,"Normal",   0);
      Text(2, LCD_LINE6,"Hard",     0);
      Text(2, LCD_LINE7,"Death",    0);
      Text(88,LCD_LINE8,"OK", 0);
      Rect(0,40-(gametype*8),49,8,0);
      Wait(50);
      }
    }
  Text(TitleX,LCD_LINE1,"TETRIS",  0);
  until (ButtonPressed(BTNRIGHT)==false) {}
  //
  if      (gamespeed==0)
    {
    accesshigh=StrCat(accesshigh,"Slow");
    speedup=0.975;
    delaytime=800;
    }
  else if (gamespeed==1)
    {
    accesshigh=StrCat(accesshigh,"Med");
    speedup=0.9375;
    delaytime=600;
    }
  else if (gamespeed==2)
    {
    accesshigh=StrCat(accesshigh,"Fast");
    speedup=0.9;
    delaytime=400;
    }
  if      (gametype==0)
    {
    accesshigh=StrCat(accesshigh,"Give.dat");
    chnc[Itet]=2;
    chnc[Jtet]=1;
    chnc[Ltet]=1;
    chnc[Otet]=2;
    chnc[Stet]=0;
    chnc[Ttet]=1;
    chnc[Ztet]=0;
    chnc[prob]=7;
    }
  else if (gametype==1)
    {
    accesshigh=StrCat(accesshigh,"Simp.dat");
    chnc[Itet]=3;
    chnc[Jtet]=1;
    chnc[Ltet]=1;
    chnc[Otet]=3;
    chnc[Stet]=1;
    chnc[Ttet]=2;
    chnc[Ztet]=1;
    chnc[prob]=12;
    }
  else if (gametype==2)
    {
    accesshigh=StrCat(accesshigh,"Norm.dat");
    chnc[Itet]=1;
    chnc[Jtet]=1;
    chnc[Ltet]=1;
    chnc[Otet]=1;
    chnc[Stet]=1;
    chnc[Ttet]=1;
    chnc[Ztet]=1;
    chnc[prob]=7;
    }
  else if (gametype==3)
    {
    accesshigh=StrCat(accesshigh,"Hard.dat");
    chnc[Itet]=2;
    chnc[Jtet]=3;
    chnc[Ltet]=3;
    chnc[Otet]=2;
    chnc[Stet]=4;
    chnc[Ttet]=3;
    chnc[Ztet]=4;
    chnc[prob]=21;
    }
  else if (gametype==4)
    {
    accesshigh=StrCat(accesshigh,"Death.dat");
    chnc[Itet]=1;
    chnc[Jtet]=3;
    chnc[Ltet]=3;
    chnc[Otet]=2;
    chnc[Stet]=4;
    chnc[Ttet]=2;
    chnc[Ztet]=4;
    chnc[prob]=19;
    }
  else if (gametype==5) //DEBUG ONLY
    {
    accesshigh=StrCat(accesshigh,"Debug.dat");
    chnc[Itet]=0;
    chnc[Jtet]=1;
    chnc[Ltet]=0;
    chnc[Otet]=2;
    chnc[Stet]=0;
    chnc[Ttet]=0;
    chnc[Ztet]=1;
    chnc[prob]=4;
    }
  ClearScreen();
  }

//  ______   ______   ______   ______   ______   ______   ______   ______
//  |__  _|  |__  _|  |__  _|  |__  _|  |__  _|  |__  _|  |__  _|  |__  _|
//  _  ||    _  ||    _  ||    _  ||    _  ||    _  ||    _  ||    _  ||
//  \\_//    \\_//    \\_//    \\_//    \\_//    \\_//    \\_//    \\_//
//   \_/      \_/      \_/      \_/      \_/      \_/      \_/      \_/

var move(var INdir, var INud)
  {
  var canMove=0;
  var addLR  =0;
  var addUD  =0;
  var tempLR =0;
  var tempUD =0;
  if      (INdir==dwn) addUD=-1;
  else if (INdir==lft) addLR= 1;
  else if (INdir==rht) addLR=-1;
  for (var i=0; i<4; i++)
    {
    tempLR=tet[currentPiece+currentRotate][i  ]+tetLR+addLR;
    tempUD=tet[currentPiece+currentRotate][i+4]+INud +addUD;
    if ((tempLR>=0)&&(tempLR<fwidth)&&(tempUD>=0)) //&&(tempUD<fheight)
      {canMove+=(area[tempLR][tempUD]);}
    else canMove++;
    }
  //NumOut(0,16,canMove,0);
  //Wait(500);
  return (canMove==0); //canMove in:  0123  0123
  }                    //canMove out: 1000  TFFF


var rotate()
  {
  var canRotate=1, addRot=0, tempLR, tempUD, addUD, addLR;
  if (currentRotate>=3) addRot=-3;
  else                  addRot=1;
  for (var i=0; (i<3 && canRotate>0); i++)
    {
    if (i==0) addUD= 0;  //1st  Level
    if (i==1) addUD=-1;  //2nd  D
    if (i==2) addUD= 1;  //3rd  U
    if (i==3) addUD=-2*(currentPiece*4==Itet);  //4th D if I tetromino
    if (i==4) addUD= 2*(currentPiece*4==Itet);  //5th U if I tetromino
    for (var j=0; (j<5 && canRotate>0); j++)
      {
      if (j==0) addLR= 0;  //1st  Center
      if (j==1) addLR=-1;  //2nd  L
      if (j==2) addLR= 1;  //3rd  R
      if (j==3) addLR=-2*(currentPiece*4==Itet);  //4th L if I tetromino
      if (j==4) addLR= 2*(currentPiece*4==Itet);  //5th R if I tetromino
      canRotate=0;
      for (var k=0; k<4; k++)
        {
        tempLR=tet[currentPiece+currentRotate+addRot][k  ]+tetLR+addLR;
        tempUD=tet[currentPiece+currentRotate+addRot][k+4]+tetUD+addUD;
        if ((tempLR>=0)&&(tempUD>=0)&&(tempLR<fwidth)&&(tempUD<fheight+2)&&(tetUD>0))
          {canRotate+=(area[tempLR][tempUD]);}
        else {canRotate++;}
        }
      }
    }
  if (canRotate==0)
    {
    //if (!(addUD>0 && floorKickUsed==true))
      //{
      tetLR+=addLR;
      tetUD+=addUD;
      //if (addUD>0) floorKickUsed=true;
      //}
    }
  return (canRotate==0);
  }


void displayTetromino(var varet,var INrot, var INlr, var INud, var INdrawMode)
  {
  var tempLR,tempUD;
  for (var i=0; i<4; i++)
    {
    tempLR=INlr+(tet[varet+INrot][i  ])*blksz;
    tempUD=INud+(tet[varet+INrot][i+4])*blksz;
    if      (INdrawMode==0) Rect(tempUD,tempLR,blksz,blksz,32);
    else if (INdrawMode==1) Rect(tempUD,tempLR,blksz,blksz,0);
    else if (INdrawMode==2) Ellipse(tempUD+blksz/2,tempLR+blksz/2,blksz/2-1,32);
    }
  }

// BEGIN  _ _        __
//         |     /  /  \
//         |    /   |  |
//        _|_  /    \__/
//       ================

var inputOutput(var INallowInput, var INallowOutput, var INallowDraw, var INwaited)
  {
  var temppiecemoving=true; //return this
  var refresh=0; //refresh the screen: 0=no, 1=piece, 2=score+piece, 3=everything
  
//INPUT
//INPUT
  if (INallowInput)
    {
    if (ButtonPressed(BtnDrop))
      {
      lockDelay=0;
      if (prevDrp<waitHardDrop)
        {drop=dropWHard;}  //Fast = Hard Drop
      else
        {drop=dropSoft;} //Hold = Soft Drop
      prevDrp++;
      }
    else
      {
      prevDrp=0;
      if (drop==dropWHard) {drop=dropHard; lockDelay=waitLock;}
      else                 {drop=0;}
      }
    if (ButtonPressed(BtnRotate))
      {
      if (prevRot==0)
        {
        if (rotate())
          {
          lockDelay=0;
          refresh=2;
          currentRotate++;
          if (currentRotate>=4) currentRotate=0;
          }
        }
      prevRot++;
      if (prevRot>waitRotateAgain) prevRot=0;
      }
    else
      {
      prevRot=0;
      }
    if (ButtonPressed(BtnMoveL))
      {
      prevLft++;
      if ((prevLft>=waitSlowMove || prevLft<0) && move(lft,tetUD))
        {
        lockDelay=0;
        if (prevLft<0) prevLft=0;
        else prevLft=waitSlowMove-waitFastMove;
        tetLR++;
        refresh=2;
        }
      }
    else
      {
      prevLft=-5;
      }
    if (ButtonPressed(BtnMoveR))
      {
      prevRht++;
      if ((prevRht>=waitSlowMove || prevRht<0) && move(rht,tetUD))
        {
        lockDelay=0;
        if (prevRht<0) prevRht=0;
        else prevRht=waitSlowMove-waitFastMove;
        tetLR--;
        refresh=2;
        }
      }
    else
      {
      prevRht=-5;
      }
    }
    
//OUTPUT
//OUTPUT
  if (INallowOutput) //Gravity and Drop
    {
    if (drop==dropHard)                                                   //HARD DROP
      {
      var tempLoop=true;
      while (tempLoop)
        {
        if (move(dwn,tetUD))
          {
          tetUD--;
          score+=2;
          }
        else
          {
          tempLoop=false;
          lockDelay++;
          if (lockDelay>=waitLock) temppiecemoving=false;
          }
        }
      refresh=3;
      drop=0;
      }
    if ((INwaited%waitGravity<=prevWaited%waitGravity) || drop==dropSoft) //SOFT DROP or GRAVITY
      {
      if (drop==dropSoft)
        {
        score++;
        }
      if (refresh==0) refresh=1;
      if (move(dwn,tetUD)) {tetUD--;}
      else {lockDelay++;}
      if (lockDelay>=waitLock) {temppiecemoving=false; lockDelay=0;}
      drop=0;
      }
    prevWaited=INwaited;
    if (score>readHigh(accesshigh))
      {
      writeHigh(accesshigh,score);
      highMade=true;
      }
    }
    
//DRAW
//DRAW
  if (INallowDraw)                      //refresh the screen:
    {                                   //0=nothing   //1=piece   //2=area   //3=everything
    if      (refresh==1) Rect(tetUD*blksz,tetLR*blksz,blksz*5,blksz*4,36); //Fill+Invert
    else if (refresh==2) Rect(0,0,fheight*blksz,fwidth*blksz,36); //Fill+Invert
    else if (refresh==3) ClearScreen();
    var tempUD=tetUD;
    var tempLoop=1;
    //Ghost Piece
    while (tempLoop)
      {
      if (move(dwn,tempUD)) {tempUD--;}
      else
        {
        //tetUD++;
        tempLoop=false;
        displayTetromino(currentPiece,currentRotate,tetLR*blksz,tempUD*blksz,2);
        }
      }
    //AREA
    LineOut(0, fwidth*blksz+1,99,fwidth*blksz+1,0);
    var i;
    var j;
    for (i=0; i<fheight; i++)
      {
      for (j=0; j<fwidth; j++)
        {
        if (area[j][i]) Rect(i*blksz,j*blksz,blksz,blksz,32); //replace 32 W/ area[j][i]*28+4
        }
      }
    //NEXT PIECES / MESSAGE

    for (i=0; i<previewPieces/((disp!="")+1); i++)
      {              //    tet      rot       lr           ud                                  draw
      displayTetromino(nextPiece[i], 0, 63-4*blksz, 78-(4*blksz*i)+(nextPiece[i]==Otet*4)*blksz, 1);
      }
    if (showDisp>0&&disp=="")
      {
      Text(msgX,msgY,"       ",0);
      showDisp=0;
      }
    if (disp!="")
      {
      Text(msgX,msgY,disp,0);
      showDisp++;
      if (showDisp==0) refresh=2;
      if (showDisp>waitDisp) disp="";
      }
    //CURRENT TETROMINO / SCORE
    LineOut(92,fwidth*blksz+1,92,63,0);
    displayTetromino(currentPiece,currentRotate,tetLR*blksz,tetUD*blksz,1);
    RotatedNumbersOut(SX,SY,score);
    }

  return temppiecemoving;
  }


//  END   _ _        __
//         |     /  /  \
//         |    /   |  |
//        _|_  /    \__/
//       ================


void initArrays()
  {
  for (var i=0; i<fheight; i++)
    {
    for (var j=0; j<fwidth; j++)
      {
      area[j][i]=0;
      }
    }
  for (var i=0; i<3; i++)
    {
    var pieceToCreate=prob;
    var rndm=Random(chnc[prob]);
    var add=0;
    for (var j=0; (j<=Ztet)&&(pieceToCreate==prob); j++)
      {
      add+=chnc[j];
      if (add>rndm) pieceToCreate=j*4;
      }
    if (pieceToCreate==prob)
      {
      ClearScreen();
      Text(0,24,StrCat("add  ",NumToStr(add) ),0);
      Text(0,16,StrCat("rndm ",NumToStr(rndm)),0);
      Text(0,00,"piece create err",0);
      Wait(1000);
      }
    nextPiece[i]=pieceToCreate;
    }
  showDisp      =0;
  viewDbg       =0;
  gametype      =0;
  gamespeed     =0;
  delaytime     =0;
  lockDelay     =0;
  prevRht       =0;
  prevLft       =0;
  prevDrp       =0;
  prevRot       =0;
  currentPiece  =0;
  currentRotate =0;
  tetLR         =0;
  tetUD         =0;
  drop          =0;
  prevWaited    =0;
  speedup       =0;
  score        =0;
  msg        ="";
  disp       ="";
  accesshigh ="";
}


void resetVars()
  {
  lockDelay      = 0;
  prevRht        = 0;
  prevLft        = 0;
  prevDrp        = 0;
  prevRot        = 0;
  currentRotate  = 0;
  prevWaited     = 0;
  currentRotate  = 0;
  drop           = 0;
  lockDelay      = 0;
  floorKickUsed  = 0;
  tetLR=fwidth/2-2;
  tetUD=fheight;
  }


var pieceCreate()
  {
  var pieceToCreate=prob;
  var rndm=Random(chnc[prob]);
  var add=0;
  for (var j=0; (j<=Ztet)&&(pieceToCreate==prob); j++)
    {
    add+=chnc[j];
    if (add>rndm) pieceToCreate=j*4;
    }
  if (pieceToCreate==prob)
    {
    ClearScreen();
    Text(0,24,StrCat("add  = ",NumToStr(add)) ,0);
    Text(0,16,StrCat("rndm = ",NumToStr(rndm)),0);
    Text(0,00,"piece create err",0);
    Wait(1000);
    }
  currentPiece=nextPiece[0];
  for (var i=1; i<previewPieces; i++)
    {
    //PlayTone(1000,500);Wait(500);
    nextPiece[i-1]=nextPiece[i];
    }
  nextPiece[previewPieces-1]=pieceToCreate;
  }


void pieceSetvaro()
  {
  var tempLR,tempUD;
  for (var i=0; i<4; i++)
    {
    tempLR=tet[currentPiece+currentRotate][i  ]+tetLR;
    tempUD=tet[currentPiece+currentRotate][i+4]+tetUD;
    area[tempLR][tempUD]=1;
    }
  }
  
  
var clearFullRows()
  {
  var blocksInRow=0;
  var numOfFilledLines=0;
  var i,j,k;
  for (i=0; i<fheight+2; i++)           //Check All Rows
    {
    blocksInRow=0;
    for (j=0; j<fwidth; j++)            //Add up blocks in row
      {
      blocksInRow+=(area[j][i]);
      }
    if (blocksInRow==fwidth&&i<fheight)  //If the row is full)
      {
      for (k=i; k<fheight; k++)         //Move higher rows down
        {
        for (j=0; j<fwidth; j++)
          {
          var temp=area[j][k];
          //SendResponseNumber(9,temp);
          area[j][k]=area[j][k+1];
          }
        }
      i--; //redo row if it gets destroyed
      numOfFilledLines++;
      }
    else if (blocksInRow>0&&i>=fheight)
      {
      alive=false;
      }
    }

  //add to score
  if      (numOfFilledLines==1)    {score+=100; prevQuadClear=false; disp="Single!";}
  else if (numOfFilledLines==2)    {score+=300; prevQuadClear=false; disp="Double!";}
  else if (numOfFilledLines==3)    {score+=500; prevQuadClear=false; disp="Triple!";}
  else if (numOfFilledLines==4)
  {if (prevQuadClear) {score+=400;} score+=800; prevQuadClear=true;  disp="Tetris!";}
  return numOfFilledLines;
  }

  
var gameEnd()
  {
  disp="GamOvr!";
  inputOutput(0,0,1,0);
  var plyagn=false;
  Wait(2500);
  ClearScreen();
  if (highMade) writeHighName(accesshigh,score);
  ClearScreen();
  Text(TitleX,LCD_LINE1,"TETRIS",  0);
  Text(0,LCD_LINE4,StrCat("S:",NumToStr(score)),0);
  Text(0,LCD_LINE5,StrCat("HS:",NumToStr( readHigh(accesshigh) )),0);
  msg=readHighName(accesshigh);
  Text(0,LCD_LINE6,StrCat("N:",msg),0);
  Text(5,LCD_LINE8,"Yes  Again?  No",0);
  until (ButtonPressed(BTNLEFT)==false
     && ButtonPressed(BTNRIGHT)==false) {}
  until (ButtonPressed(BTNLEFT)==true
     || ButtonPressed(BTNRIGHT)==true)  {}
  plyagn=ButtonPressed(BTNLEFT)==true;
  until (ButtonPressed(BTNLEFT)==false
     && ButtonPressed(BTNRIGHT)==false) {}
  return plyagn;
  }

// BEGIN  _    __   __          __
//       | \  |    |  )  |  |  /  \
//       | |  |--  |-<   |  |  |  __
//       |_/  |__  |__)  \__/  \__/
//      ============================
/*
void debugStream(var INvar)
  {
  var insideLoop=0;
  for (var i=0;i<5&&!insideLoop;i++) //check if any debugs are allowed
    {
    insideLoop+=allowDbg[i];
    }
  if (insideLoop)                   //if any are...
    {
    insideLoop=true;
    while (insideLoop)              //go to the next allowed one.
      {
      if (allowDbg[viewDbg]) insideLoop=false;
      if (insideLoop==true)  viewDbg++;
      if (viewDbg>=5)        viewDbg=0;
      }
    var str1="";
    var str2="";
    var str3="";
    var str4="";
    var str5="";
    var msg1="";
    var msg2="";
    var msg3="";
    var msg4="";
    var msg5="";
    var result;
    if      (viewDbg==0)
      {
      str1=disp;
      str2=accesshigh;
      str3=NumToStr(speedup);
      str4=NumToStr(INvar); //  i/wait
      msg1="  dsp ";
      msg2="  ahi ";
      msg3="  sdp ";
      msg4="    i ";
      }
    else if (viewDbg==1)
      {
      str1=NumToStr(score);
      str2=NumToStr(gametype);
      str3=NumToStr(gamespeed);
      str4=NumToStr(delaytime);
      str5=NumToStr(lockDelay);
      msg1="  sc ";
      msg2="  gt ";
      msg3="  gs ";
      msg4="  dt ";
      msg4="  lD ";
      }
    else if (viewDbg==2)
      {
      str1=NumToStr(prevWaited);
      str2=NumToStr(prevLft);
      str3=NumToStr(prevRht);
      str4=NumToStr(prevDrp);
      str5=NumToStr(prevRot);
      msg1="  pW ";
      msg2="  pL ";
      msg3="  pR ";
      msg4="  pD ";
      msg5="  pR ";
      }
    else if (viewDbg==3)
      {
      str1=NumToStr(currentPiece);
      str2=NumToStr(currentRotate);
      str3=NumToStr(tetLR);
      str4=NumToStr(tetUD);
      msg1="  cP ";
      msg2="  cR ";
      msg3="  tL ";
      msg4="  tU ";
      }
    else if (viewDbg==4)
      {
      str1=NumToStr(drop);
      str2=NumToStr(alive);
      str3=NumToStr(prevQuadClear);
      str4=NumToStr(highMade);
      msg1="  dp ";
      msg2="  lv ";
      msg3="  pQ ";
      msg4="  hM ";
      }
    result=StrCat(msg1,str1,msg2,str2,msg3,str3,msg4,str4,msg5,str5);
    SendResponsevar(9,result);
    Wait(60);
    }
  }


void debug(var INmode)
  {
  prevQuadClear=false;
  prevLft=0;
  prevRht=0;
  selectGame(1);
  initArrays();
  score=Random(var_MAX-10000)+10000;
  ClearScreen();
  
  if (INmode==2) //ClearFullRows()
    {
    for (var i=0; i<fheight; i++)
      {
      for (var j=0; j<fwidth; j++)
        {
        area[j][i]=(Random(8)!=0);
        }
      }
    //PlayTone(1000,800);Wait(1000);
    inputOutput(false,false,true,0);
    Wait(3000);
    var i=clearFullRows();
    ClearScreen();
    Wait(250);
    inputOutput(false,false,true,0);
    NumOut(0,48,i,0);
    while(1){}
    }
    
  else if (INmode==3) //displayTetromino()
    {
    var tets,angl,k;
    for (tets=0; tets<7; tets++)
      {
      for (angl=0; angl<4; angl++)
        {
        ClearScreen();
        displayTetromino(tets*4,angl,0,0,0);
        Wait(500);
        until (!ButtonPressed(3)){}
        }
      }
    }

  else if (INmode==4) //peiceSetvaro()
    {
    pieceCreate();
    tetUD=10;
    pieceSetvaro();
    inputOutput(false,false,true,0);
    Wait(3000);
    debugStream(0);
    ClearScreen();
    displayTetromino(currentPiece,currentRotate,tetLR*blksz,tetUD*blksz,1);
    Wait(500);
    inputOutput(false,false,true,0);
    Wait(3000);
    }
  else if (INmode==5) //peiceCreate()
    {
    while (1)
      {
      pieceCreate();
      ClearScreen();
      NumOut(0,48,currentPiece,4096);
      NumOut(0,40,nextPiece[0],4096);
      NumOut(0,32,nextPiece[1],4096);
      NumOut(0,24,nextPiece[2],4096);
      Wait(400);
      }
    }
  else if (INmode==6) //gravity
    {
    pieceCreate();
    while(1)
      {
      ClearScreen();
      inputOutput(false,false,true,0);
      Wait(1000);
      tetUD--;
      }
    }
  }
*/
//  END   _    __   __          __
//       | \  |    |  )  |  |  /  \
//       | |  |--  |-<   |  |  |  __
//       |_/  |__  |__)  \__/  \__/
//      ============================
  
//Modes:
//0  normal
//1  fast
//2  debug clearFullRows()
//3  dubug rotation
//4  debug peiceSetvaro()
//5  debug peiceCreate()
//6  debug gravity in inputOutput()
  
task main()
  {
  var mode=defaultmode;
  /*while (!ButtonPressed(3))
    {
    mode=senseButton(mode,true,1,6,false);
    NumOut(48,0,mode,0);
    }
  until (!ButtonPressed(3)) {}*/
  if (mode==0||mode==1)
    {
    SetvarAbort(true);
    var playagain=true;
    var piecemoving;
    while (playagain)
      {
      ClearScreen();
      selectGame(1);
      initArrays();
      selectGame(mode);
      alive=true;
      while (alive)
        {
        resetVars();
        pieceCreate();
        piecemoving=move(dwn,tetUD); //If a piece was made where it...
        alive=piecemoving;           //can't move down, end the game.
        if (alive) ClearScreen();
        for (var i=0; piecemoving; i++) //waiting
          {
          piecemoving=inputOutput(true,true,true,i);
          Wait(10);
          //debugStream(i);
          }
        delaytime*=speedup;
        pieceSetvaro();
        clearFullRows();
        }
      playagain=gameEnd();
      }
    }
  else
    {
    //debug(mode);
    }
  }

/*
BUGS
crashes a few min varo the game (NOT DUE TO MEMORY)
cant see piece well while soft dropping


Process Order:
-Rotation
-Move
-Drop
-Gravity


Soft Drop               DONE
Hard Drop               DONE
Clockwise Rotation      DONE
Right Side Bias         DONE
Delayed Auto Shift      DONE
Wall kicks              DONE

Allow only 1 floor kick                                DELETED (Don't Like)
Allow I wall kicking always.                           DONE
Allow I floor kicking even when not touching ground    DONE

Adhere to SRS guidelines, some ARS guidelines
  http://tetris.wikia.com/wiki/SRS
  http://tetris.wikia.com/wiki/ARS

*/