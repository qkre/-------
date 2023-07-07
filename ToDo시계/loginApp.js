const userDB = [
  {
    firstName: "test",
    lastName: "test",
    id: "test",
    pw: "test",
  },
];

// 메인 화면 태그 요소들
const tags = {
  bodyTag: document.querySelector("body"), // body 요소
  userIdTag: document.querySelector(".container .loginSection #id"), // 아이디 입력 필드 요소
  userPwTag: document.querySelector(".container .loginSection #pw"), // 패스워드 입력 필드 요소
  loginBtnTag: document.querySelector(".container .actionSection .loginBtn"), // 로그인 버튼 요소
  findPwBtnTag: document.querySelector(".container .actionSection .findPw"), // 비밀번호 찾기 버튼 요소
};

// 회원가입 팝업 태그 요소들
const registerPopUpTags = {
  popUpTag: document.querySelector(".container .header #register"), // 회원가입 팝업 체크박스 요소
  userFirstNameTag: document.querySelector(".registerProfile #userFirstName"), // 이름 입력 필드 요소
  userLastNameTag: document.querySelector(".registerProfile #userLastName"), // 성 입력 필드 요소
  userIdTag: document.querySelector(".registerProfile #userID"), // 아이디 입력 필드 요소
  userPwTag: document.querySelector(".registerProfile #userPW"), // 패스워드 입력 필드 요소
  registerBtnTag: document.querySelector(".registerProfile .registerBtn"), // 회원가입 버튼 요소
  isValidIdTag: document.querySelector(".isValidID"), // 아이디 유효성 검사 결과 요소
  isValidPasswordTag: document.querySelector(".isValidPassword"), // 패스워드 유효성 검사 결과 요소
};

// 비밀번호 찾기 팝업 태그 요소들
const findPopUpTags = {
  popUpTag: document.querySelector(".container .actionSection #findPW"), // 비밀번호 찾기 팝업 체크박스 요소
  userFirstNameTag: document.querySelector(".findPassword #userFirstName"), // 이름 입력 필드 요소
  userLastNameTag: document.querySelector(".findPassword #userLastName"), // 성 입력 필드 요소
  userIdTag: document.querySelector(".findPassword #userId"), // 아이디 입력 필드 요소
  findBtnTag: document.querySelector(".findPassword .findBtn"), // 비밀번호 찾기 버튼 요소
};

// 로그인 입력 유효성 검사
function checkValidity() {
  if (!tags.userIdTag.checkValidity()) {
    alert("아이디를 입력하세요!"); // 아이디가 유효하지 않은 경우 경고창 출력
    return false;
  }
  if (!tags.userPwTag.checkValidity()) {
    alert("패스워드를 입력하세요!"); // 패스워드가 유효하지 않은 경우 경고창 출력
    return false;
  }
  return true;
}

// 회원가입 유효성 검사
function registerValidity() {
  if (!registerPopUpTags.userFirstNameTag.checkValidity()) {
    alert("이름을 입력하세요!"); // 이름이 유효하지 않은 경우 경고창 출력
    return false;
  }
  if (!registerPopUpTags.userLastNameTag.checkValidity()) {
    alert("성을 입력하세요!"); // 성이 유효하지 않은 경우 경고창 출력
    return false;
  }
  if (!registerPopUpTags.userIdTag.checkValidity()) {
    alert("아이디를 입력하세요!"); // 아이디가 유효하지 않은 경우 경고창 출력
    return false;
  }
  if (!registerPopUpTags.userPwTag.checkValidity()) {
    alert("패스워드를 입력하세요!"); // 패스워드가 유효하지 않은 경우 경고창 출력
    return false;
  } else {
    const pattern = /[^a-zA-Z0-9]/;
    if (!pattern.test(registerPopUpTags.userPwTag.value)) {
      alert("패스워드에 반드시 특수문자가 포함되어야 합니다!"); // 패스워드에 특수문자가 없는 경우 경고창 출력
      return false;
    }
  }
  return true;
}

// 비밀번호 찾기 유효성 검사
function findPwValidity() {
  if (!findPopUpTags.userFirstNameTag.checkValidity()) {
    alert("이름을 입력하세요!"); // 이름이 유효하지 않은 경우 경고창 출력
    return false;
  }
  if (!findPopUpTags.userLastNameTag.checkValidity()) {
    alert("성을 입력하세요!"); // 성이 유효하지 않은 경우 경고창 출력
    return false;
  }
  if (!findPopUpTags.userIdTag.checkValidity()) {
    alert("아이디를 입력하세요!"); // 아이디가 유효하지 않은 경우 경고창 출력
    return false;
  }
  return true;
}

