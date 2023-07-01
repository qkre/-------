const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

const toDoList = {
  titleTag: document.querySelector(".whole .title"),
  wholeTag: document.querySelector(".whole"),
  alarmTimeTag: document.querySelector(".container .inputSection .time"),
  toDoItemTag: document.querySelector(".container .inputSection .item"),
  addBtnTag: document.querySelector(".container .inputSection .add"),
  toDoTable: document.querySelector(".items .todoList"),
  disableToDoList() {
    this.wholeTag.style.backgroundColor = "black";
    this.alarmTimeTag.readOnly = true;
    this.toDoItemTag.readOnly = true;
    this.addBtnTag.disabled = true;
  },
};

toDoList.titleTag.innerText = `Hello! ${userId}`;

toDoList.addBtnTag.addEventListener("click", () => {
  const toDos = document.querySelectorAll(".items .todoList .todo");
  if (toDos.length < 3) {
    const newDivTag = document.createElement("div");
    newDivTag.classList.add("todo");

    const newSpanTag = document.createElement("span");
    newSpanTag.innerText = `${toDoList.alarmTimeTag.value} ... ${toDoList.toDoItemTag.value}`;

    const newBtnTag = document.createElement("button");
    newBtnTag.innerText = "❌";
    newBtnTag.addEventListener("click", (event) => {
      event.target.parentElement.remove();
    });

    newDivTag.appendChild(newSpanTag);
    newDivTag.appendChild(newBtnTag);

    toDoList.toDoTable.appendChild(newDivTag);
  }
});

toDoList.alarmTimeTag.flatpickr({
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
});

const header = {
  bodyTag: document.querySelector("body"),
  timeTag: document.querySelector(".container .header .time"),
  batteryTag: document.querySelector(".container .header .battery"),
  currentBattery: parseInt(
    document.querySelector(".container .header .battery").textContent
  ),
  updateTime() {
    this.timeTag.textContent = new Date().toLocaleTimeString("en-US", {
      hour12: false,
    });
  },
  updateBatteryLevel() {
    if (this.currentBattery === 0) {
      clearInterval(interval);
      toDoList.disableToDoList();
    } else {
      this.currentBattery -= 1;
      this.batteryTag.textContent = this.currentBattery + "%";
    }
  },
  updateBackgroundGradient() {
    this.bodyTag.style.background = `radial-gradient(rgb(${
      155 + this.currentBattery
    }, ${255 - this.currentBattery}, ${108 + this.currentBattery / 2}), rgb(${
      54 + this.currentBattery
    }, ${181 - this.currentBattery}, ${255 - this.currentBattery / 2}))`;
  },
};

const interval = setInterval(() => {
  header.updateTime();
  header.updateBatteryLevel();
  header.updateBackgroundGradient();
}, 1000);
