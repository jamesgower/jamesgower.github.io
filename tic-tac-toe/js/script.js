/* jshint esnext: true */
var noPlayers;
var difficulty = 1;
var huPlayer = "X";
var huPlayer2 = "O";
var aiPlayer = "O";
var p1name;
var p2name;
var currentPlayer = 1;
var p1score = 0;
var p2score = 0;
var aiscore = 0;

$(document).ready(function () {
    $("#singlePlayer").click(function () {
        $(".startgame").fadeOut(1000);
        $("#player2").remove();
        $(".player").css("display", "block");
        $(".aiChoice").css("display", "block");
        $(".title").css("margin-top", "70px");
        $(".title").text("Enter your name and choose the AI difficulty!");
        $(".choice").fadeIn(1000);
        noPlayers = 1;
    });
    $("#twoPlayer").click(function () {
        $(".aiChoice").remove();
        $(".startgame").fadeOut(1000);
        noPlayers = 2;
    });

    $("#switchChoice").click(function () {
        if ($("#p1choice").text() === "O") {
            $("#p1choice").text("X");
            $("#p2choice").text("O");
            aiPlayer = "X";
        } else {
            $("#p1choice").text("O");
            $("#p2choice").text("X");
            aiPlayer = "O";
        }
    });

    $("#confirm").click(function () {
        if (noPlayers === 1) {
            if ($("#p1name").val().length === 0) {
                $("#player1name").text("Player 1: ");
            } else {
                p1name = $("#p1name").val();
                $("#player1name").text(p1name + ": ");
            }
            if ($("#p1choice").text() === "X") {
                huPlayer = "X";
                aiPlayer = "O";
            } else {
                huPlayer = "O";
                aiPlayer = "X";
            }
            $("#player2name").text("Computer: ");
        } else {
            if ($("#p1name").val().length === 0) {
                p1name = "Player 1";
                $("#player1name").text(p1name);
            } else {
                p1name = $("#p1name").val();
                $("#player1name").text(p1name);
                if ($("#p1choice").text() === "X") {
                    huPlayer = "X";
                    huPlayer2 = "O";
                } else {
                    huPlayer = "X";
                    huPlayer2 = "O";
                }
            }
            if ($("#p2name").val().length === 0) {
                p2name = "Player 2:";
                $("#player2name").text(p2name);
            } else {
                p2name = $("#p2name").val();
                $("#player2name").text(p2name);
            }
        }
        $(".choice").fadeOut(1000);
    });

    $("#easy").click(function(){
        $("#easy").css("border-color", "green");
        $("#normal").css("border-color", "black");
        $("#unbeatable").css("border-color", "black");
        difficulty = 0;
    });

    $("#normal").click(function(){
        $("#easy").css("border-color", "black");
        $("#normal").css("border-color", "orange");
        $("#unbeatable").css("border-color", "black");
        difficulty = 1;
    });

    $("#unbeatable").click(function(){
        $("#easy").css("border-color", "black");
        $("#normal").css("border-color", "black");
        $("#unbeatable").css("border-color", "red");
        difficulty = 2;
    });
});

//Javascript for tic-tac-toe
var origBoard;
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];
const cells = document.querySelectorAll(".cell");
startGame();

function startGame() {
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    if (typeof origBoard[square.target.id] === 'number') {
        if (!checkTie() && noPlayers == 1) {
            turn(square.target.id, huPlayer);
        } else {
            if (currentPlayer == 1 && !checkTie()) {
                turn(square.target.id, huPlayer);
                currentPlayer = 2;
            } else if(currentPlayer == 2 && !checkTie()) {
                turn(square.target.id, huPlayer2);
                currentPlayer = 1;
            }
        }
        if (!checkTie() && noPlayers === 1) {
            turn(bestSpot(), aiPlayer);
        }
    }
}

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) {
        gameOver(gameWon);
    }
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {
                index: index,
                player: player
            };
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == huPlayer ? "green" : "red";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    if (noPlayers === 1) {
        declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose!");
        if (gameWon.player === huPlayer && !checkTie()) {
            p1score++;
            document.getElementById("p1score").innerText = " " + p1score;
        } else if (gameWon.player === aiPlayer && !checkTie()) {
            aiscore++;
            document.getElementById("p2score").innerText = " " + aiscore;
        }
    } else {
        declareWinner(gameWon.player == huPlayer ? p1name + " wins!" : p2name + " wins!");
        if (gameWon.player === huPlayer && !checkTie()) {
            p1score++;
            document.getElementById("p1score").innerText = " " + p1score;
        } else if (gameWon.player === huPlayer2 && !checkTie()) {
            p2score++;
            document.getElementById("p2score").innerText = " " + p2score;
        }
    }
}

function declareWinner(result) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = result;
}

function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
    if (difficulty === 0) {
        return emptySquares()[0];
    } else if (difficulty === 1) {
        var length = emptySquares().length;
        return emptySquares()[Math.floor(Math.random(length) + 1)];
    } else if (difficulty === 2) {
        return minimax(origBoard, aiPlayer).index;
    }
}

function checkTie() {

    if (emptySquares().length === 0 && !checkWin(origBoard, "X") && !checkWin(origBoard, "O")) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].removeEventListener('click', turnClick, false);
        }
            declareWinner("Tie Game!");
            return true;
    }
    return false;
}

function reset() {
    location.reload();
}

// MINIMAX //
function minimax(newBoard, player) {
    var availSpots = emptySquares(newBoard);

    if (checkWin(newBoard, player)) {
        return {
            score: -10
        };
    } else if (checkWin(newBoard, aiPlayer)) {
        return {
            score: 10
        };
    } else if (availSpots.length === 0) {
        return {
            score: 0
        };
    }

    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player === aiPlayer) {
            var result = minimax(newBoard, huPlayer);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }

    var bestMove;
    if (player === aiPlayer) {
        var bestScore = -100000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 100000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}
