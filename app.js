let boxes = document.querySelectorAll('.box')
let resetBtn = document.querySelector('#reset-btn')
let newGameBtn = document.querySelector("#new-btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turnO = true;  // playerX , playerO
let countBtn = 0;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

const resetGame = (box)=>{
    turnO = true;
    countBtn = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        countBtn +=1;
        console.log(countBtn)
        console.log("box was clicked")
        if (turnO) {
            box.innerText = "O";
            // box.style.color = "Green";
            box.classList.add("o-color");
            turnO = false;
            
        }
        else {
            box.innerText = "X";
            box.classList.add("x-color");
            turnO = true;
        }
        box.disabled = true

        const winnerFound = checkWinner();
        if (!winnerFound && countBtn ===9){
            draw();
        }
    })

})

const draw = ()=>{
    msg.innerText = `It's a Draw`
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";

        // box.style.color = "";
        box.classList.remove("o-color", "x-color");
        // box.classList.remove("o-color");
        // box.classList.remove("x-color");
    }
}

const showWinner = (Winner)=>{
    msg.innerText = `Congratulations, Winner is ${Winner}`
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val !== "" && pos2val !== "" && pos3val !== ""){
            if(pos1val === pos2val && pos2val === pos3val){
                console.log("Winner", pos1val)
                showWinner(pos1val)
                return true;
            }
        }
    }
    return false;
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);