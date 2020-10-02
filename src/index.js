var N_SIZE = 5,
  EMPTY = "&nbsp;",
  boxes = [],
  turn = "X",
  timerWidth = 0,
  score,
  moves;

function init() {
  
  // Change the board size
  var boardSize = prompt("Please enter board size:", "3");
  if (boardSize != null) {
    N_SIZE = boardSize;
  } else {
    N_SIZE = 3;
  }
  
  // Create 'table'
  var board = document.createElement("table");
  // Set styling for the table
  board.setAttribute("border", 1);
  board.setAttribute("border-spacing", 0);

  var identifier = 1;
  
  for (var i = 0; i < N_SIZE; i++) {
    // Create table row for the table
    var row = document.createElement("tr");
    // Add table row element to the table
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      // Create table cell
      var cell = document.createElement("td");
      // Set styleing for table cell
      cell.setAttribute("height", 60);
      cell.setAttribute("width", 60);
      cell.setAttribute("align", "center");
      
      cell.classList.add("col" + j, "row" + i);
      
      if (i === j) {
        cell.classList.add("diagonal0");
      }
      if (j === N_SIZE - i - 1) {
        cell.classList.add("diagonal1");
      }
      
      cell.identifier = identifier;
      cell.addEventListener("click", set);
      
      // Add table cell element to the table
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }

  document.getElementById("board").appendChild(board);
  startNewGame();
  progressBar();
}

// Start new game function
function startNewGame() {
  score = {
    X: 0,
    O: 0
  };
  moves = 0;
  turn = "X";
  timerWidth = 0;
  boxes.forEach(function (square) {
    square.innerHTML = EMPTY;
    // Set board color (Assignment 2)
    square.style.backgroundColor = "white";
  });
}

// Set winner function
function win(clicked) {
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = "." + memberOf[i];
    var items = contains("#board " + testClass, turn);
    if (items.length === N_SIZE) {
      return true;
    }
  }
  return false;
}

function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

// Progress bar (Assignment 2)
function progressBar() {
  var progressBar = document.getElementById("myBar");
  var id = setInterval(frame, 100);
  function frame() {
    if (timerWidth >= 100) {
      swapTurn();
    } else {
      timerWidth++;
      progressBar.style.width = timerWidth + "%";
      progressBar.innerHTML = parseInt(timerWidth / 10) + "";
    }
  }
}

// Create swap turn function between two player (Assignment 2)
function swapTurn() {
  if (turn === "X") {
    turn = "O";
    document.getElementById("turn").textContent = "Player 2";
  } else {
    turn = "X";
    document.getElementById("turn").textContent = "Player 1";
  }
  timerWidth = 0;
}

// Set function for 'click' event
function set() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = turn;
  moves += 1;
  score[turn] += this.identifier;
  if (win(this)) {
    if (turn === "X") {
      alert("Player 1 won!");
    } else alert("Player 2 won!");
    startNewGame();
  } else if (moves === N_SIZE * N_SIZE) {
    alert("Draw");
    startNewGame();
  } else {
    if (turn === "X") {
      // Add background color for the player 1 (Assignment 2)
      this.style.backgroundColor = "rgb(124, 252, 0)";
    } else {
      // Add background color for the player 2 (Assignment 2)
      this.style.backgroundColor = "rgb(250, 128, 114)";
    }
    swapTurn();
  }
}

init();
