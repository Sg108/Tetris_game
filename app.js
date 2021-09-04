document.addEventListener('DOMContentLoaded',()=>{
const grid=document.querySelector('.grid');
let squares=Array.from(document.querySelectorAll('.grid div'));
const score_display=document.querySelector('#score');
const startBtn=document.querySelector('#start-button');
const nextDisplay=document.querySelectorAll('.upNextDisplay div');
let nextRandom=0;
let displayWidth=4;
let next_tetri;
let timer;
const width=10;

const nextTetromino=[
    [1,displayWidth+1,2*displayWidth +1,2],
    [0,displayWidth,displayWidth+1,2*displayWidth+1],
    [1,displayWidth,displayWidth+1,displayWidth+2],
    [0,1,displayWidth,displayWidth+1],
    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]
]
const lTetrimino =[
    [1,width+1,2*width +1,2],
    [width,width+1,width+2,2*width+2],
    [1,width+1,2*width+1,2*width],
    [width,2*width,2*width+1,2*width+2]
]
const zTetrimino=[
    [0,width,width+1,2*width+1],
    [width+1,width+2,2*width,2*width+1],
    [0,width,width+1,2*width+1],
    [width+1,width+2,2*width,2*width+1]
    
]
const tTetrimino=[
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,2*width+1],
    [1,width,width+1,2*width+1]
]
const oTetrimino=[
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]

]
const iTetrimino=[
[1,width+1,width*2+1,width*3+1],
[width,width+1,width+2,width+3],
[1,width+1,width*2+1,width*3+1],
[width,width+1,width+2,width+3]
]
const theTetriminos=[lTetrimino,zTetrimino,tTetrimino,oTetrimino,iTetrimino];

function control(e)
{
    if(e.keyCode===37)
    {
        moveLeft();
    }
    else if(e.keyCode===40)
    {
        moveDown();
    }
    else if(e.keyCode===39)
    {
        moveRight();
    }
    else if(e.keyCode===38)
    {
        rotate();
    }
}
document.addEventListener('keyup',control);
let rand=Math.floor(Math.random()*theTetriminos.length);
let rand_rotation=Math.floor(Math.random()*4);
let curr_position=3;
let current_tetri=theTetriminos[rand][rand_rotation];
function draw(){
    current_tetri.forEach(x=>{
        squares[curr_position+x].classList.add('tetrimino');
    })
}
function undraw(){
    current_tetri.forEach(x=>{
        squares[curr_position+x].classList.remove('tetrimino');
    })
}
//draw();
//timer=setInterval(moveDown,1000);
function moveDown()
{
    undraw();
    curr_position+=width;
    draw();
    freeze();
}
function freeze(){
   if(current_tetri.some(x=>squares[curr_position+x+width].classList.contains('taken')))
   {
    current_tetri.forEach(x=>{squares[curr_position+x].classList.add('taken')});
   curr_position=3;
   rand=nextRandom;
   nextRandom=Math.floor(Math.random()*nextTetromino.length);

   rand_rotation=Math.floor(Math.random()*4);

   current_tetri=theTetriminos[rand][rand_rotation];
   next_tetri=nextTetromino[nextRandom];

   game_over();
   draw();
   showNextDisplay();
   addScore();
  

   }
   
}
function moveLeft(){
    undraw();
    const cannotMoveLeft=current_tetri.some(x=>((curr_position+x)%width===0))
    if(!cannotMoveLeft)
    {
        curr_position-=1;
    }
    if(current_tetri.some(x=>squares[curr_position+x].classList.contains('taken')))
    {
        curr_position+=1;
    }
    draw();
    freeze();
}
function moveRight(){
    undraw();
    const cannotMoveRight=current_tetri.some(x=>((curr_position+x)%width===width-1))
    if(!cannotMoveRight)
    {
        curr_position+=1;
    }
    if(current_tetri.some(x=>squares[curr_position+x].classList.contains('taken')))
    {
        curr_position-=1;
    }
    draw();
    freeze();
}
function rotate(){
    undraw();
    rand_rotation=(rand_rotation+1)%4;
    current_tetri=theTetriminos[rand][rand_rotation];
    draw();
}
function showNextDisplay(){
    nextDisplay.forEach(x=>{x.classList.remove('tetrimino')});
    nextTetromino[nextRandom].forEach(x=>{nextDisplay[0+x].classList.add('tetrimino')});
}
startBtn.addEventListener('click',begin);
function begin()
{
   if(timer)
   {
       clearInterval(timer);
       timer=null;
   }
   else
   {   draw();
       timer=setInterval(moveDown,1000);
       nextRandom=Math.floor(Math.random()*nextTetromino.length);
       showNextDisplay();
   }
}
let score=0;
function addScore(){
    for(let i=0;i<199;i+=width)
    {
        let row=[i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9];
        if(row.every(x=>squares[x].classList.contains('taken')))
        {
            score+=10;
            score_display.innerText=score;
            row.forEach(x=>{
                squares[x].classList.remove('taken')
                squares[x].classList.remove('tetrimino')
            })
            let remove_row=squares.splice(i,width);
            squares=remove_row.concat(squares);
            squares.forEach(x=>grid.appendChild(x));

        } 
    }
}
function game_over()
{
    if(current_tetri.some(x=>squares[curr_position+x].classList.contains('taken')))
    {
        score_display.innerHTML='game over';
        clearInterval(timer);
    }
}
}


)