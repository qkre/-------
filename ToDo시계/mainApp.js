// URL에서 userId 추출
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

// DOM 요소들을 선택하는 객체(tags) 정의
const tags = {
  // DOM 요소들
  bodyTag: document.querySelector("body"), // body 요소
  titleTag: document.querySelector(".whole .title"), // .whole .title 요소
  wholeTag: document.querySelector(".whole"), // .whole 요소
  alarmTimeTag: document.querySelector(".container .inputSection .time"), // .container .inputSection .time 요소
  toDoItemTag: document.querySelector(".container .inputSection .item"), // .container .inputSection .item 요소
  addBtnTag: document.querySelector(".container .inputSection .add"), // .container .inputSection .add 요소
  toDoTableTag: document.querySelector(".items .todoList"), // .items .todoList 요소
  logoutBtnTag: document.querySelector(".whole .logout"), // .whole .logout 요소

  // 할 일 목록을 비활성화하는 함수
  disableToDoList() {
    this.wholeTag.style.backgroundColor = "black"; // 배경색을 검정으로 변경
    this.alarmTimeTag.disabled = true; // 알람 시간 입력 필드 비활성화
    this.toDoItemTag.disabled = true; // 할 일 입력 필드 비활성화
    this.addBtnTag.disabled = true; // 추가 버튼 비활성화
  },

  // 시간을 확인하여 할 일 목록을 체크하는 함수
  checkTime() {
    const toDoItems = document.querySelectorAll(".items .todoList .todo"); // 할 일 목록에서 모든 할 일 요소 선택
    for (let i = 0; i < toDoItems.length; i++) {
      if (
        toDoItems[i].firstChild.textContent ===
        header.timeTag.textContent.slice(0, 5)
      ) {
        toDoItems[i].remove(); // 해당 시간과 일치하는 할 일 제거
        this.alertBackground(0); // 배경색 애니메이션 실행
      }
    }
  },

  // 배경색 애니메이션 실행하는 함수
  alertBackground(count) {
    if (count >= 5) {
      tags.bodyTag.style.background = "#525fe1"; // 배경색을 파란색으로 변경
      return;
    }

    if (count % 2 == 0) {
      tags.bodyTag.style.background = "red"; // 배경색을 빨간색으로 변경
    } else {
      tags.bodyTag.style.background = "blue"; // 배경색을 파란색으로 변경
    }

    setTimeout(() => {
      this.alertBackground(count + 1);
    }, 500);
  },
};

// 새로운 할 일을 추가하는 함수
function addToDoItem() {
  const toDos = document.querySelectorAll(".items .todoList .todo"); // 할 일 목록에서 모든 할 일 요소 선택
  if (
    toDos.length < 3 &&
    tags.alarmTimeTag.value !== "" &&
    tags.toDoItemTag.value !== ""
  ) {
    // 새로운 할 일 요소 생성
    const newDivTag = document.createElement("div");
    newDivTag.classList.add("todo");

    const newSpanTimeTag = document.createElement("span");
    newSpanTimeTag.innerText = tags.alarmTimeTag.value;

    const newSpanItemTag = document.createElement("span");
    newSpanItemTag.innerText = tags.toDoItemTag.value;

    const newBtnTag = document.createElement("button");
    newBtnTag.innerText = "❌";
    newBtnTag.addEventListener("click", (event) => {
      event.target.parentElement.remove(); // 할 일 삭제 버튼 클릭 시 할 일 요소 제거
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

    tags.toDoTableTag.appendChild(newDivTag); // 할 일 목록에 새로운 할 일 요소 추가
  }
}

// 로그아웃 함수 -> 로그인 페이지로 이동
function logout() {
  window.location.href = "loginPage.html"; // 로그인 페이지로 이동
}

// 사용자 아이디를 제목으로 설정
tags.titleTag.innerText = `Hello! ${userId}`;

tags.addBtnTag.addEventListener("click", addToDoItem); // 할 일 추가 버튼 클릭 시 addToDoItem 함수 실행

tags.logoutBtnTag.addEventListener("click", logout); // 로그아웃 버튼 클릭 시 logout 함수 실행

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

header.timeTag.textContent = new Date().toLocaleTimeString("en-Us", {
  hour12: false,
});

// 1초당 한 번씩 시간과 배터리가 업데이트 됨
const interval = setInterval(() => {
  header.updateTime();
  header.updateBatteryLevel();
  tags.checkTime();
}, 1000);

tags.bodyTag.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) addToDoItem();
});
