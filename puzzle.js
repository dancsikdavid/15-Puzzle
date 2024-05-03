document.addEventListener('DOMContentLoaded', function() {
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    const emptyPiece = document.getElementById('empty-piece');
    let puzzleSolved = false;
  
    shufflePieces();
  
    puzzlePieces.forEach(piece => {
      piece.addEventListener('click', function() {
        if (!puzzleSolved && isAdjacent(this, emptyPiece) && this.textContent !== '') {
          swapPieces(this, emptyPiece);
          checkWin();
        }
      });
    });
  
    function shufflePieces() {
      const numbers = Array.from(Array(15).keys()).map(x => x + 1);
      numbers.push(null);
      for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }
      puzzlePieces.forEach((piece, index) => {
        if (numbers[index]) {
          piece.textContent = numbers[index];
        } else {
          piece.textContent = '';
        }
      });
    }
  
    function isAdjacent(piece1, piece2) {
      const piece1Index = Array.from(puzzlePieces).indexOf(piece1);
      const piece2Index = Array.from(puzzlePieces).indexOf(piece2);
      const rowDiff = Math.abs(Math.floor(piece1Index / 4) - Math.floor(piece2Index / 4));
      const colDiff = Math.abs((piece1Index % 4) - (piece2Index % 4));
      return (rowDiff === 0 && colDiff === 1) || (colDiff === 0 && rowDiff === 1);
    }
  
    function swapPieces(piece1, piece2) {
      const temp = piece1.textContent;
      piece1.textContent = piece2.textContent;
      piece2.textContent = temp;
    }
  
    function checkWin() {
      const orderedNumbers = Array.from(Array(15).keys()).map(x => x + 1);
      const currentNumbers = Array.from(puzzlePieces).map(piece => parseInt(piece.textContent));
      if (currentNumbers.every((value, index) => value === orderedNumbers[index]) && emptyPiece.parentElement === puzzlePieces[15].parentElement) {
        puzzleSolved = true;
        alert('Gratulálok, megoldottad a feladványt!');
      }
    }
  });
  