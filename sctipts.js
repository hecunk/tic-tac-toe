function Player1(name) {
    const fiqure = "X";
    return { name , fiqure };
}

function Player2(name) {
    const fiqure = "O"
    return { name , fiqure };
}

function GameBoard(player1, player2) {
    const gameboard = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    return { gameboard , player1 , player2 };
}

function winMessage(name) {
    const winMessage = document.querySelector(".winMessage");
    const winDialog = document.querySelector(".winDialog");
    if (name === "Draw") {
        winMessage.textContent = `It's a Draw!`
    }
    else {
        winMessage.textContent = `${name} WON!`
    }
    winDialog.showModal();
    closeButtonHandler(winDialog);
}

function closeButtonHandler(dialog) {
    const closeButton = document.querySelector(".dialog-close-button");
    closeButton.addEventListener("click", () => {dialog.close()});
}

function gameChecker(gameboard) {
    for (let j = 0; j < gameboard.length; j++) {
        let rowarr = [];
        let firstDiagonalarr = [];
        let secondDiagonalarr = [gameboard[0][2], gameboard[1][1], gameboard[2][0]];
        for (let i = 0; i < gameboard.length; i++) {
            rowarr.push(gameboard[i][j]);
            firstDiagonalarr.push(gameboard[i][i]);
        }
        if (rowarr.every(v => v === rowarr[0]) || gameboard[j].every(v => v === gameboard[j][0]) || 
        firstDiagonalarr.every(v => v === firstDiagonalarr[0]) || secondDiagonalarr.every(v => v === secondDiagonalarr[0])) {
            return true;
        }
        isDraw++;
        if (isDraw === 54) {
            return "Draw";
        }
    }
}

function updateGameBoard(gameboard, fiqure, posX, posY, name, prevname, e) {
    if (gameboard[posY][posX] !== "X" && gameboard[posY][posX] !== "O") {
        gameboard[posY].splice(posX, 1, fiqure);
        toggle = !toggle;
        if (fiqure === "X") {
            e.target.style.color = "red";
        }
        else {
            e.target.style.color = "blue";
        }
        changeTurnName(name);
        e.target.textContent = fiqure;
        
        if (gameChecker(gameboard) === true) {
            winMessage(prevname);
            return true;
        }
        else if (gameChecker(gameboard) === "Draw") {
            winMessage("Draw");
            return true;
        }
    }
}

function changeTurnName(name) {
    const turnMessage = document.querySelector(".turnmessage");
    turnMessage.textContent = `${name}'s turn!`
}

function gamebuttonHandler(e, gameboard) {
    let fiqure;
    let name;
    let prevname;
    if (toggle === true) {
        fiqure = gameboard.player1.fiqure;
        name = gameboard.player2.name;
        prevname = gameboard.player1.name;
    }
    else {
        fiqure = gameboard.player2.fiqure;
        name = gameboard.player1.name;
        prevname = gameboard.player2.name;
    }
    if (updateGameBoard(gameboard.gameboard, fiqure, parseInt(e.target.id[0]), parseInt(e.target.id[1]), name, prevname, e) === true) {
        const invBlock = document.createElement("div");
        const gameboardDisplay = document.querySelector(".gameboard");
        invBlock.classList.add("invBlock");
        gameboardDisplay.appendChild(invBlock); 
    }
}

function restartGameHandle() {
     location.reload();
}

function restartBoardHandle(gameboard) {
    delete gameboard.gameboard;
    gameboard.gameboard = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    if (document.querySelector(".invBlock") !== null) {
        const invBlock = document.querySelector(".invBlock");
        invBlock.remove();
    }

    const turnMessage = document.querySelector(".turnmessage");
    turnMessage.textContent = `${gameboard.player1.name}'s turn!`

    const gameButton = document.querySelectorAll(".gamebutton");
     gameButton.forEach((element) => {
         element.textContent = "";
    })

    toggle = true;
    isDraw = 0;

    displayController(gameboard);
}

function displayController(gameboard) {
    const gameButton = document.querySelectorAll(".gamebutton");
    gameButton.forEach((element) => {
        element.addEventListener("click", (e) => {gamebuttonHandler(e, gameboard)});
    })
    const restartBoard = document.querySelector(".restartBoard")
    restartBoard.addEventListener("click", () => {restartBoardHandle(gameboard)});

    const restartGame = document.querySelector(".restartGame")
    restartGame.addEventListener("click", () => {restartGameHandle()});
}

function showDialog() {
    const dialog = document.querySelector(".nameDialog");
    dialog.showModal();
    setSubmitButton();
}

function setSubmitButton() {
    const submitButton = document.querySelector("#submitbutton");
    submitButton.addEventListener("click", () => {setPlayers()});
}

function setPlayers() {
    const player1Name = document.querySelector("#name1");
    const player2Name = document.querySelector("#name2");

    if (player1Name.value !== "" && player2Name.value !== "") {
        const player1 = Player1(player1Name.value);
        const player2 = Player2(player2Name.value);

        const turnMessage = document.createElement("div");
        turnMessage.textContent = `${player1.name}'s turn!`
        turnMessage.classList.add("turnmessage");
        const container = document.querySelector(".container");
        container.appendChild(turnMessage);

        const gameboard = GameBoard(player1, player2);
        displayController(gameboard);
    }
}

let toggle = true;
let isDraw = 0;
showDialog();