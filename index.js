const board = document.getElementById("board");
    const statusText = document.getElementById("status");
    let cells = ["", "", "", "", "", "", "", "", ""];
    let gameOver = false;

    // Create board
    function createBoard() {
      board.innerHTML = "";
      cells.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.dataset.index = index;
        div.addEventListener("click", handlePlayerMove);
        board.appendChild(div);
      });
    }

    function handlePlayerMove(e) {
      const index = e.target.dataset.index;
      if (cells[index] !== "" || gameOver) return;

      // Player move (X)
      cells[index] = "X";
      e.target.textContent = "X";
      e.target.classList.add("taken");

      if (checkWinner("X")) {
        statusText.textContent = "You Win! 🎉";
        gameOver = true;
        return;
      }

      if (cells.every(cell => cell !== "")) {
        statusText.textContent = "It's a Draw! 🤝";
        gameOver = true;
        return;
      }

      // Computer move
      statusText.textContent = "Computer's turn...";
      setTimeout(computerMove, 500);
    }

    function computerMove() {
      let emptyCells = cells.map((val, i) => val === "" ? i : null).filter(v => v !== null);
      if (emptyCells.length === 0) return;

      let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      cells[randomIndex] = "O";
      let cellDiv = board.querySelector(`[data-index='${randomIndex}']`);
      cellDiv.textContent = "O";
      cellDiv.classList.add("taken");

      if (checkWinner("O")) {
        statusText.textContent = "Computer Wins! 🤖";
        gameOver = true;
        return;
      }

      if (cells.every(cell => cell !== "")) {
        statusText.textContent = "It's a Draw! 🤝";
        gameOver = true;
        return;
      }

      statusText.textContent = "Your turn (X)";
    }

    function checkWinner(player) {
      const winningCombos = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // cols
        [0,4,8],[2,4,6]          // diagonals
      ];
      return winningCombos.some(combo => {
        return combo.every(index => cells[index] === player);
      });
    }

    function resetGame() {
      cells = ["", "", "", "", "", "", "", "", ""];
      gameOver = false;
      statusText.textContent = "Your turn (X)";
      createBoard();
    }

    createBoard();