// 태그 초기화
function clearTags() {
  tags.userPwTag.value = null;
  registerPopUpTags.userFirstNameTag.value = null;
  registerPopUpTags.userLastNameTag.value = null;
  registerPopUpTags.userIdTag.value = null;
  registerPopUpTags.userPwTag.value = null;

  findPopUpTags.userFirstNameTag.value = null;
  findPopUpTags.userLastNameTag.value = null;
  findPopUpTags.userIdTag.value = null;
}

// 로그인 함수
function checkUser() {
  if (checkValidity()) {
    const targetIndex = userDB.findIndex(
      (user) => user.id === tags.userIdTag.value
    );
    if (targetIndex !== -1) {
      if (userDB[targetIndex].pw === tags.userPwTag.value) {
        const url = `mainPage.html?userId=${encodeURIComponent(
          userDB[targetIndex].id
        )}`;
        window.location.href = url;
        console.log("로그인 성공");
      } else {
        tags.userPwTag.value = null;
        alert("패스워드가 틀렸습니다.");
      }
    } else {
      clearTags();
      alert("존재하지 않는 아이디 입니다.");
    }
  }
}

// 회원가입
function registerUser() {
  if (registerValidity()) {
    if (userDB.some((user) => user.id === registerPopUpTags.userIdTag.value)) {
      alert("이미 존재하는 아이디 입니다.");
    } else {
      userDB.push({
        firstName: registerPopUpTags.userFirstNameTag.value,
        lastName: registerPopUpTags.userLastNameTag.value,
        id: registerPopUpTags.userIdTag.value,
        pw: registerPopUpTags.userPwTag.value,
      });
      clearTags();
      registerPopUpTags.popUpTag.checked = false;
      alert("회원 정보 등록 완료!");
      console.log(userDB);
    }
  }
}
// 비밀번호 찾기 함수
function findPassword() {
  if (findPwValidity()) {
    // 사용자 정보가 일치하는 경우
    if (
      userDB.some((user) => user.id === findPopUpTags.userIdTag.value) &&
      userDB.some(
        (user) => user.firstName === findPopUpTags.userFirstNameTag.value
      ) &&
      userDB.some(
        (user) => user.lastName === findPopUpTags.userLastNameTag.value
      )
    ) {
      // 해당 사용자의 비밀번호를 알림으로 보여줌
      const targetIndex = userDB.findIndex(
        (user) => user.id === findPopUpTags.userIdTag.value
      );
      alert(`비밀번호는 ${userDB[targetIndex].pw}입니다!`);
      clearTags(); // 입력 필드 초기화
      findPopUpTags.popUpTag.checked = false; // 비밀번호 찾기 팝업 닫기
    } else {
      alert("회원 정보를 찾을 수 없습니다!");
    }
  }
}

// 로그인 버튼 클릭 이벤트 처리
tags.loginBtnTag.addEventListener("click", checkUser);

// 회원가입 시 아이디 유효성 검사
registerPopUpTags.userIdTag.onkeyup = function () {
  if (registerPopUpTags.userIdTag.value.length < 1) {
    registerPopUpTags.isValidIdTag.classList.add("hide");
    return;
  }

  if (userDB.some((user) => user.id !== registerPopUpTags.userIdTag.value)) {
    // 아이디가 사용 가능한 경우
    registerPopUpTags.isValidIdTag.classList.remove("hide");
    registerPopUpTags.isValidIdTag.innerText = "사용 가능한 아이디 입니다.";
  } else {
    // 아이디가 이미 존재하는 경우
    registerPopUpTags.isValidIdTag.innerText = "이미 존재하는 아이디 입니다.";
  }
};

// 회원가입 시 비밀번호 유효성 검사
registerPopUpTags.userPwTag.onkeyup = function () {
  const pattern = /[^a-zA-Z0-9]/;
  if (!pattern.test(registerPopUpTags.userPwTag.value)) {
    // 비밀번호가 올바른 형태가 아닌 경우
    registerPopUpTags.isValidPasswordTag.classList.remove("hide");
    registerPopUpTags.isValidPasswordTag.innerText =
      "올바른 비밀번호 형태가 아닙니다.";
  } else {
    // 비밀번호가 올바른 형태인 경우
    registerPopUpTags.isValidPasswordTag.innerText =
      "사용 가능한 비밀번호 입니다.";
  }
};

// 엔터 키로 로그인하기
tags.bodyTag.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) checkUser();
});

// 회원가입 버튼 클릭 이벤트 처리
registerPopUpTags.registerBtnTag.addEventListener("click", registerUser);

// 비밀번호 찾기 버튼 클릭 이벤트 처리
findPopUpTags.findBtnTag.addEventListener("click", findPassword);
