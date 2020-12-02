let canvas=document.getElementById('mycanvas');
let ctx=canvas.getContext('2d');
let row=20; // row of board
let col=10 // column of board
let squareSize=20;
let emptySquare= 'white';

// ve o vuong
function drawSquare(x,y,color){
    ctx.fillStyle= color;
    ctx.fillRect(x*squareSize,y*squareSize,squareSize,squareSize);
    ctx.strokeStyle='black';
    ctx.strokeRect(x*squareSize,y*squareSize,squareSize,squareSize)
}

// ve bang tao thanh tu cac o vuong mau trang
let board=[];
for(r=0; r< row; r++){
    board[r]= [];
    for(c=0; c<col; c++){
        board[r][c]= emptySquare;
    }
}
function drawBoard(){
    for (r=0; r<row; r++){
        for(c=0; c<col; c++){
            drawSquare(c,r,board[r][c]);
        }
    }
}
drawBoard();

function Tetromino(shape, color){
    this.shape= shape; // Z,T,O,I,L,S
    this.shapeI= 0; // index in Shape array
    this.currentShape=this.shape[this.shapeI];
    this.color=color;
    this.x= 3;
    this.y= 0;
    this.draw = function(){
        for (r=0;r<this.currentShape.length;r++){
            for (c=0; c<this.currentShape.length;c++)
                // Duyet mang Z[0][r][c]
                if(this.currentShape[r][c]){
                    drawSquare(this.x+c,this.y+r,this.color)
                }
        }
    }
    this.collision =function(x,y,piece){// kiem tra va cham
        for(r=0;r<piece.length;r++) {
            for (c = 0; c < piece.length; c++) {
                if (!piece[r][c]) {
                    continue;
                }
                let newX = this.x + c + x;
                let newY = this.y + r + y;
                if (newX < 0 || newX >= col || newY > row) {
                    return true;
                }
                if (newY < 0) {
                    continue;
                }
                if (board[newY][newX] != emptySquare) {
                    return true;
                }
            }
        }
        return false;
    }

    this.unDraw = function(){
        for (r=0;r<this.currentShape.length;r++){
            for (c=0; c<this.currentShape.length;c++)
                if(this.currentShape[r][c]){
                    drawSquare(this.x+c,this.y+r,emptySquare)
                }
        }
    }
    this.moveDown= function () {
        if(!this.collision(0,1,this.currentShape)){
            this.unDraw();
            this.y++;
            this.draw();
        }
    }
    this.moveLeft= function (){
        if(!this.collision(-1,0,this.currentShape)){
            this.unDraw();
            this.x--;
            this.draw();
        }

    }
    this.moveRight= function(){
        if(!this.collision(1,0,this.currentShape)) {
            this.unDraw();
            this.x++;
            this.draw();
        }
    }
    this.rotate= function (){
        let nextRotate=this.shape[(this.shapeI+1)%this.shape.length];
        if (!this.collision(0,0,nextRotate)) {
            this.unDraw();
            this.shapeI = (this.shapeI + 1) % this.shape.length;
            this.currentShape = this.shape[this.shapeI];
            this.draw();
        }
    }
    this.drop= function (){}

}

let pieces = [
    [Z,'red'],
    [S,'green'],
    [T,'yellow'],
    [O,'blue'],
    [L,'purple'],
    [I,'orange'],
    [J,'pink'],
]
function randomTetromino(){
    let random= Math.floor(Math.random()*pieces.length)
    return new Tetromino (pieces[random][0],pieces[random][1]);
}
let piece=randomTetromino();
piece.draw();

// Su kien phim
document.addEventListener('keydown',control);
function control(event){
    if(event.keyCode ==37){
        piece.moveLeft();
    }
    else if(event.keyCode ==38){
        piece.rotate();

    }
    else if(event.keyCode ==39){
        piece.moveRight()

    }
    else if(event.keyCode ==40){
        piece.moveDown();
    }
}









