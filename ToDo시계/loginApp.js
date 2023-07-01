const userDB = [{ id: "test", pw: "1" }];

const tags = {
  userIdTag: document.querySelector(".container #id"),
  userPwTag: document.querySelector(".container #pw"),
  loginBtnTag: document.querySelector(".container .login"),
  registerBtnTag: document.querySelector(".container .register"),
};

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

function clearTags() {
  tags.userPwTag.value = null;
}

function checkUser() {
  event.preventDefault();

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

function registerUser() {
  if (userDB.some((user) => user.id === tags.userIdTag.value)) {
    alert("이미 존재하는 아이디 입니다.");
  } else {
    userDB.push({
      id: tags.userIdTag.value,
      pw: tags.userPwTag.value,
    });
    clearTags();
    alert("회원 정보 등록 완료!");
    console.log(userDB);
  }
}

tags.loginBtnTag.addEventListener("click", checkUser);
tags.registerBtnTag.addEventListener("click", registerUser);
