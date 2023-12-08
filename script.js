console.log("Tic tac toe");
let music = new Audio("free-sound-1674743533.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;

const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

// Declare mediaQuery outside of the checkWin function
const mediaQuery = window.matchMedia("(max-width: 786px)");

// Function to set styles
function setStyles(e) {
  const lineElement = document.querySelector(".line");

  if (mediaQuery.matches) {
    // Apply styles for viewports 768px or less
    lineElement.style.width = "50vw";

    lineElement.style.transform = `translate(${e[3]}vw, ${
      e[4] + 13
    }vw) rotate(${e[5]}deg)`;
    if (e === wins[0]) {
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}vw, 10vw) rotate(${e[5]}deg)`;
    } else if (e === wins[2]) {
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}vw, 50vw) rotate(${e[5]}deg)`;
    } else if (e === wins[3]) {
      document.querySelector(".line").style.transform = `translate(-15vw,  ${
        e[4] + 13
      }vw) rotate(${e[5]}deg)`;
    } else if (e === wins[5]) {
      document.querySelector(".line").style.transform = `translate(25vw,  ${
        e[4] + 13
      }vw) rotate(${e[5]}deg)`;
    }
  } else {
    // Apply default styles for larger viewports
    lineElement.style.width = "20vw";
  }
}

const wins = [
  [0, 1, 2, 5, 5, 0],
  [3, 4, 5, 5, 15, 0],
  [6, 7, 8, 5, 25, 0],
  [0, 3, 6, -5, 15, 90],
  [1, 4, 7, 5, 15, 90],
  [2, 5, 8, 15, 15, 90],
  [0, 4, 8, 5, 15, 45],
  [2, 4, 6, 5, 15, 135],
];

// Function to check win
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");

  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " Won";
      isgameover = true;
      document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "200px";
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;

      // Initial styles setup
      setStyles(e);

      // Add a listener to react to changes in viewport width
      mediaQuery.addListener(() => setStyles(e));
      gameover.play();
    }
  });
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText == "" && !isgameover) {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText =
          "turn for " + turn;
      }
    }
  });
});

reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  isgameover = false;
  document.querySelector(".line").style.width = "0vw";
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
    "0px";
});
