var turn = true; //true is white's turn while false is black's turn
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
			if (boardstate[i][j].length > 0) {
				space.dataset.piece = boardstate[i][j][0];
				space.dataset.probability = Math.round(boardstate[i][j][1] * 100);
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

function toggleActive(e) {
	var target = e.target;
	var activeSquares = document.getElementsByClassName('active');
	for (let i = 0; i < activeSquares.length; i++) {
		activeSquares[i].classList.remove('active');
	}
	//if there is a piece and the piece is of the same color as the curren turn
	if (target.dataset.piece == "" || (target.dataset.piece == target.dataset.piece.toUpperCase()) != turn)
		return;
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
