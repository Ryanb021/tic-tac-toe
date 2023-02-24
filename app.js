window.addEventListener('DOMContentLoaded', () => {
  const tiles = Array.from(document.querySelectorAll('.tile'));
  const playerDisplay = document.querySelector('.display-player');
  const resetButton = document.querySelector('#reset');
  const announcer = document.querySelector('.announcer');

  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = '1';
  let isGameActive = true;

  const PLAYER1_WON = 'PLAYER1_WON';
  const PLAYER2_WON = 'PLAYER2_WON';
  const TIE = TIE;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winningCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === '' || b === '' || c === '') {
        continue;
      }
      if (a === b && b === c) {
        roundwon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === '1' ? PLAYER1_WON : PLAYER2_WON);
      isGameActive = false;
      return;
    }

    if (!board.includes(''))
      announce(TIE);
  }

  const announce = (type) => {
    switch (type) {
      case PLAYER2_WON:
        announcer.innerHTML = 'Player <span class="player2">2</span> Won';
        break;
      case PLAYER1_WON:
        announcer.innerHTML = 'Player <span class="player1">1</span> Won';
        break;
      case TIE:
        announcer.innerText = 'Tie';
    }
    announcer.classList.remove('hide');
  };

  const isValidAction = (tile) => {
    if (tile.innerText === '1' || tile.innerText === '2') {
      return false;
    }

    return true;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };

  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === '1' ? '2' : '1';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  };

  const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer;
      tile.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };

  const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer === 'Player 2') {
      changePlayer();
    }

    tiles.forEach(tile => {
      tile.innerText = '';
      tile.classList.remove('player1');
      tile.classList.remove('player2');
    });
  };

  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));
  });

  resetButton.addEventListener('click', resetBoard);
});
