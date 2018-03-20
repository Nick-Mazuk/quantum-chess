//websockets

var turn = true; //true is white's turn while false is black's turn
var canSelectMove = false; //true if there is an active piece and there is a potential to make a move
var initstate = [[["r", 1], ["n", 1], ["b", 1], ["q", 1], ["k", 1], ["b", 1], ["n", 1], ["r", 1]],
 [["p", 1], ["p", 1], ["p", 1], ["p", 1], ["p", 1], ["p", 1], ["p", 1], ["p", 1]],
 [[], [], [], [], [], [], [], []],
 [[], [], [], [], [], [], [], []],
 [[], [], [], [], [], [], [], []],
 [[], [], [], [], [], [], [], []],
 [["P", 1], ["P", 1], ["P", 1], ["P", 1], ["P", 1], ["P", 1], ["P", 1], ["P", 1]],
 [["R", 1], ["N", 1], ["B", 1], ["Q", 1], ["K", 1], ["B", 1], ["N", 1], ["R", 1]]];

function renderFromArray(boardstate) {
	for (let i = 0; i < 8; i++) {
		var row = document.getElementById("row" + i);
		for (let j = 0; j < 8; j++) {
			var space = row.getElementsByClassName("column" + j)[0];
			if (boardstate[7 - i][j].length > 0) {
				space.dataset.piece = boardstate[7 - i][j][0];
				space.dataset.probability = Math.round(boardstate[7 - i][j][1] * 100);
			} else {
				space.dataset.piece = "";
				space.dataset.probability = "";
			}
		}
	}
}

function render(JSONString) {
	renderFromArray(JSON.parse(JSONString));
}

function getSquare(el) {
	var classes = el.classList;
	var columnClass;
	for (let i = 0; i < classes.length; i++) {
		if (classes[i].indexOf('column') > -1)
			columnClass = classes[i];
	}
	var column = columnClass.substr(columnClass.length - 1);
	var rowId = el.parentElement.id;
	var row = rowId.substr(rowId.length - 1);
	return [column, row];
}

function getMoveDistance(move) {
	var p1 = move[0];
	var p2 = move[1];
	return Math.sqrt(Math.pow(p1[1] - p2[1], 2) + Math.pow(p1[0] - p2[0], 2));
}

function isValidKingMove(move) {
	if (getMoveDistance(move) < 1.8)
		return true;
	//now checking for castling (only knocks out a few cases that cannot be castling, not necessarily all invalid castling combinations)
	if (move[0][0] != 4) //checks for valid column
		return false;
	if (move[0][1] != 0 && move[0][1] != 7) //checks for valid rows
		return false;
	if (Math.abs(move[0][0] - move[1][0]) != 2) //checks if king is moving 2 squares to the side
		return false;
	if (move[0][1] - move[1][1] != 0) //checks to make sure the king is not moving vertically
		return false;
	return true;
}

function isValidKnightMove(move) {
	var distance = getMoveDistance(move)
	if (distance > 2.1 && distance < 2.3)
		return true;
	return false;
}

function isValidQueenMove(move) {
	return isValidRookMove(move) || isValidBishopMove(move);
}

function isValidRookMove(move) {
	return move[0][0] == move[1][0] || move[0][1] == move[1][1];
}

function isValidBishopMove(move) {
	return Math.abs(move[0][0] - move[1][0]) == Math.abs(move[0][1] - move[1][1]);
}

function isValidPawnMove(move) {
	return true;
}

function validateMove(move, piece) {
	var pieceType = piece.dataset.piece.toLowerCase();
	switch (pieceType) {
		case "k":
			return isValidKingMove(move);
			break;
		case "n":
			return isValidKnightMove(move);
			break;
		case "q":
			return isValidQueenMove(move);
			break;
		case "r":
			return isValidRookMove(move);
			break;
		case "b":
			return isValidBishopMove(move);
			break;
		case "p":
			return isValidPawnMove(move);
			break;
		default:
			return false;
	}
}

function getMove(el, isPiece) {
	var square = getSquare(el);
	if (canSelectMove) {
		var piece = document.getElementsByClassName('active')[0];
		var move = [getSquare(piece), square];
		if (validateMove(move, piece)) {
			sendMove(move);
			clearActive(true);
			return true;
		} else {
			clearActive(true);
		}
	} else if (isPiece) {
		canSelectMove = true;
		return false;
	}
}

function sendMove(move) {
	console.log(move);
	return false;
}

function clearActive(clearSelectMove) { //clear select move is false if you also want to clear canSelectMove
	var activeSquares = document.getElementsByClassName('active');
	for (let i = 0; i < activeSquares.length; i++) {
		activeSquares[i].classList.remove('active');
	}
	if (clearSelectMove)
		canSelectMove = false;
}

function toggleActive(e) {
	var target = e.target;
	//if there is a piece and the piece is of the same color as the curren turn
	if (target.dataset.piece == "" || (target.dataset.piece == target.dataset.piece.toUpperCase()) != turn) {
		getMove(target, false);
		clearActive(false);
		return;
	}
	var madeMove = getMove(target, true);
	clearActive(false);
	if (!madeMove)
		target.classList.add('active');
}

function setUpActive() {
	for (let i = 0; i < 8; i++) {
		var row = document.getElementById("row" + i);
		for (let j = 0; j < 8; j++) {
			var space = row.getElementsByClassName("column" + j)[0];
			space.addEventListener('mousedown', function (e) {
				toggleActive(e);
			});
		}
	}
}

function setUpBoard() {
	setUpActive();
}

function onload() {
	setUpBoard();
	renderFromArray(initstate);
}

window.addEventListener("DOMContentLoaded", onload);
