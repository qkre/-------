const dots = document.querySelectorAll(".main .mine .dot");
const counts = document.querySelector(".main .header .count");
const timer = document.querySelector(".main .header .timer");
const main = document.querySelector(".main");
let time = 10;
let count = 3;

function onClick(event) {
  const clickedDot = event.target;
  if (clickedDot.style.backgroundColor != "white") {
    clickedDot.style.backgroundColor = "white";
    count++;
    counts.innerText = count.toString().padStart(3, "0");
  }
}

function updateTimer() {
  if (time > 0) {
    time--;
    timer.innerText = time.toString().padStart(3, "0");
  } else {
    main.style.backgroundColor = "red";
    main.removeChild(document.querySelector(".main .mine"));
    const gameOver = document.createElement("div");
    gameOver.innerText = "Game OVER!";
    gameOver.style.fontSize = "60px";
    gameOver.style.textAlign = "center";
    gameOver.style.position = "absolute";
    gameOver.style.left = "50%";
    gameOver.style.top = "50%";
    gameOver.style.transform = "translate(-50%, -50%)";
    gameOver.style.width = "100%";

    main.appendChild(gameOver);
    clearInterval(interval);
  }
}

dots.forEach((dot) => {
  dot.addEventListener("click", onClick);
});

interval = setInterval(updateTimer, 1000);
interval;
