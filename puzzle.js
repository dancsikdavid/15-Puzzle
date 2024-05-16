let clickCount = 0;
let puzzle = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, '']
];

let startTime;
let timerInterval;

function renderPuzzle() {
  const table = document.getElementById('puzzle');
  table.innerHTML = '';
  for (let i = 0; i < puzzle.length; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < puzzle[i].length; j++) {
      const cell = document.createElement('td');
      cell.textContent = puzzle[i][j];
      if (puzzle[i][j] === '') {
        cell.classList.add('empty');
      } else {
        if(puzzle[i][j] == i * 4 + j +1) {
          cell.classList.add('correct');
        } else {
          cell.classList.remove('correct');
        }
      }
      cell.onclick = function() {
        if (this.textContent === '') return;

        let row = Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode);
        let col = Array.from(this.parentNode.children).indexOf(this);

        if (row > 0 && puzzle[row - 1][col] === '') {
          puzzle[row - 1][col] = puzzle[row][col];
          puzzle[row][col] = '';
        } else if (row < 3 && puzzle[row + 1][col] === '') {
          puzzle[row + 1][col] = puzzle[row][col];
          puzzle[row][col] = '';
        } else if (col > 0 && puzzle[row][col - 1] === '') {
          puzzle[row][col - 1] = puzzle[row][col];
          puzzle[row][col] = '';
        } else if (col < 3 && puzzle[row][col + 1] === '') {
          puzzle[row][col + 1] = puzzle[row][col];
          puzzle[row][col] = '';
        }

        clickCount++;
        renderPuzzle();
        if (isSolved()) {
          clearInterval(timerInterval);
          alert(`Gratulálok! Sikerült megoldanod a feladványt ${clickCount} kattintással és ennyi idő alatt: ${document.getElementById('stopwatch').textContent}!`);
        }
      };
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

function isSolved() {
  let count = 1;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (puzzle[i][j] !== '' && puzzle[i][j] !== count) {
        return false;
      }
      count++;
      if (count === 16) count = '';
    }
  }
  return true;
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = ((elapsedTime % 60000) / 1000).toFixed(2);
    document.getElementById('stopwatch').textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, 100);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame() {
  document.getElementById('start-btn').style.display = 'none';
  document.getElementById('restart-btn').style.display = 'inline-block';
  document.getElementById('puzzle').style.display = 'table';
  clickCount = 0;
  puzzle = shuffle(puzzle.flat()).reduce((acc, val, index) => {
    if (index % 4 === 0) acc.push([]);
    acc[Math.floor(index / 4)].push(val);
    return acc;
  }, []);
  startTimer();
  renderPuzzle();
}

function resetGame() {
  clickCount = 0;
  puzzle = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, '']
  ];
  clearInterval(timerInterval);
  document.getElementById('stopwatch').textContent = '00:00';
  puzzle = shuffle(puzzle.flat()).reduce((acc, val, index) => {
    if (index % 4 === 0) acc.push([]);
    acc[Math.floor(index / 4)].push(val);
    return acc;
  }, []);
  startTimer();
  renderPuzzle();
}

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', resetGame);
