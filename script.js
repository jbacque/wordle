// WORDLE

let row = 0;
let col = 0;
let letterClicked = "";
let currentWord = "";
let correctWord;

setTimeout(getSolution, 150);

function getSolution() {
  let rand = Math.floor(Math.random() * allWords.length);
  correctWord = allWords[rand];
  console.log(correctWord);
}

let keyboardLetters = "abcdefghijklmnopqrstuvwxyz";

// Event listener for keypress
document.addEventListener("keydown", getLetterKeyboard);

// Event listeners for keyboard
for (let i = 0; i < keyboardLetters.length; i++) {
  document
    .getElementById(keyboardLetters.charAt(i))
    .addEventListener("click", getLetter);
}

// Event listener for delete key
document.getElementById("del").addEventListener("click", deleteLetter);

// Event listener for enter key
document.getElementById("enter").addEventListener("click", submitWord);

function getLetter() {
  letterClicked = this.id;
  if (currentWord.length < 5) {
    currentWord += letterClicked;
    document.getElementById("" + row + col).value = letterClicked;
    col++;
  }

  console.log(currentWord);
}

function getLetterKeyboard(e) {
  if (e.key == "Backspace") deleteLetter();
  if (e.key == "Enter") submitWord();
  if (keyboardLetters.includes(e.key.toLowerCase()) && currentWord.length < 5) {
    currentWord += e.key;
    document.getElementById("" + row + col).value = e.key;
    col++;
  }
}

function deleteLetter() {
  console.log("col: " + col);
  if (col > 0) {
    document.getElementById("" + row + (col - 1)).value = "";
    document.getElementById("" + row + (col - 1)).style.background = "white";
    document.getElementById("" + row + (col - 1)).style.color = "black";
    col--;

    let newCurrentWord = "";
    // update currentWord
    for (let i = 0; i < currentWord.length - 1; i++) {
      newCurrentWord += currentWord.charAt(i);
    }

    currentWord = newCurrentWord;
  }
}

function submitWord() {
  // user submitted a bad word
  if (!allWords.includes(currentWord) && currentWord.length == 5) {
    for (let i = 0; i < currentWord.length; i++) {
      document.getElementById("" + row + i).style.background = "red";
      document.getElementById("" + row + i).style.color = "white";
    }
  } else if (currentWord.length == 5) {
    // user submitted a good word
    let numGreenLetters = 0;
    for (let i = 0; i < currentWord.length; i++) {
      // correct letter and location, correct letter wrong location, was red background
      if (currentWord.charAt(i) == correctWord.charAt(i)) {
        console.log("matched: " + currentWord.charAt(i));
        document.getElementById("" + row + i).style.background =
          "rgb(106,170,100)";
        document.getElementById("" + row + i).style.color = "white";

        numGreenLetters++;
        if (numGreenLetters == 5) {
          console.log("YOU WIN!");
        }
      } else if (correctWord.includes(currentWord.charAt(i))) {
        console.log("Wrong spot: " + currentWord.charAt(i));
        document.getElementById("" + row + i).style.background =
          "rgb(209,176,54)";
        document.getElementById("" + row + i).style.color = "white";
      } else {
        document.getElementById("" + row + i).style.background = "white";
        document.getElementById("" + row + i).style.color = "black";
      }
    }

    // move to next row
    row++;
    if (row == 6) lostGame();
    col = 0;
    currentWord = "";
  }
}

function lostGame() {
  console.log("YOU LOSE");
  let resultEl = document.getElementById("result");
  resultEl.innerHTML = correctWord.toUpperCase();
  resultEl.innerHTML += "<button onClick='reloadPage()'>Try Again?</button> ";
}

function reloadPage() {
  window.location.reload();
}
