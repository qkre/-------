const nums = document.querySelectorAll(".calc .btns .nums");
const funcs = document.querySelectorAll(".calc .btns .func");
const header = document.querySelector(".calc .header .ans");

const clear = document.querySelector(".calc .btns .tools#clear");
const reverse = document.querySelector(".calc .btns .tools#reverse");
const percent = document.querySelector(".calc .btns .tools#percent");

const calculate = document.querySelector(".calc .btns .calc#calculate");

function onClickNumber(event) {
  const clickedBtn = event.target.dataset.value;
  header.innerText += clickedBtn;
}

function onClickClear() {
  header.innerText = "";
}

function onClickCalculate() {
  const expression = header.innerText;
  try {
    header.innerText = eval(expression);
  } catch (error) {
    header.innerText = "Err";
    setTimeout(() => {
      header.innerText = "";
    }, 1000);
  }
}

function onClickPercent() {
  const experssion = header.innerText + "/100";
  header.innerText = eval(experssion);
}

function onClickReverse() {
  const text = header.innerText;
  if (text[0] != "-") {
    header.innerText = "-" + text;
  } else {
    header.innerText = text.slice(1);
  }
}

nums.forEach((button) => {
  button.addEventListener("click", onClickNumber);
});

funcs.forEach((button) => {
  button.addEventListener("click", onClickNumber);
});

clear.addEventListener("click", onClickClear);
reverse.addEventListener("click", onClickReverse);
calculate.addEventListener("click", onClickCalculate);
percent.addEventListener("click", onClickPercent);
