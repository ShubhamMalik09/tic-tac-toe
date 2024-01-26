const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newbtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winingpos= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function init(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        box.classList=`box box${index+1}`;
    })
    newbtn.classList.remove("active");
    gameInfo.innerText= `Current Player -${currentPlayer}`;
}

init();

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }

    gameInfo.innerText=`Current Player- ${currentPlayer}`;
}

function checkwin(){
    let answer="";
    winingpos.forEach(pos=>{
        if((gameGrid[pos[0]]!="" || gameGrid[pos[1]]!="" || gameGrid[pos[2]]!="")
         && (gameGrid[pos[0]]===gameGrid[pos[1]])
         && (gameGrid[pos[1]]===gameGrid[pos[2]])){
            if(gameGrid[pos[0]]==="X"){
                answer="X";
            }
            else{
                answer="O"; 
            }

            boxes.forEach(box=>{
                box.style.pointerEvents="none";
            })

            boxes[pos[0]].classList.add("win");
            boxes[pos[1]].classList.add("win");
            boxes[pos[2]].classList.add("win");
        }
    });

    if(answer!==""){
        gameInfo.innerText=`Winner Player-${answer}`;
        newbtn.classList.add("active");
        return;
    }

    let fillcount=0;
    gameGrid.forEach((box)=>{
        if(box!=="")
            fillcount++;
    });
    if(fillcount===9){
        gameInfo.innerText="Game Tied!";
        newbtn.classList.add("active");
    }
}

function handleCLick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";

        //turn swap
        swapTurn();
        // check win
        checkwin();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleCLick(index);
    })
});

newbtn.addEventListener("click",init);