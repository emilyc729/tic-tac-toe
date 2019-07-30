/*----- constants -----*/
const COLORS = {
    'null': ['', 'none'],
    '1': ['X', 'rgb(2,206,205)'],
    '-1': ['O', 'rgb(253,100,120)']
};

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];

/*----- app's state (variables) -----*/
let board, turn, winner;

/*----- cached element references -----*/
let msgEl = document.getElementById('msg');

/*----- event listeners -----*/
document.querySelector('section.board')
    .addEventListener('click', handleClick);
document.getElementById('restart')
    .addEventListener('click', init);

/*----- functions -----*/
init();
function init() {
    board = [
        null, null, null,
        null, null, null, 
        null, null, null 
    ];
    turn = 1; //initialize who's turn it is 1: 'X', -1: 'O'
    winner = null; //1, -1, null (no winner), 'T' tie
    render();
}

function render() {
    //render board
    board.forEach(function (cell, cellIdx) {
        console.log(cellIdx);
        let div = document.getElementById(`cell${cellIdx}`);
        div.innerHTML = COLORS[cell][0];
        div.style.color = COLORS[cell][1];
    });

    if (winner == null) {
        msgEl.textContent = `${COLORS[turn][0].toUpperCase()}'s Turn`;
    } else if (winner === 'T') {
        msgEl.textContent = "It's a tie!";
    } else {
        msgEl.textContent = `${COLORS[winner][0].toUpperCase()} Won!`;
    }

}

function handleClick(evt) {
    // console.log(evt.target.id);

    let cellIdx = parseInt(evt.target.id.replace('cell', ''));
    if (isNaN(cellIdx) || winner) return;
    if (board[cellIdx] !== null) return;
    board[cellIdx] = turn;
    turn *= -1;
    winner = getWinner();
   // console.log(winner);
    
    render();

}

function getWinner() {
    let rowSum = 0;

    for (let i = 0; i < winCombos.length; i++) {

        for (let j = 0; j < winCombos[i].length; j++) {
            rowSum += board[winCombos[i][j]];
        }
        rowSum = Math.abs(rowSum);
       // console.log(rowSum);
       // console.log(board[winCombos[i][0]]);
        if (rowSum === 3) {
            
            return board[winCombos[i][0]];
        }

        rowSum = 0;
    }

    if (board.indexOf(null) !== -1) {
        return null;
    } else {
        return 'T';
    }


}
