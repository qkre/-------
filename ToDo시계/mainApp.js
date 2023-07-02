const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

const tags = {
  // DOM 요소들
  titleTag: document.querySelector(".whole .title"),
  wholeTag: document.querySelector(".whole"),
  alarmTimeTag: document.querySelector(".container .inputSection .time"),
  toDoItemTag: document.querySelector(".container .inputSection .item"),
  addBtnTag: document.querySelector(".container .inputSection .add"),
  toDoTableTag: document.querySelector(".items .todoList"),
  logoutBtnTag: document.querySelector(".whole .logout"),

  // 배터리가 0이되면 동작하는 함수
  disableToDoList() {
    this.wholeTag.style.backgroundColor = "black";
    this.alarmTimeTag.readOnly = true;
    this.toDoItemTag.readOnly = true;
    this.addBtnTag.disabled = true;
  },
};

// 새로운 할 일을 추가하는 함수
function addToDoItem() {
  const toDos = document.querySelectorAll(".items .todoList .todo");
  if (toDos.length < 3) {
    // 새로운 요소 생성
    const newDivTag = document.createElement("div");
    newDivTag.classList.add("todo");

    const newSpanTimeTag = document.createElement("span");
    newSpanTimeTag.innerText = tags.alarmTimeTag.value;

    const newSpanItemTag = document.createElement("span");
    newSpanItemTag.innerText = tags.toDoItemTag.value;

    const newBtnTag = document.createElement("button");
    newBtnTag.innerText = "❌";
    newBtnTag.addEventListener("click", (event) => {
      event.target.parentElement.remove();
    });

    // CSS 스타일 적용
    newSpanTimeTag.style.color = "#f86f03";
    newSpanTimeTag.style.fontWeight = "bolder";
    newSpanItemTag.style.color = "#f86f03";
    newSpanItemTag.style.fontWeight = "bolder";

    newBtnTag.style.background = "#ffa41b";
    newBtnTag.style.border = "none";
    newBtnTag.style.boxShadow = "2px 2px black";

    newDivTag.appendChild(newSpanTimeTag);
    newDivTag.appendChild(newSpanItemTag);
    newDivTag.appendChild(newBtnTag);

    newDivTag.style.marginBottom = "5px";

    tags.toDoTableTag.appendChild(newDivTag);
  }
}

// 로그아웃 함수 -> 로그인 페이지로 이동
function logout() {
  window.location.href = "loginPage.html";
}

// 사용자 아이디를 제목으로 설정
tags.titleTag.innerText = `Hello! ${userId}`;

tags.addBtnTag.addEventListener("click", addToDoItem);

tags.logoutBtnTag.addEventListener("click", logout);

// 24시간 형태의 input을 받기 위해 flatpickr 사용
tags.alarmTimeTag.flatpickr({
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
});

const header = {
  // DOM 요소들
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
      tags.disableToDoList();
    } else {
      this.currentBattery -= 1;
      this.batteryTag.textContent = this.currentBattery + "%";
    }
  },
};

// 1초당 한 번씩 시간과 배터리가 업데이트 됨
const interval = setInterval(() => {
  header.updateTime();
  header.updateBatteryLevel();
}, 1000);
