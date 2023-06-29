const bodyTag = document.querySelector("body");

const wholeTag = document.querySelector(".whole");
const containerTag = document.querySelector(".container");

const timeTag = document.querySelector(".container .header .time");
const batteryTag = document.querySelector(".container .header .battery");

let currentBattery = parseInt(batteryTag.textContent);

const now = new Date();
const currentTimer = now.toLocaleTimeString("en-US", { hour12: false });

timeTag.innerText = currentTimer;

const alarmTimeTag = document.querySelector(".container .inputSection .time");
const toDoItemTag = document.querySelector(".container .inputSection .item");
const addBtnTag = document.querySelector(".container .inputSection .add");

let toDoItems = document.querySelectorAll(".items .todoList .alertItem");

// 1초당 화면을 한번씩 업데이트 함(시간, 배터리)
const interval = setInterval(() => {
  const now = new Date();
  const currentTimer = now.toLocaleTimeString("en-US", { hour12: false });
  currentBattery -= 1;
  timeTag.innerText = currentTimer;
  batteryTag.innerText = currentBattery + "%";
  bodyTag.style.background = `radial-gradient(rgb(${155 + currentBattery}, ${
    255 - currentBattery
  }, ${108 + currentBattery / 2}), rgb(${54 + currentBattery}, ${
    181 - currentBattery
  }, ${255 - currentBattery / 2}))`;
  if (currentBattery == 0) {
    wholeTag.style.backgroundColor = "black";
    alarmTimeTag.readOnly = true;
    toDoItemTag.readOnly = true;
    addBtnTag.disabled = true;
    clearInterval(interval);
  }
}, 1000);

function onClickDelete(event) {
  const item = event.target.parentElement;
  item.remove();

  // toDoItems 목록을 업데이트 함.
  toDoItems = document.querySelectorAll(".items .todoList .alertItem");
}

// 새로운 알람을 등록함
function onClickAddBtn() {
  const alertTime = alarmTimeTag.value;
  const alertItem = toDoItemTag.value;
  if (alertTime !== "" && toDoItems.length < 3) {
    // 새로운 태그들을 생성하여 등록함
    const newDiv = document.createElement("div");
    const newSpan = document.createElement("span");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.innerText = "X";

    newSpan.classList.add("alert");
    newSpan.innerText = alertTime + " ... " + alertItem;

    newDiv.classList.add("alertItem");
    newDiv.appendChild(newSpan);
    newDiv.appendChild(deleteBtn);

    document.querySelector(".items .todoList").appendChild(newDiv);

    alarmTimeTag.value = null;
    toDoItemTag.value = "";

    // 새로운 알람이 등록되면 toDoItems 목록을 업데이트 함
    toDoItems = document.querySelectorAll(".items .todoList .alertItem");

    // 새로운 알람에 동작하는 버튼 기능을 등록함.
    toDoItems.forEach((item) => {
      item.querySelector(".delete").addEventListener("click", onClickDelete);
    });
  }
}

function onInputKeyDown(event) {
  if (event.keyCode === 13) {
    onClickAddBtn();
  }
}

toDoItemTag.addEventListener("keydown", onInputKeyDown);
addBtnTag.addEventListener("click", onClickAddBtn);
