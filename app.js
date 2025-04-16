let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;
let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game Started");
        started=true;
        levelUp();
    }
});
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randBox=Math.floor(Math.random()*4+1);
    let box=document.querySelector(`.box${randBox}`);
    btnFlash(box);
    gameSeq.push(box.getAttribute("id"));
}
function btnFlash(box){
    box.classList.add("flash");
    setTimeout(function(){
        box.classList.remove("flash");
    },250);
}

let allbox=document.querySelectorAll(".box");
for(box of allbox){
    box.addEventListener("click",boxPress);
}
function boxPress(){
    if(level>0){
        btnFlash(this);
        userSeq.push(this.getAttribute("id"));
        checkAns(userSeq.length-1);
    }
}
function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,500);
        }
    }
    else{
        h2.innerHTML=`Game Over! Your score was <b>${level-1}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}