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
  bodyTag: document.querySelector("body"),
  userIdTag: document.querySelector(".container .loginSection #id"),
  userPwTag: document.querySelector(".container .loginSection #pw"),
  loginBtnTag: document.querySelector(".container .actionSection .loginBtn"),
  findPwBtnTag: document.querySelector(".container .actionSection .findPw"),
};

// 회원가입 팝업 태그 요소들
const registerPopUpTags = {
  popUpTag: document.querySelector(".container .header #register"),
  userFirstNameTag: document.querySelector(".registerProfile #userFirstName"),
  userLastNameTag: document.querySelector(".registerProfile #userLastName"),
  userIdTag: document.querySelector(".registerProfile #userID"),
  userPwTag: document.querySelector(".registerProfile #userPW"),
  registerBtnTag: document.querySelector(".registerProfile .registerBtn"),
};

// 비밀번호 찾기 팝업 태그 요소들
const findPopUpTags = {
  popUpTag: document.querySelector(".container .actionSection #findPW"),
  userFirstNameTag: document.querySelector(".findPassword #userFirstName"),
  userLastNameTag: document.querySelector(".findPassword #userLastName"),
  userIdTag: document.querySelector(".findPassword #userId"),
  findBtnTag: document.querySelector(".findPassword .findBtn"),
};

// 로그인 입력 유효성 검사
function checkValidity() {
  if (!tags.userIdTag.checkValidity()) {
    alert("아이디를 입력하세요!");
    return false;
  }
  if (!tags.userPwTag.checkValidity()) {
    alert("패스워드를 입력하세요!");
    return false;
  }
  return true;
}

// 회원가입 유효성 검사
function registerValidity() {
  if (!registerPopUpTags.userFirstNameTag.checkValidity()) {
    alert("이름을 입력하세요!");
    return false;
  }
  if (!registerPopUpTags.userLastNameTag.checkValidity()) {
    alert("성을 입력하세요!");
    return false;
  }
  if (!registerPopUpTags.userIdTag.checkValidity()) {
    alert("아이디를 입력하세요!");
    return false;
  }
  if (!registerPopUpTags.userPwTag.checkValidity()) {
    alert("패스워드를 입력하세요!");
    return false;
  }
  return true;
}

// 비밀번호 찾기 유효성 검사
function findPwValidity() {
  if (!findPopUpTags.userFirstNameTag.checkValidity()) {
    alert("이름을 입력하세요!");
    return false;
  }
  if (!findPopUpTags.userLastNameTag.checkValidity()) {
    alert("성을 입력하세요!");
    return false;
  }
  if (!findPopUpTags.userIdTag.checkValidity()) {
    alert("아이디를 입력하세요!");
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

// 비밀번호 찾기
function findPassword() {
  if (findPwValidity()) {
    if (
      userDB.some((user) => user.id === findPopUpTags.userIdTag.value) &&
      userDB.some(
        (user) => user.firstName === findPopUpTags.userFirstNameTag.value
      ) &&
      userDB.some(
        (user) => user.lastName === findPopUpTags.userLastNameTag.value
      )
    ) {
      const targetIndex = userDB.findIndex(
        (user) => user.id === findPopUpTags.userIdTag.value
      );
      alert(`비밀번호는 ${userDB[targetIndex].pw}입니다!`);
      clearTags();
      findPopUpTags.popUpTag.checked = false;
    } else {
      alert("회원 정보를 찾을 수 없습니다!");
    }
  }
}

tags.loginBtnTag.addEventListener("click", checkUser);

// 엔터 키로 로그인하기
tags.bodyTag.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) checkUser();
});
registerPopUpTags.registerBtnTag.addEventListener("click", registerUser);
findPopUpTags.findBtnTag.addEventListener("click", findPassword);
