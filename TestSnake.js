var WidthBlocks=20;
var HeightBlocks=20;
var nOfBlocks=(WidthBlocks*HeightBlocks);
var BlockSize=20;
var Difficulty=2;
var firstx,firsty,lastx,lasty;
var selection,length,grow,startlength;
var dir=DOWN;
var score=0;
var speedup, delaytime;
var foodate=false;
var dead=true;
var quit=false;
var drawx,drawy,lastms;
var i,j,n;
var board=[];
debug("test");

var odx = function(invalue) //One Dimension X
	//{return (floor(invalue/WidthBlocks));};
	{invalue -= (invalue%WidthBlocks);
	return (invalue/WidthBlocks);};

var ody = function(invalue) //One Dimension Y
	{return (invalue%WidthBlocks);};


for (var h=0;h<nOfBlocks;h++)
	{
	debug("x",odx(h));
	}
for (var h=0;h<nOfBlocks;h++)
	{
	debug("y",ody(h));
	}