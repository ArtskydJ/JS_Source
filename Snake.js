var board = [];
var dim = 10; //dimensions of the board
var blk = 30; //pixels for each block
var addLen = 3; //length the snake adds after eating food

for (var i=0; i<dim; i++) {
    board[i] = [];
}
var BoardIterator = function(cb) {
    cb = cb || function (piece){ console.log(piece) };
    return function() {
        for (var i=0; i<dim; i++) {
            for (var j=0; j<dim; j++) {
                var x = parseInt(i,10); //create new vars so i
                var y = parseInt(j,10); //& j dont get modified
                cb(board[i][j], x, y);
            }
        }
    };
};

var resetBoard = new BoardIterator(function(piece) {
    piece = 1;
});

var printBoard = new BoardIterator(function(piece, x, y) {
    if (piece>0) {
        fill(0, 0, 255); 
        rect(x*blk, y*blk, (x+1)*blk, (y+1)*blk);
    }
});

var addlife = new BoardIterator(function(piece) {
    if (piece>0) {
        piece+=addLen;
    }
});

var draw = function() {
    var playing = true;
    var len = 5;
    
    resetBoard();
    while(playing) {
        printBoard();
        playing = false;
    }
};