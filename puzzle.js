let puzzle = [];
  for (let i = 0; i < 4; i++) {
    puzzle[i] = [];
    for (let j = 0; j < 4; j++) {
      puzzle[i][j] = i * 4 + j + 1;
    }
  }
  puzzle[3][3] = '';

  for (let i = 0; i < 1000; i++) {
    let rand1 = Math.floor(Math.random() * 4);
    let rand2 = Math.floor(Math.random() * 4);
    let rand3 = Math.floor(Math.random() * 4);
    let rand4 = Math.floor(Math.random() * 4);
    let temp = puzzle[rand1][rand2];
    puzzle[rand1][rand2] = puzzle[rand3][rand4];
    puzzle[rand3][rand4] = temp;
  }

  let table = document.getElementById('puzzle');
  for (let i = 0; i < 4; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 4; j++) {
      let cell = document.createElement('td');
      cell.textContent = puzzle[i][j];
      row.appendChild(cell);

      let clickCount = 0;

    cell.onclick = function() {
      if (this.textContent === '') return;

      let row = Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode);
      let col = Array.from(this.parentNode.children).indexOf(this);

      if (row > 0 && puzzle[row - 1][col] === '') {
        puzzle[row - 1][col] = puzzle[row][col];
        puzzle[row][col] = '';
        this.style.top = `${(row - 1) * 80}px`;
      } else if (row < 3 && puzzle[row + 1][col] === '') { 
        puzzle[row + 1][col] = puzzle[row][col];
        puzzle[row][col] = '';
        this.style.top = `${(row + 1) * 80}px`;
      } else if (col > 0 && puzzle[row][col - 1] === '') {
        puzzle[row][col - 1] = puzzle[row][col];
        puzzle[row][col] = '';
        this.style.left = `${(col - 1) * 80}px`;
      } else if (col < 3 && puzzle[row][col + 1] === '') { 
        puzzle[row][col + 1] = puzzle[row][col];
        puzzle[row][col] = '';
        this.style.left = `${(col + 1) * 80}px`;
      }

      clickCount++;

      renderPuzzle();
      if (isSolved()) {
        alert(`Gratulálok! Megoldottad a feladatot! Kattintások száma:${clickCount}`);
      }
    };
    }
    table.appendChild(row);
  }

  function renderPuzzle() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        table.rows[i].cells[j].textContent = puzzle[i][j];
      }
    }
  }

  function isSolved() {
    let count = 1;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (i === 3 && j === 3) {
          if (puzzle[i][j] !== '') return false;
        } else {
          if (puzzle[i][j] != count++) return false;
        }
      }
    }
    return true;
  }
